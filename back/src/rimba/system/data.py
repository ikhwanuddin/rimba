"""Rimba Data management."""

import os
import sys
from pathlib import Path

__all__ = [
    "get_app_data_dir",
    "get_rimba_settings_file",
    "get_rimba_db_file",
]


def _get_windows_app_data_dir() -> Path:
    """Get the application data directory on Windows."""
    return Path.home() / "AppData" / "Local" / "rimba"


def _get_linux_app_data_dir() -> Path:
    """Get the application data directory on Linux."""
    return Path.home() / ".local" / "share" / "rimba"


def _get_macos_app_data_dir() -> Path:
    """Get the application data directory on MacOS."""
    return Path.home() / "Library" / "Application Support" / "rimba"


def get_app_data_dir() -> Path:
    """Get the application data directory.

    This is platform dependent. Can be set with the `RIMBA_DATA_DIR`
    environment variable.
    """
    if "RIMBA_DATA_DIR" in os.environ:
        data_dir = Path(os.environ["RIMBA_DATA_DIR"])
        data_dir.mkdir(parents=True, exist_ok=True)
        return data_dir

    platform = sys.platform

    if platform == "win32":
        data_dir = _get_windows_app_data_dir()
    elif platform.startswith("linux"):
        data_dir = _get_linux_app_data_dir()
    elif platform == "darwin":
        data_dir = _get_macos_app_data_dir()
    else:
        raise RuntimeError(f"Unsupported platform: {platform}")

    data_dir.mkdir(parents=True, exist_ok=True)
    return data_dir


def get_rimba_settings_file() -> Path:
    """Get the path to the Rimba settings file."""
    return get_app_data_dir() / "settings.json"


def get_rimba_db_file() -> Path:
    """Get the path to the Rimba database file."""
    return get_app_data_dir() / "rimba.db"
