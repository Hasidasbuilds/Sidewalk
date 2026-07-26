export interface CommentAuthorInfo {
  userId: string;
  username: string;
  role: 'citizen' | 'moderator' | 'admin';
}

export interface MentionTag {
  mentionedUsername: string;
  startIndex: number;
  endIndex: number;
}

export interface MentionNotificationPayload {
  notificationId: string;
  author: CommentAuthorInfo;
  caseId: string;
  commentId: string;
  snippet: string;
  mentions: MentionTag[];
  notifiedAtIso: string;
}
