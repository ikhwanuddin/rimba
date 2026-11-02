from contextlib import asynccontextmanager

from fastapi import FastAPI

from rimba.system.boot import rimba_init
from rimba.system.settings import Settings

__all__ = ["lifespan"]


@asynccontextmanager
async def lifespan(settings: Settings, _: FastAPI):
    """Context manager to run startup and shutdown events."""
    await rimba_init(settings)

    yield
