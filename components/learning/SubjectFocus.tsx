'use client';

import { Card } from '@/components/shared/Card';
import { MAIN_QUESTS, SUBJECT_ICONS } from '@/lib/constants';
import { Target, ArrowRight } from 'lucide-react';

export function SubjectFocus() {
  return (
    <Card delay={0}>
      <div className="flex items-center gap-2 mb-4">
        <Target size={16} style={{ color: 'var(--accent)' }} />
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          当前主线
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {MAIN_QUESTS.slice(0, 4).map((quest) => (
          <div
            key={quest.id}
            className="p-3 rounded-xl border transition-all"
            style={{
              borderColor: quest.color + '40',
              backgroundColor: quest.color + '10',
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold" style={{ color: quest.color }}>
                {quest.title}
              </span>
              <span className="text-lg">{SUBJECT_ICONS[quest.id] || '📌'}</span>
            </div>
            <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
              {quest.description}
            </p>
            <div className="pt-2 border-t" style={{ borderColor: quest.color + '20' }}>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                <ArrowRight size={10} className="inline mr-1" />
                {quest.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
