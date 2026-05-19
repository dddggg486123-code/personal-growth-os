'use client';

import { useMainStore } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { MOOD_EMOJIS } from '@/lib/constants';
import { BookMarked, Lightbulb, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ReflectionHistory() {
  const logs = useMainStore((s) => s.logs);

  const reflectionLogs = Object.values(logs)
    .filter((l) => l.reflection.completed)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10);

  return (
    <Card delay={0.1}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        复盘历史
      </h3>

      {reflectionLogs.length === 0 ? (
        <div className="text-center py-8">
          <BookMarked size={32} className="mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            还没有复盘记录
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            每天花2分钟复盘，就是最好的成长
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {reflectionLogs.map((log, index) => (
            <motion.div
              key={log.date}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-3 rounded-xl"
              style={{ backgroundColor: 'var(--bg-card-hover)' }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{MOOD_EMOJIS[log.mood]}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {log.date.slice(5)}
                  </span>
                </div>
              </div>

              {log.reflection.highlight && (
                <div className="flex items-start gap-1.5 text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  <Lightbulb size={11} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <span>{log.reflection.highlight.slice(0, 80)}{log.reflection.highlight.length > 80 ? '...' : ''}</span>
                </div>
              )}

              {log.reflection.challenge && (
                <div className="flex items-start gap-1.5 text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  <AlertCircle size={11} className="mt-0.5 flex-shrink-0" />
                  <span>{log.reflection.challenge.slice(0, 80)}{log.reflection.challenge.length > 80 ? '...' : ''}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}
