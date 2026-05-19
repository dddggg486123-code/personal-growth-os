'use client';

import { Card } from '@/components/shared/Card';
import { ProgressRing } from '@/components/shared/ProgressRing';
import { Play, Pause, RotateCcw, Brain } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

type TimerState = 'idle' | 'running' | 'paused' | 'break';

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

export function PomodoroTimer() {
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSeconds = timerState === 'break' ? BREAK_MINUTES * 60 : WORK_MINUTES * 60;
  const percent = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          if (timerState === 'running') {
            setSessions((s) => s + 1);
            setTimerState('break');
            return BREAK_MINUTES * 60;
          } else {
            setTimerState('idle');
            return WORK_MINUTES * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer, timerState]);

  useEffect(() => {
    if (timerState === 'running' || timerState === 'break') {
      startTimer();
    }
    return clearTimer;
  }, [timerState, startTimer, clearTimer]);

  const handleStart = () => {
    if (timerState === 'idle') {
      setTimeLeft(WORK_MINUTES * 60);
      setTimerState('running');
    } else if (timerState === 'paused') {
      setTimerState('running');
    }
  };

  const handlePause = () => {
    clearTimer();
    setTimerState('paused');
  };

  const handleReset = () => {
    clearTimer();
    setTimerState('idle');
    setTimeLeft(WORK_MINUTES * 60);
  };

  const isRunning = timerState === 'running' || timerState === 'break';

  return (
    <Card delay={0.1}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        番茄钟
      </h3>

      <div className="flex flex-col items-center">
        <ProgressRing
          percent={percent}
          size={160}
          strokeWidth={8}
          color={timerState === 'break' ? 'var(--success)' : 'var(--accent)'}
        >
          <div className="text-center">
            <span className="text-3xl font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {timerState === 'break' ? '休息时间' : timerState === 'idle' ? '准备开始' : '专注中'}
            </p>
          </div>
        </ProgressRing>

        <div className="flex items-center gap-3 mt-6">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              <Play size={16} />
              开始专注
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{ backgroundColor: 'var(--warning)', color: '#fff' }}
            >
              <Pause size={16} />
              暂停
            </button>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
          <Brain size={12} style={{ color: 'var(--accent)' }} />
          <span>今日已完成 {sessions} 个番茄钟</span>
        </div>
      </div>
    </Card>
  );
}
