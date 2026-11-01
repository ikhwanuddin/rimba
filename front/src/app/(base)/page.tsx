"use client";

/* Way Canguk fork: home page. One card per annotation project with the
 * annotator's own progress and a button to start or continue; admins also see
 * how many clips each annotator has answered. */
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import useAnnotationProjects from "@/app/hooks/api/useAnnotationProjects";

import api from "@/app/api";
import UserContext from "@/app/contexts/user";

import type { AnnotationProject } from "@/lib/types";

function ProjectCard({
  project,
  isAdmin,
}: {
  project: AnnotationProject;
  isAdmin: boolean;
}) {
  const { data: p } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["annotation_project_progress", project.uuid],
    queryFn: () => api.annotationTasks.progress(project),
  });
  const answered = p ? p.total - p.remaining : 0;
  const pct = p && p.total ? Math.round((100 * answered) / p.total) : 0;
  const href = `/annotation_projects/detail/annotation/?annotation_project_uuid=${project.uuid}`;
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800">
      <div>
        <h2 className="text-xl font-bold">{project.name}</h2>
        <p className="text-stone-600 dark:text-stone-400">
          {project.description}
        </p>
      </div>
      {p && (
        <div className="flex flex-col gap-1">
          <div className="h-3 w-full rounded-full bg-stone-200 dark:bg-stone-700">
            <div
              className="h-3 rounded-full bg-emerald-600"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {answered} dari {p.total} klip terjawab ({pct}%) · jawabanmu{" "}
            {p.done_by_me}
          </p>
          {isAdmin && Object.keys(p.by_user).length > 0 && (
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Per anotator:{" "}
              {Object.entries(p.by_user)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([u, n]) => `${u} ${n}`)
                .join(" · ")}
            </p>
          )}
        </div>
      )}
      <a
        href={href}
        className="w-fit rounded-lg bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800"
      >
        {p && p.done_by_me > 0 ? "Lanjutkan anotasi →" : "Mulai anotasi →"}
      </a>
    </div>
  );
}

export default function Page() {
  const user = useContext(UserContext);
  const isAdmin = user?.is_superuser === true;
  const { items, isLoading } = useAnnotationProjects({ pageSize: 100 });
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold">
        Halo, {user?.name || user?.username}
      </h1>
      {isLoading ? (
        <p className="text-stone-500">Memuat proyek…</p>
      ) : items.length === 0 ? (
        <p className="text-stone-500">Belum ada proyek anotasi.</p>
      ) : (
        items.map((project) => (
          <ProjectCard key={project.uuid} project={project} isAdmin={isAdmin} />
        ))
      )}
    </div>
  );
}
