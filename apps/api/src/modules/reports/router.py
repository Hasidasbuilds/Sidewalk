from fastapi import APIRouter, Query
from src.core.database import DBSession
from src.modules.auth.dependencies import CurrentUser
from src.modules.reports.schemas import CreateReportRequest, ReportResponse
from src.modules.reports import service as report_service

router = APIRouter(prefix="/reports", tags=["reports"])


@router.post("", response_model=ReportResponse, status_code=201)
async def create_report(
    payload: CreateReportRequest, current_user: CurrentUser, db: DBSession
) -> ReportResponse:
    return await report_service.create_report(db, current_user.id, payload)


@router.get("", response_model=list[ReportResponse])
async def list_reports(
    db: DBSession,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
) -> list[ReportResponse]:
    return await report_service.list_reports(db, skip=skip, limit=limit)
