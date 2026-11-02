"""Filtersets for the API.

This module defines the ways in which the API can filter the data it
returns and provides some helper functions for the filtersets.
"""

from rimba.filters.annotation_projects import AnnotationProjectFilter
from rimba.filters.annotation_tasks import AnnotationTaskFilter
from rimba.filters.base import Filter
from rimba.filters.clip_annotation_notes import ClipAnnotationNoteFilter
from rimba.filters.clip_annotation_tags import ClipAnnotationTagFilter
from rimba.filters.clip_annotations import ClipAnnotationFilter
from rimba.filters.clip_evaluations import ClipEvaluationFilter
from rimba.filters.clip_predictions import ClipPredictionFilter
from rimba.filters.clips import ClipFilter
from rimba.filters.datasets import DatasetFilter
from rimba.filters.evaluation_sets import EvaluationSetFilter
from rimba.filters.evaluations import EvaluationFilter
from rimba.filters.feature_names import FeatureNameFilter
from rimba.filters.model_runs import ModelRunFilter
from rimba.filters.notes import NoteFilter
from rimba.filters.recording_notes import RecordingNoteFilter
from rimba.filters.recording_tags import RecordingTagFilter
from rimba.filters.recordings import RecordingFilter
from rimba.filters.sound_event_annotation_notes import (
    SoundEventAnnotationNoteFilter,
)
from rimba.filters.sound_event_annotation_tags import (
    SoundEventAnnotationTagFilter,
)
from rimba.filters.sound_event_annotations import SoundEventAnnotationFilter
from rimba.filters.sound_event_evaluations import SoundEventEvaluationFilter
from rimba.filters.sound_event_predictions import SoundEventPredictionFilter
from rimba.filters.sound_events import SoundEventFilter
from rimba.filters.tags import TagFilter
from rimba.filters.user_runs import UserRunFilter

__all__ = [
    "AnnotationProjectFilter",
    "AnnotationTaskFilter",
    "ClipAnnotationFilter",
    "ClipAnnotationNoteFilter",
    "ClipAnnotationTagFilter",
    "ClipEvaluationFilter",
    "ClipPredictionFilter",
    "ClipFilter",
    "DatasetFilter",
    "EvaluationSetFilter",
    "EvaluationFilter",
    "FeatureNameFilter",
    "Filter",
    "ModelRunFilter",
    "NoteFilter",
    "RecordingFilter",
    "RecordingNoteFilter",
    "RecordingTagFilter",
    "SoundEventAnnotationFilter",
    "SoundEventAnnotationNoteFilter",
    "SoundEventAnnotationTagFilter",
    "SoundEventEvaluationFilter",
    "SoundEventPredictionFilter",
    "SoundEventFilter",
    "TagFilter",
    "UserRunFilter",
]
