import React from 'react';
import type { InAppNotificationItem } from '@qyou/shared';

interface InAppNotificationInboxDrawerProps {
  isOpen: boolean;
  items?: InAppNotificationItem[];
  onClose?: () => void;
}

export function InAppNotificationInboxDrawer({ isOpen, items = [], onClose }: InAppNotificationInboxDrawerProps) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '380px', background: '#ffffff', borderLeft: '1px solid #cbd5e1', boxShadow: '-4px 0 12px rgba(0,0,0,0.08)', zIndex: 900, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>Notifications Inbox</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {items.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center' }}>Your inbox is empty.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} style={{ padding: '12px', background: item.isRead ? '#ffffff' : '#f0f9ff', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '8px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{item.title}</div>
              <div style={{ fontSize: '12px', color: '#475569' }}>{item.body}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
