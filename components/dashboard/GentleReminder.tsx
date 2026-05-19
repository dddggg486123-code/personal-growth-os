'use client';

import { useMainStore, getTodayLog } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { MAIN_QUESTS } from '@/lib/constants';
import { Heart, Target, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';

export function GentleReminder() {
  const logs = useMainStore((s) => s.logs);
  const todayLog = useMemo(() => getTodayLog(logs), [logs]);
  const isLowState = todayLog.state === 'low' || todayLog.state === 'recovery';

  const suggestions = isLowState
    ? ['今天只需完成最低配置就好', '5分钟学习也是成长', '散个步就是今天最好的训练']
    : ['今天可以朝着S级主线前进一步', '记录你的血压和体重数据', '哪怕是微量进步，长期来看也是巨大的'];

  return (
    <Card delay={0.5}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Heart size={16} style={{ color: 'var(--danger)' }} />
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>温柔提醒</h3>
        </div>

        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-sm py-1.5" style={{ color: 'var(--text-secondary)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-soft)' }} />
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Target size={14} style={{ color: 'var(--success)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--success)' }}>S级主线：身体健康 & 血压恢复</span>
          </div>
          {MAIN_QUESTS.slice(0, 2).map((quest) => (
            <div key={quest.id} className="flex items-center gap-2 text-xs py-1" style={{ color: 'var(--text-secondary)' }}>
              <ArrowRight size={12} />
              <span>{quest.tasks[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
