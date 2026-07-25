import React from 'react';
import type { GroupedCaseNotification } from '@qyou/shared';

interface GroupedCaseNotificationCardProps {
  groupedNotification: GroupedCaseNotification;
}

export function GroupedCaseNotificationCard({ groupedNotification }: GroupedCaseNotificationCardProps) {
  return (
    <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#0f172a' }}>{groupedNotification.caseTitle}</h4>
        <span style={{ padding: '2px 8px', background: '#e0f2fe', color: '#0369a1', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
          {groupedNotification.updateCount} updates
        </span>
      </div>
      <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>{groupedNotification.latestMessage}</p>
    </div>
  );
}
