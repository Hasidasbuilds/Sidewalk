import React from 'react';
import type { AlertPreviewPayload } from '@qyou/shared';

interface AlertPreviewExplainerCardProps {
  preview: AlertPreviewPayload;
}

export function AlertPreviewExplainerCard({ preview }: AlertPreviewExplainerCardProps) {
  return (
    <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
      <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#0f172a' }}>{preview.headline}</h4>
      <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#334155' }}>{preview.bodySnippet}</p>
      <div style={{ padding: '8px 12px', background: '#eff6ff', borderLeft: '3px solid #3b82f6', borderRadius: '4px', fontSize: '12px', color: '#1e40af' }}>
        ℹ️ <strong>Why you got this alert:</strong> {preview.explainerCopy}
      </div>
    </div>
  );
}
