'use client';

import { Card } from '@/components/shared/Card';
import { exportAllData, importAllData, clearAllData } from '@/lib/db';
import { Download, Upload, Trash2, Shield } from 'lucide-react';
import { useState, useRef } from 'react';

export function DataManager() {
  const [message, setMessage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    try {
      const json = await exportAllData();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `growth-os-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setMessage('数据已导出 ✓');
    } catch {
      setMessage('导出失败');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const ok = await importAllData(text);
      setMessage(ok ? '数据已导入 ✓ 页面即将刷新...' : '导入失败，请检查文件格式');
    } catch {
      setMessage('导入失败');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleClear = async () => {
    if (window.confirm('确定要清除所有数据吗？此操作不可撤销。建议先导出备份。')) {
      await clearAllData();
    }
  };

  return (
    <Card delay={0.1}>
      <div className="flex items-center gap-2 mb-4">
        <Shield size={16} style={{ color: 'var(--accent)' }} />
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>数据管理</h3>
      </div>

      <div className="space-y-2">
        <button onClick={handleExport}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all border"
          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
          <Download size={14} />
          <span>导出备份 (JSON)</span>
        </button>

        <button onClick={() => fileRef.current?.click()}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all border"
          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
          <Upload size={14} />
          <span>导入备份 (JSON)</span>
        </button>
        <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />

        <button onClick={handleClear}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all border"
          style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
          <Trash2 size={14} />
          <span>清除所有数据</span>
        </button>

        {message && (
          <p className="text-xs text-center py-2" style={{ color: 'var(--accent)' }}>{message}</p>
        )}
      </div>
    </Card>
  );
}
