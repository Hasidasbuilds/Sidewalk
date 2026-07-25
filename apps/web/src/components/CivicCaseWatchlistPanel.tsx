import React from 'react';
import type { CivicWatchlistItem } from '@qyou/shared';

interface CivicCaseWatchlistPanelProps {
  items?: CivicWatchlistItem[];
  onRemoveItem?: (caseId: string) => void;
}

export function CivicCaseWatchlistPanel({ items = [], onRemoveItem }: CivicCaseWatchlistPanelProps) {
  return (
    <div style={{ padding: '20px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a' }}>Watched Civic Cases</h3>
      {items.length === 0 ? (
        <p style={{ fontSize: '13px', color: '#64748b' }}>No civic cases currently added to your watchlist.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item) => (
            <div key={item.caseId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>📍 {item.neighborhood} | Category: {item.category}</div>
              </div>
              {onRemoveItem && (
                <button onClick={() => onRemoveItem(item.caseId)} style={{ padding: '4px 8px', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                  Unwatch
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
