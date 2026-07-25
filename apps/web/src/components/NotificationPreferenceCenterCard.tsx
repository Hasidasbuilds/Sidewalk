import React from 'react';

export function NotificationPreferenceCenterCard() {
  return (
    <div style={{ padding: '20px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a' }}>Notification Preference Center</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Report Status Updates</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Receive alerts when civic cases change status</div>
          </div>
          <input type="checkbox" defaultChecked />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Moderation & Flag Events</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Receive alerts regarding content moderation feedback</div>
          </div>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
    </div>
  );
}
