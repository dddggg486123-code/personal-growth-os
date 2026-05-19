'use client';

import { useMainStore, useUIStore } from '@/lib/store';
import { xpProgressInLevel } from '@/lib/rpg';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Dumbbell,
  BookOpen,
  BookMarked,
  Shield,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: '仪表盘', icon: LayoutDashboard },
  { href: '/fitness', label: '健身', icon: Dumbbell },
  { href: '/learn', label: '学习', icon: BookOpen },
  { href: '/reflect', label: '复盘', icon: BookMarked },
  { href: '/identity', label: '身份', icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);
  const darkMode = useUIStore((s) => s.darkMode);
  const toggleDarkMode = useUIStore((s) => s.toggleDarkMode);
  const profile = useMainStore((s) => s.userProfile);
  const xpInfo = xpProgressInLevel(profile.xp);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 flex flex-col
          border-r transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex items-center justify-between p-4 lg:p-6">
          <Link href="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <span className="text-xl">🌱</span>
            <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Growth OS
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-white/5"
          >
            <X size={20} style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: isActive ? 'var(--accent-glow)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-3" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
              {profile.level}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                {profile.titles[profile.titles.length - 1] || '新生'}
              </p>
              <div className="mt-1 h-1 rounded-full w-full" style={{ backgroundColor: 'var(--border)' }}>
                <motion.div
                  className="h-1 rounded-full"
                  style={{ backgroundColor: 'var(--accent)', width: `${xpInfo.percent}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${xpInfo.percent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {xpInfo.current} / {xpInfo.needed} XP
              </p>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span>{darkMode ? '浅色模式' : '深色模式'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
