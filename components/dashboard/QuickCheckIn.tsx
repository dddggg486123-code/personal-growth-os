'use client';

import { useMainStore } from '@/lib/store';
import { getTodayLog, computeStreaks } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { calculateXpForAction, getStreakBonus } from '@/lib/rpg';
import { motion } from 'framer-motion';
import { Dumbbell, BookOpen, BookMarked, Check } from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import type { DailyLog } from '@/lib/types';

interface CheckInButton {
  id: string;
  label: string;
  icon: React.ElementType;
  action: 'fitness' | 'learning' | 'reflection';
  check: (log: DailyLog) => boolean;
}

const buttons: CheckInButton[] = [
  { id: 'fitness', label: '完成训练', icon: Dumbbell, action: 'fitness', check: (log) => log.fitness.completed },
  { id: 'learning', label: '完成学习', icon: BookOpen, action: 'learning', check: (log) => log.learning.completed },
  { id: 'reflection', label: '今日复盘', icon: BookMarked, action: 'reflection', check: (log) => log.reflection.completed },
];

export function QuickCheckIn() {
  const logs = useMainStore((s) => s.logs);
  const updateTodayLog = useMainStore((s) => s.updateTodayLog);
  const addXP = useMainStore((s) => s.addXP);
  const [animating, setAnimating] = useState<string | null>(null);

  const todayLog = useMemo(() => getTodayLog(logs), [logs]);
  const streaks = useMemo(() => computeStreaks(logs), [logs]);

  const handleCheckIn = useCallback(
    (btn: CheckInButton) => {
      if (btn.check(todayLog)) return;

      const multiplier = getStreakBonus(streaks.currentStreak);
      let xpAction: 'fitness' | 'learning' | 'reflection' = btn.action;

      if (btn.id === 'fitness') {
        updateTodayLog({ fitness: { ...todayLog.fitness, completed: true } });
      } else if (btn.id === 'learning') {
        updateTodayLog({ learning: { ...todayLog.learning, completed: true } });
      } else {
        updateTodayLog({
          reflection: { ...todayLog.reflection, completed: true },
          mood: todayLog.mood,
          energy: todayLog.energy,
        });
      }

      const xp = calculateXpForAction(xpAction, multiplier);
      addXP(xp);

      setAnimating(btn.id);
      setTimeout(() => setAnimating(null), 800);
    },
    [todayLog, updateTodayLog, addXP, streaks.currentStreak]
  );

  return (
    <Card delay={0.1}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>快速打卡</h3>
      <div className="grid grid-cols-3 gap-3">
        {buttons.map((btn) => {
          const completed = btn.check(todayLog);
          const isAnimating = animating === btn.id;
          return (
            <motion.button
              key={btn.id}
              onClick={() => !completed && handleCheckIn(btn)}
              whileTap={completed ? {} : { scale: 0.95 }}
              className="flex flex-col items-center gap-2 py-4 px-2 rounded-xl text-sm transition-all relative border"
              style={{
                backgroundColor: completed ? 'var(--success-soft)' : 'var(--bg-card-hover)',
                borderColor: completed ? 'var(--success)' : 'var(--border)',
                color: completed ? 'var(--success)' : 'var(--text-secondary)',
                cursor: completed ? 'default' : 'pointer',
              }}
            >
              {isAnimating && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  style={{ backgroundColor: 'var(--success-soft)' }}
                />
              )}
              {completed ? <Check size={22} /> : <btn.icon size={22} />}
              <span className="text-xs font-medium">{completed ? '已完成 ✓' : btn.label}</span>
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
}
