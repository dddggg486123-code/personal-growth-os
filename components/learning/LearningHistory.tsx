'use client';

import { useMainStore } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { SUBJECT_LABELS, SUBJECT_ICONS } from '@/lib/constants';
import { BookOpen, Clock, TrendingUp } from 'lucide-react';

export function LearningHistory() {
  const logs = useMainStore((s) => s.logs);

  const learningLogs = Object.values(logs)
    .filter((l) => l.learning.completed && l.learning.sessions.length > 0)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10);

  const totalMinutes = Object.values(logs)
    .filter((l) => l.learning.completed)
    .reduce((sum, l) => sum + l.learning.totalMinutes, 0);

  const subjectHours: Record<string, number> = {};
  Object.values(logs).forEach((l) => {
    l.learning.sessions.forEach((s) => {
      subjectHours[s.subject] = (subjectHours[s.subject] || 0) + s.duration;
    });
  });

  return (
    <Card delay={0.3}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          学习统计
        </h3>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--accent)' }}>
          <TrendingUp size={12} />
          <span>累计 {Math.round(totalMinutes / 60 * 10) / 10}h</span>
        </div>
      </div>

      {Object.keys(subjectHours).length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.entries(subjectHours)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([subject, mins]) => (
              <div
                key={subject}
                className="p-2 rounded-lg text-xs"
                style={{ backgroundColor: 'var(--bg-card-hover)' }}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span>{SUBJECT_ICONS[subject] || '📝'}</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {SUBJECT_LABELS[subject] || subject}
                  </span>
                </div>
                <span style={{ color: 'var(--text-muted)' }}>
                  {Math.round(mins / 60 * 10) / 10}小时
                </span>
              </div>
            ))}
        </div>
      )}

      <h4 className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
        最近学习
      </h4>
      {learningLogs.length === 0 ? (
        <div className="text-center py-6">
          <BookOpen size={28} className="mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            还没有学习记录
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {learningLogs.map((log) => (
            <div key={log.date} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                  {log.date.slice(5)}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {log.learning.totalMinutes}分钟
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {log.learning.sessions.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs"
                    style={{ backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-secondary)' }}
                  >
                    <span>{SUBJECT_ICONS[s.subject]}</span>
                    {s.duration}min
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
