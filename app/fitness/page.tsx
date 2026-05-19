'use client';

import { BodyStatsCard } from '@/components/fitness/BodyStatsCard';
import { TrainingForm } from '@/components/fitness/TrainingForm';
import { TrainingHistory } from '@/components/fitness/TrainingHistory';
import { SafetyNotice } from '@/components/fitness/SafetyNotice';

export default function FitnessPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
      <BodyStatsCard />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <TrainingForm />
        </div>
        <div className="space-y-4 md:space-y-6">
          <SafetyNotice />
        </div>
      </div>
      <TrainingHistory />
    </div>
  );
}
