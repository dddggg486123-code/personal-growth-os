'use client';

import { useMainStore } from '@/lib/store';
import { computeStreaks } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { TITLES, ACHIEVEMENTS } from '@/lib/constants';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export function TitleBadge() {
  const profile = useMainStore((s) => s.userProfile);
  const logs = useMainStore((s) => s.logs);
  const streaks = useMemo(() => computeStreaks(logs), [logs]);

  const achievementState = useMemo(() => {
    const allLogs = Object.values(logs);
    const totalFitness = allLogs.filter((l) => l.fitness.completed).length;
    const totalLearning = allLogs.reduce((sum, l) => sum + l.learning.totalMinutes, 0);
    const totalReflection = allLogs.filter((l) => l.reflection.completed).length;

    const checks: Record<string, boolean> = {
      first_fitness: totalFitness >= 1,
      first_learn: totalLearning > 0,
      first_reflect: totalReflection >= 1,
      streak_3: streaks.currentStreak >= 3,
      streak_7: streaks.currentStreak >= 7,
      streak_30: streaks.currentStreak >= 30,
      fitness_10: totalFitness >= 10,
      fitness_50: totalFitness >= 50,
      learn_10h: totalLearning >= 600,
      reflect_7: totalReflection >= 7,
      level_5: profile.level >= 5,
      level_10: profile.level >= 10,
    };
    return checks;
  }, [logs, streaks.currentStreak, profile.level]);

  return (
    <Card delay={0.1}>
      <div className="flex items-center gap-2 mb-4">
        <Shield size={16} style={{ color: 'var(--accent)' }} />
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>称号与成就</h3>
      </div>

      <div className="mb-4">
        <h4 className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>成长称号</h4>
        <div className="space-y-1">
          {TITLES.map((t, i) => {
            const unlocked = profile.xp >= t.xp;
            return (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                style={{
                  backgroundColor: unlocked ? 'var(--accent-glow)' : 'var(--bg-card-hover)',
                  color: unlocked ? 'var(--accent)' : 'var(--text-muted)',
                }}>
                {unlocked ? <CheckCircle2 size={14} /> : <Lock size={14} />}
                <span className="flex-1">{t.title}</span>
                {!unlocked && <span className="text-xs">{t.xp} XP</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>成就徽章</h4>
        <div className="grid grid-cols-2 gap-2">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = achievementState[a.id];
            return (
              <motion.div key={a.id}
                className="flex items-center gap-2 p-2 rounded-lg text-xs border"
                style={{
                  backgroundColor: unlocked ? 'var(--success-soft)' : 'var(--bg-card-hover)',
                  borderColor: unlocked ? 'var(--success)' : 'var(--border)',
                  color: unlocked ? 'var(--text-primary)' : 'var(--text-muted)',
                }}>
                <span className="text-lg">{unlocked ? a.icon : '🔒'}</span>
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p style={{ color: unlocked ? 'var(--text-secondary)' : 'var(--text-muted)' }}>{a.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
