import React from 'react';
import type { NotificationAuditLogItem } from '@qyou/shared';

interface NotificationAuditHistoryTableProps {
  logs?: NotificationAuditLogItem[];
}

export function NotificationAuditHistoryTable({ logs = [] }: NotificationAuditHistoryTableProps) {
  return (
    <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ padding: '10px 14px' }}>Sent Date</th>
            <th style={{ padding: '10px 14px' }}>Channel</th>
            <th style={{ padding: '10px 14px' }}>Title</th>
            <th style={{ padding: '10px 14px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ padding: '16px', color: '#64748b', textAlign: 'center' }}>
                No notification audit logs recorded.
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log.auditId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px' }}>{new Date(log.sentAtIso).toLocaleString()}</td>
                <td style={{ padding: '10px 14px', textTransform: 'uppercase' }}>{log.channel}</td>
                <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>{log.title}</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', background: log.status === 'sent' ? '#dcfce7' : '#fee2e2', color: log.status === 'sent' ? '#166534' : '#991b1b' }}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
