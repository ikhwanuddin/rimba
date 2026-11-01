"""REST API routes for annotation tasks."""

import asyncio
import datetime
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from soundevent.data import AnnotationState
from sqlalchemy import delete, func, select

from whombat import api, models, schemas
from whombat.filters.annotation_tasks import AnnotationTaskFilter
from whombat.filters.clips import UUIDFilter as ClipUUIDFilter
from whombat.routes.dependencies import Session, get_current_user_dependency
from whombat.routes.dependencies.settings import WhombatSettings
from whombat.routes.types import Limit, Offset

__all__ = [
    "get_annotation_tasks_router",
]

# Way Canguk fork: a shared queue of clips. Each annotator takes the next clip
# nobody holds; a clip opened but not answered returns to the queue after LEASE.
# One uvicorn process serves the app, so this lock makes taking a clip atomic.
CLAIM_LOCK = asyncio.Lock()
LEASE = datetime.timedelta(minutes=30)


class Claim(BaseModel):
    """Clip given to the annotator, and progress numbers."""

    task: schemas.AnnotationTask | None
    done_by_me: int
    remaining: int
    total: int


ANSWER_KEY = "jawaban"
ANSWER_VALUES = ("ya", "tidak", "tidak yakin")


class Progress(BaseModel):
    """Answered clips per annotator, and what is left."""

    done_by_me: int
    remaining: int
    total: int
    by_user: dict[str, int]


def _naive_utc(t: datetime.datetime) -> datetime.datetime:
    return t.astimezone(datetime.timezone.utc).replace(tzinfo=None) if t.tzinfo else t


def get_annotation_tasks_router(settings: WhombatSettings) -> APIRouter:
    """Get the API router for annotation tasks."""
    active_user = get_current_user_dependency(settings)

    annotation_tasks_router = APIRouter()

    @annotation_tasks_router.post(
        "/",
        response_model=list[schemas.AnnotationTask],
    )
    async def create_tasks(
        session: Session,
        annotation_project_uuid: UUID,
        clip_uuids: list[UUID],
    ):
        """Create multiple annotation tasks."""
        annotation_project = await api.annotation_projects.get(
            session,
            annotation_project_uuid,
        )
        clips, _ = await api.clips.get_many(
            session,
            limit=-1,
            filters=[
                ClipUUIDFilter(
                    isin=clip_uuids,
                ),
            ],
        )
        # Create empty clip annotations
        clip_annotations = await api.clip_annotations.create_many(
            session,
            data=[dict(clip_id=clip.id) for clip in clips],
        )
        tasks = await api.annotation_tasks.create_many_without_duplicates(
            session,
            data=[
                dict(
                    annotation_project_id=annotation_project.id,
                    clip_annotation_id=clip_annotation.id,
                    clip_id=clip_annotation.clip.id,
                )
                for clip_annotation in clip_annotations
            ],
            return_all=True,
        )
        await session.commit()
        return tasks

    @annotation_tasks_router.get(
        "/",
        response_model=schemas.Page[schemas.AnnotationTask],
    )
    async def get_tasks(
        session: Session,
        filter: Annotated[AnnotationTaskFilter, Depends(AnnotationTaskFilter)],  # type: ignore
        limit: Limit = 10,
        offset: Offset = 0,
        sort_by: str = "-created_on",
    ):
        """Get a page of annotation tasks."""
        tasks, total = await api.annotation_tasks.get_many(
            session,
            limit=limit,
            offset=offset,
            filters=[filter],
            sort_by=sort_by,
        )
        return schemas.Page(
            items=tasks,
            total=total,
            limit=limit,
            offset=offset,
        )

    @annotation_tasks_router.delete(
        "/detail/",
        response_model=schemas.AnnotationTask,
    )
    async def delete_task(
        session: Session,
        annotation_task_uuid: UUID,
    ):
        """Remove a clip from an annotation project."""
        annotation_task = await api.annotation_tasks.get(
            session,
            annotation_task_uuid,
        )
        annotation_task = await api.annotation_tasks.delete(
            session,
            annotation_task,
        )
        await session.commit()
        return annotation_task

    @annotation_tasks_router.get(
        "/detail/",
        response_model=schemas.AnnotationTask,
    )
    async def get_task(
        session: Session,
        annotation_task_uuid: UUID,
    ):
        """Get an annotation task."""
        return await api.annotation_tasks.get(session, annotation_task_uuid)

    @annotation_tasks_router.get(
        "/detail/clip_annotation/",
        response_model=schemas.ClipAnnotation,
    )
    async def get_task_annotations(
        session: Session,
        annotation_task_uuid: UUID,
    ) -> schemas.ClipAnnotation:
        """Get an annotation task."""
        annotation_task = await api.annotation_tasks.get(
            session,
            annotation_task_uuid,
        )

        return await api.annotation_tasks.get_clip_annotation(
            session, annotation_task
        )

    @annotation_tasks_router.post(
        "/detail/badges/",
        response_model=schemas.AnnotationTask,
    )
    async def add_annotation_status_badge(
        session: Session,
        annotation_task_uuid: UUID,
        state: AnnotationState,
        user: Annotated[schemas.SimpleUser, Depends(active_user)],
    ):
        """Add a badge to an annotation task."""
        annotation_task = await api.annotation_tasks.get(
            session,
            annotation_task_uuid,
        )
        updated = await api.annotation_tasks.add_status_badge(
            session,
            annotation_task,
            state,
            user,
        )
        await session.commit()
        return updated

    @annotation_tasks_router.delete(
        "/detail/badges/",
        response_model=schemas.AnnotationTask,
    )
    async def remove_annotation_status_badge(
        session: Session,
        annotation_task_uuid: UUID,
        state: AnnotationState,
    ):
        """Remove a badge from an annotation task."""
        annotation_task = await api.annotation_tasks.get(
            session,
            annotation_task_uuid,
        )
        updated = await api.annotation_tasks.remove_status_badge(
            session,
            annotation_task,
            state,
        )
        await session.commit()
        return updated

    @annotation_tasks_router.get("/progress/", response_model=Progress)
    async def project_progress(
        session: Session,
        annotation_project_uuid: UUID,
        user: Annotated[schemas.SimpleUser, Depends(active_user)],
    ):
        """Way Canguk fork: answered clips per annotator in a project."""
        T, B, U = models.AnnotationTask, models.AnnotationStatusBadge, models.User
        project = await api.annotation_projects.get(session, annotation_project_uuid)
        total = await session.scalar(
            select(func.count(T.id)).where(T.annotation_project_id == project.id))
        rows = (await session.execute(
            select(U.username, func.count(func.distinct(B.annotation_task_id)))
            .join(T, T.id == B.annotation_task_id).join(U, U.id == B.user_id)
            .where(T.annotation_project_id == project.id,
                   B.state == AnnotationState.completed)
            .group_by(U.username)
        )).all()
        answered = await session.scalar(
            select(func.count(func.distinct(B.annotation_task_id)))
            .join(T, T.id == B.annotation_task_id)
            .where(T.annotation_project_id == project.id,
                   B.state == AnnotationState.completed))
        by_user = {name: n for name, n in rows}
        return Progress(done_by_me=by_user.get(user.username, 0),
                        remaining=total - answered, total=total, by_user=by_user)

    @annotation_tasks_router.post("/answer/", response_model=schemas.AnnotationTask)
    async def answer_task(
        session: Session,
        annotation_task_uuid: UUID,
        value: str,
        user: Annotated[schemas.SimpleUser, Depends(active_user)],
    ):
        """Way Canguk fork: store the annotator's answer and mark the clip done.

        Only the annotator who holds the clip (latest "assigned" badge, lease not
        taken over) or who already answered it may answer; otherwise 409, so a
        clip that went back to the queue cannot be answered twice.
        """
        if value not in ANSWER_VALUES:
            raise HTTPException(422, f"value must be one of {ANSWER_VALUES}")
        B = models.AnnotationStatusBadge
        async with CLAIM_LOCK:
            api.annotation_tasks._cache.clear()
            task = await api.annotation_tasks.get(session, annotation_task_uuid)
            rows = (await session.execute(
                select(B.user_id, B.state, B.created_on).where(B.annotation_task_id == task.id)
            )).all()
            done_by = {u for u, st, _ in rows if st == AnnotationState.completed}
            held = [(c, u) for u, st, c in rows if st == AnnotationState.assigned]
            holder = max(held, key=lambda x: x[0])[1] if held else None
            if user.id not in done_by and (done_by or holder != user.id):
                raise HTTPException(409, "Klip ini sudah dialihkan ke anotator lain.")
            clip_annotation = await api.annotation_tasks.get_clip_annotation(session, task)
            for old in clip_annotation.tags:
                if old.key == ANSWER_KEY and old.value != value:
                    clip_annotation = await api.clip_annotations.remove_tag(session, clip_annotation, old)
            if not any(t.key == ANSWER_KEY and t.value == value for t in clip_annotation.tags):
                tag = await api.tags.get_or_create(session, key=ANSWER_KEY, value=value)
                await api.clip_annotations.add_tag(session, clip_annotation, tag, user)
            if user.id not in done_by:
                task = await api.annotation_tasks.add_status_badge(
                    session, task, AnnotationState.completed, user)
            await session.commit()
            return task

    @annotation_tasks_router.post("/claim/", response_model=Claim)
    async def claim_task(
        session: Session,
        annotation_project_uuid: UUID,
        user: Annotated[schemas.SimpleUser, Depends(active_user)],
    ):
        """Way Canguk fork: give the annotator a clip to answer.

        The clip the annotator already holds (taken, not answered) comes first;
        otherwise the first clip in task order that is not answered and not held
        by someone else within the lease. Taking a clip adds an "assigned" badge.
        """
        T, B = models.AnnotationTask, models.AnnotationStatusBadge
        async with CLAIM_LOCK:
            project = await api.annotation_projects.get(session, annotation_project_uuid)
            ids = (await session.scalars(
                select(T.id).where(T.annotation_project_id == project.id).order_by(T.id)
            )).all()
            in_project = select(T.id).where(T.annotation_project_id == project.id)
            rows = (await session.execute(
                select(B.annotation_task_id, B.user_id, B.state, B.created_on)
                .where(B.annotation_task_id.in_(in_project))
            )).all()
            completed, mine_done, holder = set(), 0, {}
            for task_id, user_id, state, created_on in rows:
                if state == AnnotationState.completed:
                    completed.add(task_id)
                    mine_done += user_id == user.id
                elif state == AnnotationState.assigned:
                    if task_id not in holder or created_on > holder[task_id][1]:
                        holder[task_id] = (user_id, created_on)
            open_ids = [i for i in ids if i not in completed]
            now = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)
            pick = next((i for i in open_ids if i in holder and holder[i][0] == user.id), None)
            if pick is None:
                pick = next((i for i in open_ids if i not in holder
                             or _naive_utc(holder[i][1]) < now - LEASE), None)
            task = None
            if pick is not None:
                # (re)start my lease: one assigned badge per user and task
                await session.execute(delete(B).where(
                    B.annotation_task_id == pick, B.user_id == user.id,
                    B.state == AnnotationState.assigned))
                session.add(B(state=AnnotationState.assigned, annotation_task_id=pick, user_id=user.id))
                await session.commit()
                api.annotation_tasks._cache.clear()
                uuid = await session.scalar(select(T.uuid).where(T.id == pick))
                task = await api.annotation_tasks.get(session, uuid)
            return Claim(task=task, done_by_me=mine_done, remaining=len(open_ids), total=len(ids))

    return annotation_tasks_router
