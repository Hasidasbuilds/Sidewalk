import React from 'react';
import type { MentionNotificationPayload } from '@qyou/shared';

interface MentionNotificationToastProps {
  payload: MentionNotificationPayload;
  onView?: (caseId: string, commentId: string) => void;
}

export function MentionNotificationToast({ payload, onView }: MentionNotificationToastProps) {
  return (
    <div style={{ padding: '12px 16px', background: '#3b82f6', color: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '18px' }}>💬</span>
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
          {payload.author.username} mentioned you
        </div>
      </div>
      <p style={{ margin: 0, fontSize: '13px', fontStyle: 'italic', opacity: 0.9 }}>
        "{payload.snippet}"
      </p>
      {onView && (
        <button onClick={() => onView(payload.caseId, payload.commentId)} style={{ alignSelf: 'flex-start', background: '#ffffff', color: '#1e3a8a', border: 'none', borderRadius: '4px', padding: '4px 10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '4px' }}>
          View Reply
        </button>
      )}
    </div>
  );
}
