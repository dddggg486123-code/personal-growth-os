'use client';

import { GreetingCard } from '@/components/dashboard/GreetingCard';
import { QuickCheckIn } from '@/components/dashboard/QuickCheckIn';
import { TodayProgress } from '@/components/dashboard/TodayProgress';
import { StreakHeatmap } from '@/components/dashboard/StreakHeatmap';
import { XPBar } from '@/components/dashboard/XPBar';
import { GentleReminder } from '@/components/dashboard/GentleReminder';

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
      <GreetingCard />
      <QuickCheckIn />
      <XPBar />
      <TodayProgress />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <StreakHeatmap />
        <GentleReminder />
      </div>
    </div>
  );
}
