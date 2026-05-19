'use client';

import { motion } from 'framer-motion';
import type { BriefItem } from '@/lib/types';
import { ExternalLink } from 'lucide-react';

const CATEGORY_LABELS: Record<string, string> = {
  ai: 'AI 动态',
  tech: '技术趋势',
  growth: '长期成长',
  trend: '行业趋势',
  personalized: '个性推荐',
};

const CATEGORY_COLORS: Record<string, string> = {
  ai: '#6366f1',
  tech: '#06b6d4',
  growth: '#22c55e',
  trend: '#f59e0b',
  personalized: '#ec4899',
};

interface ContentCardProps {
  item: BriefItem;
  index: number;
}

export function ContentCard({ item, index }: ContentCardProps) {
  const color = CATEGORY_COLORS[item.category] || 'var(--accent)';

  return (
    <motion.a
      href={item.url || '#'}
      target={item.url ? '_blank' : undefined}
      rel={item.url ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="block p-4 rounded-xl border transition-all"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: color + '20', color }}>
              {CATEGORY_LABELS[item.category] || item.category}
            </span>
          </div>
          <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            {item.title}
          </h4>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {item.summary}
          </p>
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.tags.map((tag) => (
                <span key={tag} className="text-xs px-1.5 py-0.5 rounded-md"
                  style={{ backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-muted)' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {item.url && (
          <ExternalLink size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        )}
      </div>
    </motion.a>
  );
}
