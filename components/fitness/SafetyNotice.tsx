'use client';

import { Card } from '@/components/shared/Card';
import { AlertTriangle, Heart, Droplets, Activity } from 'lucide-react';

export function SafetyNotice() {
  return (
    <Card delay={0.3}>
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle size={16} style={{ color: 'var(--warning)' }} />
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          高血压安全模式
        </h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <Heart size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--danger)' }} />
          <span>运动前测量血压，如果收缩压 &gt; 160 或舒张压 &gt; 100，建议休息或轻度散步</span>
        </div>
        <div className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <Activity size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
          <span>运动过程中避免憋气，保持呼吸顺畅，如感头晕立即停止</span>
        </div>
        <div className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <Droplets size={12} className="mt-0.5 flex-shrink-0" style={{ color: '#3b82f6' }} />
          <span>运动前后充分补水，避免一次性大量饮水</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t text-xs" style={{ borderColor: 'var(--border)', color: 'var(--success)' }}>
        💚 减重5-10% 可以显著改善血压，你已经在这条路上
      </div>
    </Card>
  );
}
