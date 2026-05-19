'use client';

import { MOOD_EMOJIS, MOOD_LABELS, ENERGY_EMOJIS, ENERGY_LABELS } from '@/lib/constants';

interface MoodSelectorProps {
  value: number;
  onChange: (value: number) => void;
  type: 'mood' | 'energy';
}

const EMOJIS: Record<string, Record<number, string>> = {
  mood: MOOD_EMOJIS,
  energy: ENERGY_EMOJIS,
};

const LABELS: Record<string, Record<number, string>> = {
  mood: MOOD_LABELS,
  energy: ENERGY_LABELS,
};

export function MoodSelector({ value, onChange, type }: MoodSelectorProps) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((level) => {
        const isActive = value === level;
        return (
          <button
            key={level}
            onClick={() => onChange(level)}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all text-sm border"
            style={{
              backgroundColor: isActive ? 'var(--accent-glow)' : 'transparent',
              borderColor: isActive ? 'var(--accent)' : 'var(--border)',
              color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <span className="text-lg">{EMOJIS[type][level]}</span>
            <span className="text-xs">{LABELS[type][level]}</span>
          </button>
        );
      })}
    </div>
  );
}
