"""Schemas for Rimba data models.

The Rimba Python API returns these schemas to the user, and they are
the main way that the user interacts with the data.

Schemas are defined using Pydantic, and are used to validate data before
it is inserted into the database, and also to validate data before it is
returned to the user.

Most database models have multiple schemas, a main schema that is used
to return data to the user, and a create and update schema that is used
to validate data before it is inserted into the database.
"""

from rimba.schemas.annotation_projects import (
    AnnotationProject,
    AnnotationProjectCreate,
    AnnotationProjectUpdate,
)
from rimba.schemas.annotation_tasks import (
    AnnotationStatusBadge,
    AnnotationStatusBadgeUpdate,
    AnnotationTask,
    AnnotationTaskCreate,
    AnnotationTaskNote,
    AnnotationTaskUpdate,
)
from rimba.schemas.audio import AudioParameters
from rimba.schemas.base import BaseSchema, Page
from rimba.schemas.clip_annotations import (
    ClipAnnotation,
    ClipAnnotationCreate,
    ClipAnnotationNote,
    ClipAnnotationTag,
    ClipAnnotationUpdate,
)
from rimba.schemas.clip_evaluations import (
    ClipEvaluation,
    ClipEvaluationCreate,
    ClipEvaluationUpdate,
)
from rimba.schemas.clip_predictions import (
    ClipPrediction,
    ClipPredictionCreate,
    ClipPredictionTag,
    ClipPredictionUpdate,
)
from rimba.schemas.clips import Clip, ClipCreate, ClipUpdate
from rimba.schemas.datasets import (
    Dataset,
    DatasetCreate,
    DatasetFile,
    DatasetRecording,
    DatasetRecordingCreate,
    DatasetUpdate,
    FileState,
)
from rimba.schemas.evaluation_sets import (
    EvaluationSet,
    EvaluationSetCreate,
    EvaluationSetUpdate,
)
from rimba.schemas.evaluations import (
    Evaluation,
    EvaluationCreate,
    EvaluationUpdate,
)
from rimba.schemas.features import (
    Feature,
    FeatureName,
    FeatureNameCreate,
    FeatureNameUpdate,
)
from rimba.schemas.model_runs import ModelRun, ModelRunCreate, ModelRunUpdate
from rimba.schemas.notes import Note, NoteCreate, NoteUpdate
from rimba.schemas.plugin import PluginInfo
from rimba.schemas.recordings import (
    Recording,
    RecordingCreate,
    RecordingNote,
    RecordingTag,
    RecordingUpdate,
)
from rimba.schemas.sound_event_annotations import (
    SoundEventAnnotation,
    SoundEventAnnotationCreate,
    SoundEventAnnotationNote,
    SoundEventAnnotationTag,
    SoundEventAnnotationUpdate,
)
from rimba.schemas.sound_event_evaluations import (
    SoundEventEvaluation,
    SoundEventEvaluationCreate,
    SoundEventEvaluationUpdate,
)
from rimba.schemas.sound_event_predictions import (
    SoundEventPrediction,
    SoundEventPredictionCreate,
    SoundEventPredictionTag,
    SoundEventPredictionUpdate,
)
from rimba.schemas.sound_events import (
    SoundEvent,
    SoundEventCreate,
    SoundEventUpdate,
)
from rimba.schemas.spectrograms import (
    AmplitudeParameters,
    Scale,
    SpectrogramParameters,
    STFTParameters,
    Window,
)
from rimba.schemas.tags import (
    PredictedTag,
    Tag,
    TagCount,
    TagCreate,
    TagUpdate,
)
from rimba.schemas.user_runs import UserRun, UserRunCreate, UserRunUpdate
from rimba.schemas.users import SimpleUser, User, UserCreate, UserUpdate

__all__ = [
    "AmplitudeParameters",
    "AnnotationProject",
    "AnnotationProjectCreate",
    "AnnotationProjectUpdate",
    "AnnotationStatusBadge",
    "AnnotationStatusBadgeUpdate",
    "AnnotationTask",
    "AnnotationTaskCreate",
    "AnnotationTaskNote",
    "AnnotationTaskUpdate",
    "AudioParameters",
    "BaseSchema",
    "Clip",
    "ClipAnnotation",
    "ClipAnnotationCreate",
    "ClipAnnotationNote",
    "ClipAnnotationTag",
    "ClipAnnotationUpdate",
    "ClipCreate",
    "ClipEvaluation",
    "ClipEvaluationCreate",
    "ClipEvaluationUpdate",
    "ClipPrediction",
    "ClipPredictionCreate",
    "ClipPredictionTag",
    "ClipPredictionUpdate",
    "ClipUpdate",
    "Dataset",
    "DatasetCreate",
    "DatasetFile",
    "DatasetRecording",
    "DatasetRecordingCreate",
    "DatasetUpdate",
    "Evaluation",
    "EvaluationCreate",
    "EvaluationSet",
    "EvaluationSetCreate",
    "EvaluationSetUpdate",
    "EvaluationUpdate",
    "Feature",
    "FeatureName",
    "FeatureNameCreate",
    "FeatureNameUpdate",
    "FileState",
    "ModelRun",
    "ModelRunCreate",
    "ModelRunUpdate",
    "Note",
    "NoteCreate",
    "NoteUpdate",
    "Page",
    "Page",
    "PluginInfo",
    "PredictedTag",
    "Recording",
    "RecordingCreate",
    "RecordingNote",
    "RecordingTag",
    "RecordingUpdate",
    "STFTParameters",
    "Scale",
    "SimpleUser",
    "SoundEvent",
    "SoundEventAnnotation",
    "SoundEventAnnotationCreate",
    "SoundEventAnnotationNote",
    "SoundEventAnnotationTag",
    "SoundEventAnnotationUpdate",
    "SoundEventCreate",
    "SoundEventEvaluation",
    "SoundEventEvaluationCreate",
    "SoundEventEvaluationUpdate",
    "SoundEventPrediction",
    "SoundEventPredictionCreate",
    "SoundEventPredictionTag",
    "SoundEventPredictionUpdate",
    "SoundEventUpdate",
    "SpectrogramParameters",
    "Tag",
    "TagCount",
    "TagCreate",
    "TagUpdate",
    "User",
    "UserCreate",
    "UserRun",
    "UserRunCreate",
    "UserRunUpdate",
    "UserUpdate",
    "Window",
]
