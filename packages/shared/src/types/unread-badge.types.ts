export interface UnreadBadgeState {
  totalUnread: number;
  caseUpdatesUnread: number;
  moderationUnread: number;
  directRepliesUnread: number;
  hasUrgentUnread: boolean;
}

export interface NotificationReadStateUpdate {
  userId: string;
  readNotificationIds?: string[];
  markAllAsRead?: boolean;
  updatedAtIso: string;
}
