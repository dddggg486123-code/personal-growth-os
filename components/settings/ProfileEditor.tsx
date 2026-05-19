'use client';

import { useMainStore } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { User, Target, Save } from 'lucide-react';
import { useState } from 'react';

export function ProfileEditor() {
  const profile = useMainStore((s) => s.userProfile);
  const updateProfile = useMainStore((s) => s.updateProfile);

  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [height, setHeight] = useState(profile.height);
  const [weight, setWeight] = useState(profile.weight);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ name, age, height, weight });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Card delay={0}>
      <div className="flex items-center gap-2 mb-4">
        <User size={16} style={{ color: 'var(--accent)' }} />
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>个人信息</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>名字</label>
          <input value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
            style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>年龄</label>
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
              style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>身高 (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
              style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>体重 (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} step="0.1"
              className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
              style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>

        <button onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{ backgroundColor: saved ? 'var(--success)' : 'var(--accent)', color: '#fff' }}>
          {saved ? '已保存 ✓' : <><Save size={14} /> 保存修改</>}
        </button>
      </div>
    </Card>
  );
}
