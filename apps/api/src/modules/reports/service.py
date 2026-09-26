import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from src.core.enums import ReportStatus
from src.modules.reports import repository as report_repo
from src.modules.reports.schemas import CreateReportRequest, ReportResponse


async def create_report(db: AsyncSession, user_id: uuid.UUID, payload: CreateReportRequest) -> ReportResponse:
    report = await report_repo.create_report(
        db,
        user_id=user_id,
        title=payload.title,
        description=payload.description,
        category=payload.category.value,
        status=ReportStatus.submitted.value,
        latitude=payload.latitude,
        longitude=payload.longitude,
        address=payload.address,
        media_urls=payload.media_urls,
    )
    await db.commit()
    return ReportResponse.model_validate(report)


async def list_reports(db: AsyncSession, skip: int = 0, limit: int = 50) -> list[ReportResponse]:
    reports = await report_repo.list_reports(db, skip=skip, limit=limit)
    return [ReportResponse.model_validate(r) for r in reports]
