from fastapi import APIRouter
from sqlalchemy import text
from src.core.config import get_settings
from src.core.database import DBSession

router = APIRouter(prefix="", tags=["core"])


@router.get("/health")
async def health_check(db: DBSession):
    settings = get_settings()
    db_status = "ok"
    try:
        await db.execute(text("SELECT 1"))
    except Exception as exc:
        db_status = f"error: {exc}"
    return {
        "status": "ok",
        "version": settings.API_VERSION,
        "environment": settings.ENVIRONMENT,
        "db": db_status,
    }
