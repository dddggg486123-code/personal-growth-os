'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Newspaper, Dumbbell, BookOpen, Brain } from 'lucide-react';

const navItems = [
  { href: '/', label: '仪表盘', icon: LayoutDashboard },
  { href: '/brief', label: '晨报', icon: Newspaper },
  { href: '/fitness', label: '健身', icon: Dumbbell },
  { href: '/learn', label: '学习', icon: BookOpen },
  { href: '/brain', label: '大脑', icon: Brain },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors min-w-0"
              style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}>
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
