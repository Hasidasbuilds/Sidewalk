import enum


class ReportStatus(str, enum.Enum):
    submitted = "submitted"
    under_review = "under_review"
    verified = "verified"
    assigned = "assigned"
    in_progress = "in_progress"
    resolved = "resolved"
    closed = "closed"


REPORT_STATUS_TRANSITIONS: dict[ReportStatus, list[ReportStatus]] = {
    ReportStatus.submitted: [
        ReportStatus.under_review,
        ReportStatus.closed,
    ],
    ReportStatus.under_review: [
        ReportStatus.verified,
        ReportStatus.closed,
    ],
    ReportStatus.verified: [
        ReportStatus.assigned,
        ReportStatus.in_progress,
        ReportStatus.closed,
    ],
    ReportStatus.assigned: [
        ReportStatus.in_progress,
        ReportStatus.closed,
    ],
    ReportStatus.in_progress: [
        ReportStatus.resolved,
        ReportStatus.closed,
    ],
    ReportStatus.resolved: [ReportStatus.closed],
    ReportStatus.closed: [],
}


class ReportCategory(str, enum.Enum):
    road = "road"
    waste = "waste"
    infrastructure = "infrastructure"
    environment = "environment"
    utility = "utility"
