import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from src.core.enums import ReportCategory, ReportStatus
from src.core.exceptions import NotFoundError
from src.modules.reports import repository as report_repo
from src.modules.reports.schemas import CreateReportRequest, ReportResponse, UpdateReportRequest


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


async def get_report(db: AsyncSession, report_id: uuid.UUID) -> ReportResponse:
    report = await report_repo.get_report_by_id(db, report_id)
    if not report:
        raise NotFoundError("Report not found")
    return ReportResponse.model_validate(report)


async def list_reports(db: AsyncSession, skip: int = 0, limit: int = 50) -> list[ReportResponse]:
    reports = await report_repo.list_reports(db, skip=skip, limit=limit)
    return [ReportResponse.model_validate(r) for r in reports]


async def update_report(
    db: AsyncSession, report_id: uuid.UUID, user_id: uuid.UUID, payload: UpdateReportRequest
) -> ReportResponse:
    report = await report_repo.get_report_by_id(db, report_id)
    if not report:
        raise NotFoundError("Report not found")
    data = payload.model_dump(exclude_none=True)
    if "category" in data and isinstance(data["category"], ReportCategory):
        data["category"] = data["category"].value
    if "status" in data and isinstance(data["status"], ReportStatus):
        data["status"] = data["status"].value
    updated = await report_repo.update_report(db, report, **data)
    await db.commit()
    return ReportResponse.model_validate(updated)


async def delete_report(db: AsyncSession, report_id: uuid.UUID, user_id: uuid.UUID) -> None:
    report = await report_repo.get_report_by_id(db, report_id)
    if not report:
        raise NotFoundError("Report not found")
    await report_repo.soft_delete_report(db, report)
    await db.commit()
