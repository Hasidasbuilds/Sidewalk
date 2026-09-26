from collections.abc import AsyncGenerator
from typing import Annotated
from fastapi import Depends
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from src.core.config import get_settings

settings = get_settings()

database_url = settings.DATABASE_URL
if database_url.startswith("postgresql://"):
    database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
elif database_url.startswith("sqlite://") and not database_url.startswith("sqlite+aiosqlite://"):
    database_url = database_url.replace("sqlite://", "sqlite+aiosqlite://", 1)

engine_kwargs = {}
if "sqlite" not in database_url:
    engine_kwargs.update({
        "pool_size": settings.DB_POOL_SIZE,
        "max_overflow": settings.DB_MAX_OVERFLOW,
        "pool_pre_ping": True,
    })

engine = create_async_engine(database_url, **engine_kwargs)
async_session_factory = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_factory() as session:
        try:
            yield session
        finally:
            await session.close()


DBSession = Annotated[AsyncSession, Depends(get_db)]
