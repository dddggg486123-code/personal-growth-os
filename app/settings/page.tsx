'use client';

import { ProfileEditor } from '@/components/settings/ProfileEditor';
import { DataManager } from '@/components/settings/DataManager';
import { Card } from '@/components/shared/Card';
import { useUIStore } from '@/lib/store';
import { Download, Moon, Sun, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') setInstalled(true);
    setDeferredPrompt(null);
  };

  if (installed) {
    return (
      <button disabled className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all border opacity-50"
        style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
        <Download size={14} />
        <span>已安装 ✓</span>
      </button>
    );
  }

  if (!deferredPrompt) return null;

  return (
    <button onClick={handleInstall}
      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all border"
      style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
      <Download size={14} />
      <span>安装到桌面</span>
    </button>
  );
}

export default function SettingsPage() {
  const darkMode = useUIStore((s) => s.darkMode);
  const toggleDarkMode = useUIStore((s) => s.toggleDarkMode);

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
      <ProfileEditor />

      <Card delay={0.1}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>外观</h3>
        <button onClick={toggleDarkMode}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all border"
          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
          <span>{darkMode ? '浅色模式' : '深色模式'}</span>
        </button>
      </Card>

      <Card delay={0.15}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>安装应用</h3>
        <PWAInstallButton />
      </Card>

      <DataManager />

      <Card delay={0.2}>
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            🌱 Personal Growth OS
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            V2 · 一点点变强 · 隐私优先 · 本地数据
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            帮助年轻人在 AI 时代建立长期稳定的人生运行系统
          </p>
        </div>
      </Card>
    </div>
  );
}
