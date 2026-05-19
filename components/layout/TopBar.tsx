'use client';

import { useMainStore, useUIStore } from '@/lib/store';
import { computeStreaks } from '@/lib/store';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Menu, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

export function TopBar() {
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);
  const profile = useMainStore((s) => s.userProfile);
  const logs = useMainStore((s) => s.logs);
  const streaks = useMemo(() => computeStreaks(logs), [logs]);

  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好';

  return (
    <header
      className="sticky top-0 z-30 border-b px-4 md:px-6 py-3 flex items-center justify-between"
      style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-white/5">
          <Menu size={20} style={{ color: 'var(--text-secondary)' }} />
        </button>
        <div>
          <h2 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {greeting}，{profile.name}
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {format(today, 'yyyy年M月d日 EEEE', { locale: zhCN })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {streaks.currentStreak > 0 && (
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--accent)' }}>
            <TrendingUp size={14} />
            <span>连续 {streaks.currentStreak} 天</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>Lv.{profile.level}</span>
          <span>·</span>
          <span>{profile.xp} XP</span>
        </div>
      </div>
    </header>
  );
}
