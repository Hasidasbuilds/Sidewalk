import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from src.core.enums import ReportCategory, ReportStatus


class CreateReportRequest(BaseModel):
    title: str = Field(min_length=3, max_length=255)
    description: str = Field(min_length=1)
    category: ReportCategory
    latitude: float | None = None
    longitude: float | None = None
    address: str | None = Field(default=None, max_length=500)
    media_urls: list[str] = Field(default_factory=list)


class UpdateReportRequest(BaseModel):
    title: str | None = Field(default=None, min_length=3, max_length=255)
    description: str | None = Field(default=None, min_length=1)
    category: ReportCategory | None = None
    status: ReportStatus | None = None
    latitude: float | None = None
    longitude: float | None = None
    address: str | None = Field(default=None, max_length=500)
    media_urls: list[str] | None = None


class ReportResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str
    category: ReportCategory
    status: ReportStatus
    user_id: uuid.UUID
    latitude: float | None = None
    longitude: float | None = None
    address: str | None = None
    media_urls: list[str] = Field(default_factory=list)
    is_deleted: bool = False
    flagged: bool = False
    flag_reason: str | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
