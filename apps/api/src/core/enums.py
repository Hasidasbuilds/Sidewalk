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


class CaseStatus(str, enum.Enum):
    opened = "opened"
    in_review = "in_review"
    action_scheduled = "action_scheduled"
    in_progress = "in_progress"
    resolved = "resolved"
    closed = "closed"


CASE_STATUS_TRANSITIONS: dict[CaseStatus, list[CaseStatus]] = {
    CaseStatus.opened: [CaseStatus.in_review, CaseStatus.closed],
    CaseStatus.in_review: [
        CaseStatus.action_scheduled,
        CaseStatus.in_progress,
        CaseStatus.closed,
    ],
    CaseStatus.action_scheduled: [CaseStatus.in_progress, CaseStatus.closed],
    CaseStatus.in_progress: [CaseStatus.resolved, CaseStatus.closed],
    CaseStatus.resolved: [CaseStatus.closed],
    CaseStatus.closed: [],
}
