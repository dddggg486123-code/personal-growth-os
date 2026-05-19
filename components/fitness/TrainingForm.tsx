'use client';

import { useMainStore } from '@/lib/store';
import { getTodayLog, computeStreaks } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { TRAINING_LABELS } from '@/lib/constants';
import { calculateXpForAction, getStreakBonus } from '@/lib/rpg';
import type { TrainingType, TrainingIntensity } from '@/lib/types';
import { Clock, Zap, Save, Heart } from 'lucide-react';
import { useState, useMemo } from 'react';

const TRAINING_TYPES: TrainingType[] = ['chest', 'back', 'shoulder', 'leg', 'cardio', 'rest'];

export function TrainingForm() {
  const logs = useMainStore((s) => s.logs);
  const updateTodayLog = useMainStore((s) => s.updateTodayLog);
  const addXP = useMainStore((s) => s.addXP);

  const todayLog = useMemo(() => getTodayLog(logs), [logs]);
  const streaks = useMemo(() => computeStreaks(logs), [logs]);

  const [type, setType] = useState<TrainingType | null>(todayLog.fitness.type);
  const [duration, setDuration] = useState(todayLog.fitness.duration || 30);
  const [intensity, setIntensity] = useState<TrainingIntensity>(todayLog.fitness.intensity || 'medium');
  const [jumpRope, setJumpRope] = useState(todayLog.fitness.jumpRope || 0);
  const [notes, setNotes] = useState(todayLog.fitness.notes || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const completed = type !== null && duration > 0;
    updateTodayLog({ fitness: { completed, type, duration, intensity, jumpRope, notes } });

    if (completed) {
      const multiplier = getStreakBonus(streaks.currentStreak);
      const xp = calculateXpForAction(duration < 5 ? 'fitness_low' : 'fitness', multiplier);
      addXP(xp);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Card delay={0.1}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>训练记录</h3>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>训练部位</label>
          <div className="grid grid-cols-3 gap-2">
            {TRAINING_TYPES.map((t) => (
              <button key={t} onClick={() => setType(t)}
                className="py-2 px-3 rounded-lg text-xs font-medium transition-all border"
                style={{
                  backgroundColor: type === t ? 'var(--accent-glow)' : 'transparent',
                  borderColor: type === t ? 'var(--accent)' : 'var(--border)',
                  color: type === t ? 'var(--accent)' : 'var(--text-secondary)',
                }}>
                {TRAINING_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium mb-2 flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
              <Clock size={12} /> 时长 (分钟)
            </label>
            <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min={1} max={180}
              className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
              style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="text-xs font-medium mb-2 flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
              <Zap size={12} /> 强度
            </label>
            <div className="flex gap-1">
              {(['low', 'medium', 'high'] as TrainingIntensity[]).map((i) => (
                <button key={i} onClick={() => setIntensity(i)}
                  className="flex-1 py-2 rounded-lg text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: intensity === i ? 'var(--accent-glow)' : 'transparent',
                    borderColor: intensity === i ? 'var(--accent)' : 'var(--border)',
                    color: intensity === i ? 'var(--accent)' : 'var(--text-secondary)',
                  }}>
                  {i === 'low' ? '低' : i === 'medium' ? '中' : '高'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium mb-2 flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
            <Heart size={12} /> 跳绳 (个)
          </label>
          <input type="number" value={jumpRope} onChange={(e) => setJumpRope(Number(e.target.value))} min={0} max={5000}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
            style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>

        <div>
          <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>备注</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none resize-none"
            style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="今天的感觉如何？" />
        </div>

        <button onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{ backgroundColor: saved ? 'var(--success)' : 'var(--accent)', color: '#fff' }}>
          {saved ? '已保存 ✓' : <><Save size={14} /> 保存训练</>}
        </button>
      </div>
    </Card>
  );
}
