"""Python API for Rimba."""

from rimba.api.annotation_projects import annotation_projects
from rimba.api.annotation_tasks import annotation_tasks
from rimba.api.audio import load_audio, load_clip_bytes
from rimba.api.clip_annotations import clip_annotations
from rimba.api.clip_evaluations import clip_evaluations
from rimba.api.clip_predictions import clip_predictions
from rimba.api.clips import clips
from rimba.api.datasets import datasets
from rimba.api.evaluation_sets import evaluation_sets
from rimba.api.evaluations import evaluations
from rimba.api.features import features, find_feature, find_feature_value
from rimba.api.model_runs import model_runs
from rimba.api.notes import notes
from rimba.api.recordings import recordings
from rimba.api.sessions import create_session
from rimba.api.sound_event_annotations import sound_event_annotations
from rimba.api.sound_event_evaluations import sound_event_evaluations
from rimba.api.sound_event_predictions import sound_event_predictions
from rimba.api.sound_events import sound_events
from rimba.api.spectrograms import compute_spectrogram
from rimba.api.tags import find_tag, find_tag_value, tags
from rimba.api.user_runs import user_runs
from rimba.api.users import users

__all__ = [
    "annotation_projects",
    "annotation_tasks",
    "clip_annotations",
    "clip_evaluations",
    "clip_predictions",
    "clips",
    "compute_spectrogram",
    "create_session",
    "datasets",
    "evaluation_sets",
    "evaluations",
    "features",
    "find_feature",
    "find_feature_value",
    "find_tag",
    "find_tag_value",
    "load_audio",
    "load_clip_bytes",
    "model_runs",
    "notes",
    "recordings",
    "sound_event_annotations",
    "sound_event_evaluations",
    "sound_event_predictions",
    "sound_events",
    "tags",
    "user_runs",
    "users",
]
