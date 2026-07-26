import React from 'react';

interface UnreadNotificationBadgeIconProps {
  unreadCount?: number;
  hasUrgent?: boolean;
}

export function UnreadNotificationBadgeIcon({ unreadCount = 0, hasUrgent = false }: UnreadNotificationBadgeIconProps) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <span style={{ fontSize: '20px' }}>🔔</span>
      {unreadCount > 0 && (
        <span style={{ position: 'absolute', top: '-4px', right: '-8px', background: hasUrgent ? '#ef4444' : '#2563eb', color: '#ffffff', fontSize: '10px', fontWeight: 'bold', borderRadius: '10px', padding: '2px 6px', lineHeight: 1 }}>
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </div>
  );
}
