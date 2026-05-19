'use client';

import { useMainStore } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { xpProgressInLevel, xpForLevel } from '@/lib/rpg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Trophy, Zap } from 'lucide-react';

export function XPBar() {
  const profile = useMainStore((s) => s.userProfile);
  const xpInfo = xpProgressInLevel(profile.xp);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(profile.level);

  useEffect(() => {
    if (profile.level > prevLevel) {
      setShowLevelUp(true);
      const timer = setTimeout(() => setShowLevelUp(false), 2000);
      setPrevLevel(profile.level);
      return () => clearTimeout(timer);
    }
  }, [profile.level, prevLevel]);

  return (
    <Card delay={0.4} className="relative overflow-hidden">
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            <Trophy size={16} />
            <span>升级! Lv.{profile.level}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
          style={{ backgroundColor: 'var(--accent-glow)', color: 'var(--accent)' }}
        >
          {profile.level}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Zap size={14} style={{ color: 'var(--accent)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {profile.titles[profile.titles.length - 1] || '新生'}
              </span>
            </div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {xpInfo.current}/{xpInfo.needed} XP
            </span>
          </div>

          <div className="h-2 rounded-full w-full" style={{ backgroundColor: 'var(--border)' }}>
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
              initial={{ width: 0 }}
              animate={{ width: `${xpInfo.percent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>

          <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
            Lv.{profile.level + 1} 需要 {xpForLevel(profile.level)} XP
          </p>
        </div>
      </div>
    </Card>
  );
}
