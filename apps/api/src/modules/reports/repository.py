import uuid
from typing import Any
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from src.modules.reports.models import Report


async def create_report(db: AsyncSession, user_id: uuid.UUID, **fields: Any) -> Report:
    report = Report(user_id=user_id, **fields)
    db.add(report)
    await db.flush()
    await db.refresh(report)
    return report


async def get_report_by_id(db: AsyncSession, report_id: uuid.UUID) -> Report | None:
    stmt = select(Report).where(Report.id == report_id, Report.is_deleted.is_(False))
    result = await db.execute(stmt)
    return result.scalar_one_or_none()


async def list_reports(db: AsyncSession, skip: int = 0, limit: int = 50) -> list[Report]:
    stmt = select(Report).where(Report.is_deleted.is_(False)).order_by(Report.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(stmt)
    return list(result.scalars().all())
