"""Module defining the main database models of rimba.

We are using SQLAlchemy to define our database models. The models are
defined in separate files, and then imported into this module. This
allows us to keep the models organized, and also allows us to import the
models into other modules without having to import the entire database
module.
"""

from rimba.models.annotation_project import (
    AnnotationProject,
    AnnotationProjectTag,
)
from rimba.models.annotation_task import (
    AnnotationStatusBadge,
    AnnotationTask,
)
from rimba.models.base import Base
from rimba.models.clip import Clip, ClipFeature
from rimba.models.clip_annotation import (
    ClipAnnotation,
    ClipAnnotationNote,
    ClipAnnotationTag,
)
from rimba.models.clip_evaluation import ClipEvaluation, ClipEvaluationMetric
from rimba.models.clip_prediction import ClipPrediction, ClipPredictionTag
from rimba.models.dataset import Dataset, DatasetRecording
from rimba.models.evaluation import Evaluation, EvaluationMetric
from rimba.models.evaluation_set import (
    EvaluationSet,
    EvaluationSetAnnotation,
    EvaluationSetModelRun,
    EvaluationSetTag,
    EvaluationSetUserRun,
)
from rimba.models.feature import FeatureName
from rimba.models.model_run import (
    ModelRun,
    ModelRunEvaluation,
    ModelRunPrediction,
)
from rimba.models.note import Note
from rimba.models.recording import (
    Recording,
    RecordingFeature,
    RecordingNote,
    RecordingOwner,
    RecordingTag,
)
from rimba.models.sound_event import SoundEvent, SoundEventFeature
from rimba.models.sound_event_annotation import (
    SoundEventAnnotation,
    SoundEventAnnotationNote,
    SoundEventAnnotationTag,
)
from rimba.models.sound_event_evaluation import (
    SoundEventEvaluation,
    SoundEventEvaluationMetric,
)
from rimba.models.sound_event_prediction import (
    SoundEventPrediction,
    SoundEventPredictionTag,
)
from rimba.models.tag import Tag
from rimba.models.token import AccessToken
from rimba.models.user import User
from rimba.models.user_run import (
    UserRun,
    UserRunEvaluation,
    UserRunPrediction,
)

__all__ = [
    "AccessToken",
    "AnnotationProject",
    "AnnotationProjectTag",
    "AnnotationStatusBadge",
    "AnnotationTask",
    "Base",
    "Clip",
    "ClipAnnotation",
    "ClipAnnotationNote",
    "ClipAnnotationTag",
    "ClipEvaluation",
    "ClipEvaluationMetric",
    "ClipFeature",
    "ClipPrediction",
    "ClipPredictionTag",
    "Dataset",
    "DatasetRecording",
    "Evaluation",
    "EvaluationMetric",
    "EvaluationSet",
    "EvaluationSetAnnotation",
    "EvaluationSetModelRun",
    "EvaluationSetTag",
    "EvaluationSetUserRun",
    "FeatureName",
    "ModelRun",
    "ModelRunEvaluation",
    "ModelRunPrediction",
    "Note",
    "Recording",
    "RecordingFeature",
    "RecordingNote",
    "RecordingOwner",
    "RecordingTag",
    "SoundEvent",
    "SoundEventAnnotation",
    "SoundEventAnnotationNote",
    "SoundEventAnnotationTag",
    "SoundEventEvaluation",
    "SoundEventEvaluationMetric",
    "SoundEventFeature",
    "SoundEventPrediction",
    "SoundEventPredictionTag",
    "Tag",
    "User",
    "UserRun",
    "UserRunEvaluation",
    "UserRunPrediction",
]
