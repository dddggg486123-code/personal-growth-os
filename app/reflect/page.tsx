'use client';

import { DailyReflection } from '@/components/reflect/DailyReflection';
import { WeeklySummary } from '@/components/reflect/WeeklySummary';
import { ReflectionHistory } from '@/components/reflect/ReflectionHistory';

export default function ReflectPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
      <WeeklySummary />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <DailyReflection />
        <ReflectionHistory />
      </div>
    </div>
  );
}
