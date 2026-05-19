'use client';

import { useMainStore } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { xpProgressInLevel, xpForLevel } from '@/lib/rpg';
import { TITLES } from '@/lib/constants';
import { ProgressRing } from '@/components/shared/ProgressRing';
import { Trophy, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function LevelDisplay() {
  const profile = useMainStore((s) => s.userProfile);
  const xpInfo = xpProgressInLevel(profile.xp);
  const allLogs = useMainStore((s) => s.logs);
  const totalDays = Object.values(allLogs).filter(
    (l) => l.fitness.completed || l.learning.completed || l.reflection.completed
  ).length;

  const nextTitle = TITLES.find((t) => t.xp > profile.xp);
  const currentTitleIndex = TITLES.findLastIndex((t) => profile.xp >= t.xp);

  return (
    <Card delay={0}>
      <div className="flex flex-col items-center">
        <ProgressRing percent={xpInfo.percent} size={140} strokeWidth={8}>
          <div className="text-center">
            <span className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
              {profile.level}
            </span>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>等级</p>
          </div>
        </ProgressRing>

        <h2 className="text-lg font-bold mt-4" style={{ color: 'var(--text-primary)' }}>
          {profile.titles[profile.titles.length - 1] || '新生'}
        </h2>

        <div className="flex items-center gap-2 mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <Zap size={14} style={{ color: 'var(--accent)' }} />
          <span>{profile.xp} XP</span>
        </div>

        {nextTitle && (
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            距离「{nextTitle.title}」还需 {nextTitle.xp - profile.xp} XP
          </p>
        )}

        <div className="grid grid-cols-3 gap-4 mt-6 w-full">
          <div className="text-center">
            <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{totalDays}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>活跃天数</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{profile.level}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>当前等级</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{xpInfo.needed}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>升级需要</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
