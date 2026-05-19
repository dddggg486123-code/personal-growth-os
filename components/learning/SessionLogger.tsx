'use client';

import { useMainStore, getTodayLog, computeStreaks } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { SUBJECT_LABELS, SUBJECT_ICONS } from '@/lib/constants';
import { calculateXpForAction, getStreakBonus } from '@/lib/rpg';
import type { SubjectType, SessionType, LearningSession } from '@/lib/types';
import { Clock, BookOpen, Plus } from 'lucide-react';
import { useState, useMemo } from 'react';

const SUBJECTS: SubjectType[] = ['python', 'ai', 'major', 'psychology', 'logic', 'game-design', 'other'];
const SESSION_TYPES: SessionType[] = ['deep-work', 'pomodoro', 'casual'];

export function SessionLogger() {
  const logs = useMainStore((s) => s.logs);
  const updateTodayLog = useMainStore((s) => s.updateTodayLog);
  const addXP = useMainStore((s) => s.addXP);

  const todayLog = useMemo(() => getTodayLog(logs), [logs]);
  const streaks = useMemo(() => computeStreaks(logs), [logs]);

  const [subject, setSubject] = useState<SubjectType>('python');
  const [duration, setDuration] = useState(25);
  const [sessionType, setSessionType] = useState<SessionType>('pomodoro');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const newSession: LearningSession = {
      id: Date.now().toString(),
      subject,
      duration,
      type: sessionType,
      notes,
      timestamp: new Date().toISOString(),
    };

    const updatedSessions = [...todayLog.learning.sessions, newSession];
    const totalMinutes = updatedSessions.reduce((sum, s) => sum + s.duration, 0);

    updateTodayLog({
      learning: { completed: totalMinutes > 0, sessions: updatedSessions, totalMinutes },
    });

    if (totalMinutes > 0) {
      const multiplier = getStreakBonus(streaks.currentStreak);
      const xp = calculateXpForAction(duration >= 25 ? 'learning' : 'learning_low', multiplier);
      addXP(xp);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    setNotes('');
  };

  return (
    <Card delay={0.2}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>记录学习</h3>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>学习主题</label>
          <div className="grid grid-cols-4 gap-2">
            {SUBJECTS.map((s) => (
              <button key={s} onClick={() => setSubject(s)}
                className="py-2 px-2 rounded-lg text-xs font-medium transition-all border flex items-center gap-1 justify-center"
                style={{
                  backgroundColor: subject === s ? 'var(--accent-glow)' : 'transparent',
                  borderColor: subject === s ? 'var(--accent)' : 'var(--border)',
                  color: subject === s ? 'var(--accent)' : 'var(--text-secondary)',
                }}>
                <span>{SUBJECT_ICONS[s]}</span><span>{SUBJECT_LABELS[s]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium mb-2 flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
              <Clock size={12} /> 时长 (分钟)
            </label>
            <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min={1} max={480}
              className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
              style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="text-xs font-medium mb-2 flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
              <BookOpen size={12} /> 学习模式
            </label>
            <div className="flex gap-1">
              {SESSION_TYPES.map((t) => (
                <button key={t} onClick={() => setSessionType(t)}
                  className="flex-1 py-2 rounded-lg text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: sessionType === t ? 'var(--accent-glow)' : 'transparent',
                    borderColor: sessionType === t ? 'var(--accent)' : 'var(--border)',
                    color: sessionType === t ? 'var(--accent)' : 'var(--text-secondary)',
                  }}>
                  {t === 'deep-work' ? '深度' : t === 'pomodoro' ? '番茄' : '轻松'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>备注</label>
          <input value={notes} onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
            style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="学了什么内容？" />
        </div>

        <button onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{ backgroundColor: saved ? 'var(--success)' : 'var(--accent)', color: '#fff' }}>
          {saved ? '已保存 ✓' : <><Plus size={14} /> 添加记录</>}
        </button>

        {todayLog.learning.sessions.length > 0 && (
          <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              今日已记录 ({todayLog.learning.totalMinutes}分钟)
            </p>
            <div className="space-y-1">
              {todayLog.learning.sessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-xs py-1" style={{ color: 'var(--text-muted)' }}>
                  <div className="flex items-center gap-2">
                    <span>{SUBJECT_ICONS[s.subject]}</span>
                    <span>{SUBJECT_LABELS[s.subject]}</span>
                  </div>
                  <span>{s.duration}分钟</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
