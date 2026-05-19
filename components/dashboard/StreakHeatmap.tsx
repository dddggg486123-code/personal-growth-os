'use client';

import { useMainStore } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { format, subDays, startOfWeek, getDay } from 'date-fns';

export function StreakHeatmap() {
  const logs = useMainStore((s) => s.logs);

  const today = new Date();
  const weeks = 13;
  const daysOfWeek = ['一', '二', '三', '四', '五', '六', '日'];

  const startDate = subDays(today, weeks * 7 - 1);
  const startWeek = startOfWeek(startDate, { weekStartsOn: 1 });

  const cells: { date: string; level: number }[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: { date: string; level: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startWeek);
      date.setDate(date.getDate() + w * 7 + d);
      const dateStr = format(date, 'yyyy-MM-dd');
      const log = logs[dateStr];

      let level = 0;
      if (log) {
        const completions = [
          log.fitness.completed ? 1 : 0,
          log.learning.completed ? 1 : 0,
          log.reflection.completed ? 1 : 0,
        ];
        level = completions.reduce((a, b) => a + b, 0);
      }

      week.push({ date: dateStr, level });
    }
    cells.push(week);
  }

  const getColor = (level: number) => {
    if (level === 0) return 'var(--border)';
    if (level === 1) return 'rgba(99, 102, 241, 0.25)';
    if (level === 2) return 'rgba(99, 102, 241, 0.55)';
    return 'var(--accent)';
  };

  return (
    <Card delay={0.3}>
      <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
        成长热力图
      </h3>

      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-1">
          {daysOfWeek.map((d, i) => (
            <span
              key={i}
              className="text-xs leading-4 w-5 text-right"
              style={{ color: 'var(--text-muted)', visibility: i % 2 === 1 ? 'visible' : 'hidden' }}
            >
              {d}
            </span>
          ))}
        </div>

        <div className="flex gap-1 overflow-x-auto pb-1">
          {cells.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((cell, di) => (
                <div
                  key={`${wi}-${di}`}
                  className="heatmap-cell w-3 h-3"
                  style={{ backgroundColor: getColor(cell.level) }}
                  title={`${cell.date}: ${cell.level}/3 完成`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
        <span>少</span>
        {[0, 1, 2, 3].map((level) => (
          <div key={level} className="w-3 h-3 rounded-sm" style={{ backgroundColor: getColor(level) }} />
        ))}
        <span>多</span>
      </div>
    </Card>
  );
}
