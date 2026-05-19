'use client';

import { getDailyBrief, filterBriefByInterest } from '@/lib/brief-engine';
import { useMainStore } from '@/lib/store';
import { ContentCard } from '@/components/brief/ContentCard';
import { TechRadar } from '@/components/brief/TechRadar';
import { DailyQuestion } from '@/components/brief/DailyQuestion';
import { Card } from '@/components/shared/Card';
import { Sparkles } from 'lucide-react';
import { useMemo } from 'react';

export default function BriefPage() {
  const profile = useMainStore((s) => s.userProfile);

  const brief = useMemo(() => {
    const raw = getDailyBrief();
    const interests = profile.mainQuests?.map((q: string) => q.toLowerCase()) || [];
    return filterBriefByInterest(raw, interests);
  }, [profile.mainQuests]);

  const aiItems = brief.items.filter((i) => i.category === 'ai');
  const techItems = brief.items.filter((i) => i.category === 'tech');
  const growthItems = brief.items.filter((i) => i.category === 'growth');
  const trendItems = brief.items.filter((i) => i.category === 'trend');
  const personalizedItems = brief.items.filter((i) => i.category === 'personalized');

  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
      <Card delay={0}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} style={{ color: 'var(--accent)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>今日AI时代简报</h2>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          每日精选 6 条高质量信息 · 无算法推荐 · 不无限刷新 · 保护你的注意力
        </p>
      </Card>

      {aiItems.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold mb-3 px-1" style={{ color: 'var(--accent)' }}>
            🤖 AI 领域最新动态
          </h3>
          <div className="space-y-2">
            {aiItems.map((item, i) => (
              <ContentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>
      )}

      {techItems.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold mb-3 px-1" style={{ color: '#06b6d4' }}>
            💻 技术与编程趋势
          </h3>
          <div className="space-y-2">
            {techItems.map((item, i) => (
              <ContentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>
      )}

      {growthItems.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold mb-3 px-1" style={{ color: '#22c55e' }}>
            🌱 长期成长内容
          </h3>
          <div className="space-y-2">
            {growthItems.map((item, i) => (
              <ContentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>
      )}

      {trendItems.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold mb-3 px-1" style={{ color: '#f59e0b' }}>
            📊 行业趋势
          </h3>
          <div className="space-y-2">
            {trendItems.map((item, i) => (
              <ContentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>
      )}

      {personalizedItems.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold mb-3 px-1" style={{ color: '#ec4899' }}>
            🎯 个性化推荐
          </h3>
          <div className="space-y-2">
            {personalizedItems.map((item, i) => (
              <ContentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>
      )}

      <TechRadar items={brief.futureRadar} />
      <DailyQuestion question={brief.dailyQuestion} />
    </div>
  );
}
