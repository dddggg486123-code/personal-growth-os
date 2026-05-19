'use client';

import { Card } from '@/components/shared/Card';
import { Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface DailyQuestionProps {
  question: string;
}

export function DailyQuestion({ question }: DailyQuestionProps) {
  const [showThought, setShowThought] = useState(false);
  const [thoughts, setThoughts] = useState('');

  return (
    <Card delay={0.3}>
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} style={{ color: 'var(--warning)' }} />
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>今日思考</h3>
      </div>

      <p className="text-base font-medium leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>
        {question}
      </p>

      {!showThought ? (
        <button
          onClick={() => setShowThought(true)}
          className="w-full py-2.5 rounded-lg text-sm font-medium transition-all border"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
          写下我的思考
        </button>
      ) : (
        <div className="space-y-3">
          <textarea
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none resize-none"
            style={{
              backgroundColor: 'var(--bg-card-hover)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }}
            placeholder="我的思考..."
          />
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            这个回答不会被保存到云端，只属于你自己。
          </p>
        </div>
      )}
    </Card>
  );
}
