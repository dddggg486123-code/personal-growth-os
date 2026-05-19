'use client';

import { useMainStore } from '@/lib/store';
import { getTodayLog, computeStreaks } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { getAdaptiveMessage } from '@/lib/state-detector';
import { Sparkles } from 'lucide-react';
import { useMemo } from 'react';

export function GreetingCard() {
  const logs = useMainStore((s) => s.logs);

  const { todayLog, streaks, message } = useMemo(() => {
    const todayLog = getTodayLog(logs);
    const streaks = computeStreaks(logs);
    const message = getAdaptiveMessage(todayLog.state);
    return { todayLog, streaks, message };
  }, [logs]);

  return (
    <Card className="relative overflow-hidden" delay={0}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: 'var(--accent)' }} />

      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} style={{ color: 'var(--accent)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
            今日状态: {todayLog.state === 'peak' ? '巅峰 🔥' : todayLog.state === 'low' ? '偏低 🪫' : todayLog.state === 'recovery' ? '恢复中 🌿' : '正常 ⚡'}
          </span>
        </div>

        <p className="text-base md:text-lg font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
          {message}
        </p>

        {streaks.currentStreak > 0 && (
          <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>🔥 连续 {streaks.currentStreak} 天</span>
            <span>🏆 最佳 {streaks.bestStreak} 天</span>
          </div>
        )}
      </div>
    </Card>
  );
}
