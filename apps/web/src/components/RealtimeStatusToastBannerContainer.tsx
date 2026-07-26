import React from 'react';
import type { ToastNotificationMessage } from '@qyou/shared';

interface RealtimeStatusToastBannerContainerProps {
  toasts?: ToastNotificationMessage[];
  onDismiss?: (id: string) => void;
}

export function RealtimeStatusToastBannerContainer({ toasts = [], onDismiss }: RealtimeStatusToastBannerContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {toasts.map((t) => (
        <div key={t.id} style={{ background: '#0f172a', color: '#ffffff', padding: '12px 16px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '280px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{t.title}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{t.message}</div>
          </div>
          {onDismiss && (
            <button onClick={() => onDismiss(t.id)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '16px' }}>
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
