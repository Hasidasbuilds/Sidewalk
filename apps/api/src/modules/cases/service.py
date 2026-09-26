import uuid
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from src.core.exceptions import NotFoundError
from src.modules.cases.models import Case, CaseFollow


async def get_case_by_id(db: AsyncSession, case_id: uuid.UUID) -> Case:
    stmt = select(Case).where(Case.id == case_id)
    result = await db.execute(stmt)
    case = result.scalar_one_or_none()
    if not case:
        raise NotFoundError("Case not found")
    return case


async def follow_case(db: AsyncSession, case_id: uuid.UUID, user_id: uuid.UUID) -> None:
    await get_case_by_id(db, case_id)
    stmt = select(CaseFollow).where(CaseFollow.case_id == case_id, CaseFollow.user_id == user_id)
    result = await db.execute(stmt)
    existing = result.scalar_one_or_none()
    if not existing:
        follow = CaseFollow(case_id=case_id, user_id=user_id)
        db.add(follow)
        await db.commit()


async def unfollow_case(db: AsyncSession, case_id: uuid.UUID, user_id: uuid.UUID) -> None:
    await get_case_by_id(db, case_id)
    stmt = delete(CaseFollow).where(CaseFollow.case_id == case_id, CaseFollow.user_id == user_id)
    await db.execute(stmt)
    await db.commit()


async def is_case_followed(db: AsyncSession, case_id: uuid.UUID, user_id: uuid.UUID) -> bool:
    stmt = select(CaseFollow).where(CaseFollow.case_id == case_id, CaseFollow.user_id == user_id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none() is not None
