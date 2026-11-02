"""Settings dependencies."""

from typing import Annotated

from fastapi import Depends

from rimba.system.settings import Settings, get_settings

__all__ = [
    "RimbaSettings",
]


RimbaSettings = Annotated[Settings, Depends(get_settings)]
