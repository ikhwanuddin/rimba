"""Common FastAPI dependencies for rimba."""

from rimba.routes.dependencies.auth import get_current_user_dependency
from rimba.routes.dependencies.session import Session
from rimba.routes.dependencies.settings import RimbaSettings
from rimba.routes.dependencies.users import get_user_db, get_user_manager

__all__ = [
    "Session",
    "RimbaSettings",
    "get_user_db",
    "get_user_manager",
    "get_current_user_dependency",
]
