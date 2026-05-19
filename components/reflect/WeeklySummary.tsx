'use client';

import { useMainStore } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { MOOD_EMOJIS } from '@/lib/constants';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { CalendarDays, TrendingUp, Dumbbell, BookOpen } from 'lucide-react';

export function WeeklySummary() {
  const logs = useMainStore((s) => s.logs);

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const weekLogs = days.map((d) => {
    const dateStr = format(d, 'yyyy-MM-dd');
    return logs[dateStr] || null;
  });

  const fitnessDays = weekLogs.filter((l) => l?.fitness.completed).length;
  const learningDays = weekLogs.filter((l) => l?.learning.completed).length;
  const reflectionDays = weekLogs.filter((l) => l?.reflection.completed).length;
  const totalLearningMinutes = weekLogs.reduce((sum, l) => sum + (l?.learning.totalMinutes || 0), 0);

  const avgMood = weekLogs.reduce((sum, l, i, arr) => {
    const filtered = arr.filter(Boolean);
    return sum + (l?.mood || 0);
  }, 0) / (weekLogs.filter(Boolean).length || 1);

  return (
    <Card delay={0.2}>
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays size={16} style={{ color: 'var(--accent)' }} />
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          本周概览
        </h3>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {format(weekStart, 'M.d')} - {format(weekEnd, 'M.d')}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-card-hover)' }}>
          <Dumbbell size={16} className="mx-auto mb-1" style={{ color: 'var(--success)' }} />
          <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{fitnessDays}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>训练天数</p>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-card-hover)' }}>
          <BookOpen size={16} className="mx-auto mb-1" style={{ color: 'var(--accent)' }} />
          <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{learningDays}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>学习天数</p>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-card-hover)' }}>
          <TrendingUp size={16} className="mx-auto mb-1" style={{ color: 'var(--warning)' }} />
          <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{Math.round(totalLearningMinutes / 60 * 10) / 10}h</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>学习时长</p>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          每日情绪
        </h4>
        <div className="flex gap-1.5">
          {days.map((d, i) => {
            const dateStr = format(d, 'yyyy-MM-dd');
            const log = logs[dateStr];
            const isToday = dateStr === format(today, 'yyyy-MM-dd');
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-1 py-2 rounded-lg"
                style={{
                  backgroundColor: isToday ? 'var(--accent-glow)' : 'transparent',
                }}
              >
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {format(d, 'E')}
                </span>
                <span className="text-lg">
                  {log ? MOOD_EMOJIS[log.mood] : '—'}
                </span>
              </div>
            );
          })}
        </div>
        {weekLogs.filter(Boolean).length > 0 && (
          <p className="text-xs mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
            本周平均情绪: {MOOD_EMOJIS[Math.round(avgMood)] || '😐'}
            {' '}· 复盘 {reflectionDays}/7 天
          </p>
        )}
      </div>
    </Card>
  );
}
