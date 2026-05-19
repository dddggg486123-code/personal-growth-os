'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';
import type { DailyLog, LogsMap, UserProfile, StreakData } from './types';
import { DEFAULT_PROFILE } from './constants';
import { calculateLevel, calculateXpForAction, getStreakBonus, getTitle, getUnlockedTitles } from './rpg';
import { detectState, getAdaptiveMessage } from './state-detector';

export function createEmptyLog(date: string): DailyLog {
  return {
    date,
    mood: 3,
    energy: 3,
    state: 'normal',
    fitness: {
      completed: false,
      type: null,
      duration: 0,
      intensity: 'medium',
      jumpRope: 0,
      notes: '',
    },
    bodyMetrics: {
      weight: null,
      bloodPressureSystolic: null,
      bloodPressureDiastolic: null,
    },
    diet: {
      protein: 0,
      carbs: 0,
      fat: 0,
      water: 0,
    },
    learning: {
      completed: false,
      sessions: [],
      totalMinutes: 0,
    },
    reflection: {
      completed: false,
      highlight: '',
      challenge: '',
      tomorrowFocus: '',
      gratitude: '',
      procrastinationAnalysis: '',
    },
  };
}

export function getTodayDate(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getTodayLog(logs: LogsMap): DailyLog {
  const today = getTodayDate();
  return logs[today] || createEmptyLog(today);
}

export function computeStreaks(logs: LogsMap): StreakData {
  const today = getTodayDate();

  let fitnessStreak = 0;
  let learningStreak = 0;
  let reflectionStreak = 0;
  let currentStreak = 0;
  let bestStreak = 0;

  const sortedDates = Object.keys(logs).sort();
  let tempStreak = 0;

  for (let i = sortedDates.length - 1; i >= 0; i--) {
    const date = sortedDates[i];
    const log = logs[date];
    const hasActivity =
      log.fitness.completed || log.learning.completed || log.reflection.completed;

    if (hasActivity) {
      tempStreak++;
      if (tempStreak > bestStreak) bestStreak = tempStreak;
    } else if (date !== today) {
      tempStreak = 0;
    }
  }

  currentStreak = tempStreak;

  const hasTodayLog = logs[today];
  if (hasTodayLog) {
    if (hasTodayLog.fitness.completed) {
      fitnessStreak = 1;
      for (let i = 1; i < 365; i++) {
        const d = format(new Date(new Date().getTime() - i * 86400000), 'yyyy-MM-dd');
        if (logs[d]?.fitness.completed) fitnessStreak++;
        else break;
      }
    }
    if (hasTodayLog.learning.completed) {
      learningStreak = 1;
      for (let i = 1; i < 365; i++) {
        const d = format(new Date(new Date().getTime() - i * 86400000), 'yyyy-MM-dd');
        if (logs[d]?.learning.completed) learningStreak++;
        else break;
      }
    }
    if (hasTodayLog.reflection.completed) {
      reflectionStreak = 1;
      for (let i = 1; i < 365; i++) {
        const d = format(new Date(new Date().getTime() - i * 86400000), 'yyyy-MM-dd');
        if (logs[d]?.reflection.completed) reflectionStreak++;
        else break;
      }
    }
  }

  return {
    fitness: fitnessStreak,
    learning: learningStreak,
    reflection: reflectionStreak,
    currentStreak,
    bestStreak,
  };
}

export function mergeLog(existing: DailyLog | undefined, today: string, partial: Partial<DailyLog>): DailyLog {
  const base = existing || createEmptyLog(today);
  return {
    ...base,
    ...partial,
    date: today,
    fitness: partial.fitness ? { ...base.fitness, ...partial.fitness } : base.fitness,
    bodyMetrics: partial.bodyMetrics ? { ...base.bodyMetrics, ...partial.bodyMetrics } : base.bodyMetrics,
    diet: partial.diet ? { ...base.diet, ...partial.diet } : base.diet,
    learning: partial.learning ? { ...base.learning, ...partial.learning } : base.learning,
    reflection: partial.reflection ? { ...base.reflection, ...partial.reflection } : base.reflection,
  };
}

interface MainStore {
  userProfile: UserProfile;
  logs: LogsMap;
  version: number;
  _hydrated: boolean;

  updateProfile: (partial: Partial<UserProfile>) => void;
  updateTodayLog: (partial: Partial<DailyLog>) => void;
  addXP: (amount: number) => { leveledUp: boolean; newLevel: number; newTitle: string | null };
  exportData: () => string;
}

export const useMainStore = create<MainStore>()(
  persist(
    (set, get) => ({
      userProfile: DEFAULT_PROFILE,
      logs: {},
      version: 1,
      _hydrated: false,

      updateProfile: (partial) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...partial },
        })),

      updateTodayLog: (partial) => {
        const today = getTodayDate();
        set((state) => {
          const existing = state.logs[today] || createEmptyLog(today);
          const merged = mergeLog(state.logs[today], today, partial);

          const recentLogs = Object.values(state.logs)
            .filter((l) => l.date !== today)
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(-3);
          const allRecent = [...recentLogs, merged].slice(-3);
          merged.state = detectState(allRecent);

          return { logs: { ...state.logs, [today]: merged } };
        });
      },

      addXP: (amount) => {
        let leveledUp = false;
        let newLevel = 0;
        let newTitle: string | null = null;
        set((state) => {
          const oldLevel = calculateLevel(state.userProfile.xp);
          const newXp = state.userProfile.xp + amount;
          newLevel = calculateLevel(newXp);
          leveledUp = newLevel > oldLevel;
          newTitle = leveledUp ? getTitle(newXp) : null;
          const titles = getUnlockedTitles(newXp);
          return {
            userProfile: {
              ...state.userProfile,
              xp: newXp,
              level: newLevel,
              titles,
            },
          };
        });
        return { leveledUp, newLevel, newTitle };
      },

      exportData: () => {
        return JSON.stringify(
          { userProfile: get().userProfile, logs: get().logs, version: get().version },
          null,
          2
        );
      },
    }),
    {
      name: 'personal-growth-os',
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state._hydrated = true;
          }
        };
      },
    }
  )
);

interface UIStore {
  sidebarOpen: boolean;
  darkMode: boolean;
  _hydrated: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      sidebarOpen: false,
      darkMode: true,
      _hydrated: false,
      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleDarkMode: () => set({ darkMode: !get().darkMode }),
      setDarkMode: (dark) => set({ darkMode: dark }),
    }),
    {
      name: 'personal-growth-os-ui',
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state._hydrated = true;
          }
        };
      },
    }
  )
);
