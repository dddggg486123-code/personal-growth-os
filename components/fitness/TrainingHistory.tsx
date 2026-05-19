'use client';

import { useMainStore } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { TRAINING_LABELS } from '@/lib/constants';
import { Dumbbell, Clock, Flame } from 'lucide-react';

export function TrainingHistory() {
  const logs = useMainStore((s) => s.logs);

  const trainingLogs = Object.values(logs)
    .filter((l) => l.fitness.completed && l.fitness.type)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10);

  return (
    <Card delay={0.2}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        训练历史
      </h3>

      {trainingLogs.length === 0 ? (
        <div className="text-center py-8">
          <Dumbbell size={32} className="mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            还没有训练记录
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            开始你的第一次训练吧
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {trainingLogs.map((log) => (
            <div
              key={log.date}
              className="flex items-center gap-3 p-3 rounded-xl transition-all"
              style={{ backgroundColor: 'var(--bg-card-hover)' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{ backgroundColor: 'var(--accent-glow)' }}
              >
                {log.fitness.type === 'cardio' ? '🏃' : log.fitness.type === 'rest' ? '😴' : '💪'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {log.fitness.type ? TRAINING_LABELS[log.fitness.type] : '训练'}
                </p>
                <div className="flex items-center gap-3 text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1"><Clock size={10} /> {log.fitness.duration}分钟</span>
                  <span className="flex items-center gap-1"><Flame size={10} /> {log.fitness.intensity === 'high' ? '高强度' : log.fitness.intensity === 'medium' ? '中等' : '低强度'}</span>
                  {log.fitness.jumpRope > 0 && <span>跳绳 {log.fitness.jumpRope}</span>}
                </div>
              </div>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {log.date.slice(5)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
