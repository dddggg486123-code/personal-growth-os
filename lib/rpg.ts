import { TITLES, XP_VALUES } from './constants';
import type { DailyLog, LogsMap, UserProfile } from './types';

export function calculateLevel(totalXp: number): number {
  return Math.floor(Math.sqrt(totalXp / 100)) + 1;
}

export function xpForLevel(level: number): number {
  return level * level * 100;
}

export function xpProgressInLevel(totalXp: number): { current: number; needed: number; percent: number } {
  const level = calculateLevel(totalXp);
  const currentLevelXp = xpForLevel(level - 1);
  const nextLevelXp = xpForLevel(level);
  const current = totalXp - currentLevelXp;
  const needed = nextLevelXp - currentLevelXp;
  const percent = Math.min(100, Math.round((current / needed) * 100));
  return { current, needed, percent };
}

export function getTitle(totalXp: number): string {
  let title = TITLES[0].title;
  for (const t of TITLES) {
    if (totalXp >= t.xp) {
      title = t.title;
    } else {
      break;
    }
  }
  return title;
}

export function getUnlockedTitles(totalXp: number): string[] {
  return TITLES.filter((t) => totalXp >= t.xp).map((t) => t.title);
}

export function calculateXpForAction(
  action: 'fitness' | 'fitness_low' | 'learning' | 'learning_low' | 'reflection',
  streakBonusMultiplier: number
): number {
  let base: number;
  switch (action) {
    case 'fitness':
      base = XP_VALUES.FITNESS_COMPLETE;
      break;
    case 'fitness_low':
      base = XP_VALUES.FITNESS_LOW_CONFIG;
      break;
    case 'learning':
      base = XP_VALUES.LEARNING_SESSION;
      break;
    case 'learning_low':
      base = XP_VALUES.LEARNING_LOW_CONFIG;
      break;
    case 'reflection':
      base = XP_VALUES.REFLECTION_COMPLETE;
      break;
  }
  return Math.round(base * streakBonusMultiplier);
}

export function getStreakBonus(days: number): number {
  if (days >= 7) return 1 + XP_VALUES.STREAK_7_BONUS;
  if (days >= 3) return 1 + XP_VALUES.STREAK_3_BONUS;
  return 1;
}
