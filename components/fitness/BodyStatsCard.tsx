'use client';

import { useMainStore } from '@/lib/store';
import { Card } from '@/components/shared/Card';
import { Scale, Heart, TrendingDown, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function BodyStatsCard() {
  const logs = useMainStore((s) => s.logs);
  const profile = useMainStore((s) => s.userProfile);

  const recentLogs = Object.values(logs)
    .filter((l) => l.bodyMetrics.weight || l.bodyMetrics.bloodPressureSystolic)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14);

  const weightData = recentLogs
    .filter((l) => l.bodyMetrics.weight)
    .map((l) => ({ date: l.date.slice(5), weight: l.bodyMetrics.weight }));

  const bpData = recentLogs
    .filter((l) => l.bodyMetrics.bloodPressureSystolic && l.bodyMetrics.bloodPressureDiastolic)
    .map((l) => ({
      date: l.date.slice(5),
      systolic: l.bodyMetrics.bloodPressureSystolic,
      diastolic: l.bodyMetrics.bloodPressureDiastolic,
    }));

  const latestWeight = weightData.length > 0 ? weightData[weightData.length - 1].weight : profile.weight;
  const latestBP = bpData.length > 0 ? bpData[bpData.length - 1] : null;
  const hasBpWarning = latestBP && (latestBP.systolic as number) >= 140;

  return (
    <Card delay={0}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        身体数据
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-card-hover)' }}>
          <div className="flex items-center gap-2 mb-1">
            <Scale size={14} style={{ color: 'var(--accent)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>体重</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{latestWeight}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>kg</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs" style={{ color: 'var(--success)' }}>
            <TrendingDown size={12} />
            <span>目标: 65kg</span>
          </div>
        </div>

        <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-card-hover)' }}>
          <div className="flex items-center gap-2 mb-1">
            <Heart size={14} style={{ color: hasBpWarning ? 'var(--danger)' : 'var(--accent)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>血压</span>
          </div>
          {latestBP ? (
            <>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold" style={{ color: hasBpWarning ? 'var(--danger)' : 'var(--text-primary)' }}>
                  {latestBP.systolic}
                </span>
                <span className="text-lg" style={{ color: 'var(--text-muted)' }}>/{latestBP.diastolic}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs" style={{ color: hasBpWarning ? 'var(--danger)' : 'var(--success)' }}>
                {hasBpWarning ? (
                  <>⚠️ 偏高，注意休息</>
                ) : (
                  <>💚 数据正常</>
                )}
              </div>
            </>
          ) : (
            <div>
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>暂无记录</span>
              <p className="text-xs mt-1" style={{ color: 'var(--accent-soft)' }}>今天记录一下吧</p>
            </div>
          )}
        </div>
      </div>

      {weightData.length >= 2 && (
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="weight" stroke="var(--accent)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
