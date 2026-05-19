'use client';

import { LevelDisplay } from '@/components/identity/LevelDisplay';
import { TitleBadge } from '@/components/identity/TitleBadge';

export default function IdentityPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
      <LevelDisplay />
      <TitleBadge />
    </div>
  );
}
