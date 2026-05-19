'use client';

import { useMainStore, getTodayLog } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { ProgressRing } from '@/components/shared/ProgressRing';
import { Dumbbell, BookOpen, BookMarked, Droplets } from 'lucide-react';
import { useMemo } from 'react';

export function TodayProgress() {
  const logs = useMainStore((s) => s.logs);
  const todayLog = useMemo(() => getTodayLog(logs), [logs]);

  const rings = [
    {
      label: '健身', icon: Dumbbell,
      percent: todayLog.fitness.completed ? 100 : 0,
      color: 'var(--success)',
      detail: todayLog.fitness.completed ? `${todayLog.fitness.duration || 0}分钟` : '未完成',
    },
    {
      label: '学习', icon: BookOpen,
      percent: todayLog.learning.completed ? 100 : 0,
      color: 'var(--accent)',
      detail: todayLog.learning.completed ? `${todayLog.learning.totalMinutes || 0}分钟` : '未完成',
    },
    {
      label: '复盘', icon: BookMarked,
      percent: todayLog.reflection.completed ? 100 : 0,
      color: 'var(--warning)',
      detail: todayLog.reflection.completed ? '已完成' : '未完成',
    },
    {
      label: '饮水', icon: Droplets,
      percent: Math.min(100, (todayLog.diet.water / 2000) * 100),
      color: '#3b82f6',
      detail: `${Math.round(todayLog.diet.water || 0)}ml`,
    },
  ];

  return (
    <Card delay={0.2}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>今日完成度</h3>
      <div className="grid grid-cols-4 gap-2">
        {rings.map((ring) => (
          <div key={ring.label} className="flex flex-col items-center gap-1.5">
            <ProgressRing percent={ring.percent} size={64} strokeWidth={5} color={ring.color}>
              <ring.icon size={18} style={{ color: ring.percent >= 100 ? ring.color : 'var(--text-muted)' }} />
            </ProgressRing>
            <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{ring.label}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{ring.detail}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
