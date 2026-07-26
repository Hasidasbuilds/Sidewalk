import React, { useState } from 'react';

export function QuietHoursSettingsCard() {
  const [enabled, setEnabled] = useState(true);
  const [startTime, setStartTime] = useState('22:00');
  const [endTime, setEndTime] = useState('07:00');

  return (
    <div style={{ padding: '20px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>Quiet Hours Preferences</h3>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '16px' }}>
        <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
        <span style={{ fontSize: '14px', color: '#334155' }}>Pause non-urgent community alerts during quiet hours</span>
      </label>
      {enabled && (
        <div style={{ display: 'flex', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>Start Time</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>End Time</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
        </div>
      )}
    </div>
  );
}
