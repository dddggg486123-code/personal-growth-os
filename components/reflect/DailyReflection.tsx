'use client';

import { useMainStore, getTodayLog, computeStreaks } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { MoodSelector } from '@/components/shared/MoodSelector';
import { calculateXpForAction, getStreakBonus } from '@/lib/rpg';
import { BookMarked, Save, Sparkles } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { MoodLevel, EnergyLevel } from '@/lib/types';

export function DailyReflection() {
  const logs = useMainStore((s) => s.logs);
  const updateTodayLog = useMainStore((s) => s.updateTodayLog);
  const addXP = useMainStore((s) => s.addXP);

  const todayLog = useMemo(() => getTodayLog(logs), [logs]);
  const streaks = useMemo(() => computeStreaks(logs), [logs]);

  const [mood, setMood] = useState<MoodLevel>(todayLog.mood || 3);
  const [energy, setEnergy] = useState<EnergyLevel>(todayLog.energy || 3);
  const [highlight, setHighlight] = useState(todayLog.reflection.highlight || '');
  const [challenge, setChallenge] = useState(todayLog.reflection.challenge || '');
  const [tomorrowFocus, setTomorrowFocus] = useState(todayLog.reflection.tomorrowFocus || '');
  const [gratitude, setGratitude] = useState(todayLog.reflection.gratitude || '');
  const [procrastination, setProcrastination] = useState(todayLog.reflection.procrastinationAnalysis || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const completed = highlight.length > 0 || challenge.length > 0;
    updateTodayLog({
      mood,
      energy,
      reflection: { completed, highlight, challenge, tomorrowFocus, gratitude, procrastinationAnalysis: procrastination },
    });

    if (completed) {
      const multiplier = getStreakBonus(streaks.currentStreak);
      const xp = calculateXpForAction('reflection', multiplier);
      addXP(xp);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Card delay={0}>
      <div className="flex items-center gap-2 mb-4">
        <BookMarked size={16} style={{ color: 'var(--accent)' }} />
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>每日复盘</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>今日情绪</label>
            <MoodSelector value={mood} onChange={(v) => setMood(v as MoodLevel)} type="mood" />
          </div>
          <div>
            <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>今日精力</label>
            <MoodSelector value={energy} onChange={(v) => setEnergy(v as EnergyLevel)} type="energy" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium mb-1.5 flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
            <Sparkles size={12} style={{ color: 'var(--accent)' }} /> 今日收获
          </label>
          <textarea value={highlight} onChange={(e) => setHighlight(e.target.value)} rows={2}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none resize-none"
            style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="今天最大的收获是什么？学到了什么？" />
        </div>

        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>遇到的挑战</label>
          <textarea value={challenge} onChange={(e) => setChallenge(e.target.value)} rows={2}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none resize-none"
            style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="今天遇到了什么困难？" />
        </div>

        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>明天重点</label>
          <input value={tomorrowFocus} onChange={(e) => setTomorrowFocus(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
            style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="明天最重要的1-2件事" />
        </div>

        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>感恩记录</label>
          <input value={gratitude} onChange={(e) => setGratitude(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
            style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="今天想感谢什么？" />
        </div>

        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>拖延分析</label>
          <textarea value={procrastination} onChange={(e) => setProcrastination(e.target.value)} rows={2}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none resize-none"
            style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="今天有拖延吗？原因是什么？（不批判，只观察）" />
        </div>

        <button onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{ backgroundColor: saved ? 'var(--success)' : 'var(--accent)', color: '#fff' }}>
          {saved ? '已保存 ✓' : <><Save size={14} /> 保存复盘</>}
        </button>
      </div>
    </Card>
  );
}
