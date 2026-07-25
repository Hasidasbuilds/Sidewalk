import React from 'react';
import type { ReportLifecycleStage } from '@qyou/shared';

interface ReportLifecycleTriggerBadgeProps {
  stage?: ReportLifecycleStage;
}

export function ReportLifecycleTriggerBadge({ stage = 'submitted' }: ReportLifecycleTriggerBadgeProps) {
  const getBadgeColor = (s: ReportLifecycleStage) => {
    switch (s) {
      case 'resolved': return { bg: '#dcfce7', text: '#15803d' };
      case 'work_scheduled': return { bg: '#e0f2fe', text: '#0369a1' };
      case 'under_investigation': return { bg: '#fef3c7', text: '#b45309' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const style = getBadgeColor(stage);

  return (
    <span style={{ padding: '4px 10px', borderRadius: '12px', background: style.bg, color: style.text, fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
      {stage.replace('_', ' ')}
    </span>
  );
}
