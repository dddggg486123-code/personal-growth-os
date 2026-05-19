'use client';

import { SubjectFocus } from '@/components/learning/SubjectFocus';
import { PomodoroTimer } from '@/components/learning/PomodoroTimer';
import { SessionLogger } from '@/components/learning/SessionLogger';
import { LearningHistory } from '@/components/learning/LearningHistory';

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
      <SubjectFocus />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <PomodoroTimer />
        <SessionLogger />
      </div>
      <LearningHistory />
    </div>
  );
}
