'use client';

import type { RadarItem } from '@/lib/types';
import { Card } from '@/components/shared/Card';
import { motion } from 'framer-motion';
import { Radio, TrendingUp } from 'lucide-react';

const IMPACT_COLORS: Record<string, string> = {
  high: 'var(--danger)',
  medium: 'var(--warning)',
  low: 'var(--success)',
};

interface TechRadarProps {
  items: RadarItem[];
}

export function TechRadar({ items }: TechRadarProps) {
  return (
    <Card delay={0.2}>
      <div className="flex items-center gap-2 mb-4">
        <Radio size={16} style={{ color: 'var(--accent)' }} />
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>未来雷达</h3>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3 p-3 rounded-xl"
            style={{ backgroundColor: 'var(--bg-card-hover)' }}
          >
            <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
              style={{ backgroundColor: IMPACT_COLORS[item.impact] || 'var(--text-muted)' }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                <span className="text-xs px-1.5 py-0.5 rounded-md"
                  style={{
                    backgroundColor: IMPACT_COLORS[item.impact] + '20',
                    color: IMPACT_COLORS[item.impact],
                  }}>
                  {item.impact === 'high' ? '高影响' : item.impact === 'medium' ? '中影响' : '低影响'}
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
