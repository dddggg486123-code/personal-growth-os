export type MoodLevel = 1 | 2 | 3 | 4 | 5;
export type EnergyLevel = 1 | 2 | 3 | 4 | 5;
export type UserState = 'peak' | 'normal' | 'low' | 'recovery';

export type TrainingType = 'chest' | 'back' | 'shoulder' | 'leg' | 'cardio' | 'rest';
export type TrainingIntensity = 'low' | 'medium' | 'high';

export type SubjectType =
  | 'python'
  | 'ai'
  | 'major'
  | 'psychology'
  | 'logic'
  | 'game-design'
  | 'other';

export type SessionType = 'deep-work' | 'pomodoro' | 'casual';

export interface LearningSession {
  id: string;
  subject: SubjectType;
  duration: number;
  type: SessionType;
  notes: string;
  timestamp: string;
}

export interface FitnessEntry {
  completed: boolean;
  type: TrainingType | null;
  duration: number;
  intensity: TrainingIntensity;
  jumpRope: number;
  notes: string;
}

export interface BodyMetrics {
  weight: number | null;
  bloodPressureSystolic: number | null;
  bloodPressureDiastolic: number | null;
}

export interface DietEntry {
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}

export interface LearningEntry {
  completed: boolean;
  sessions: LearningSession[];
  totalMinutes: number;
}

export interface ReflectionEntry {
  completed: boolean;
  highlight: string;
  challenge: string;
  tomorrowFocus: string;
  gratitude: string;
  procrastinationAnalysis: string;
}

export interface DailyLog {
  date: string;
  mood: MoodLevel;
  energy: EnergyLevel;
  state: UserState;
  fitness: FitnessEntry;
  bodyMetrics: BodyMetrics;
  diet: DietEntry;
  learning: LearningEntry;
  reflection: ReflectionEntry;
}

export interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  bloodPressure: { systolic: number; diastolic: number } | null;
  mainQuests: string[];
  level: number;
  xp: number;
  titles: string[];
  joinedAt: string;
}

export interface StreakData {
  fitness: number;
  learning: number;
  reflection: number;
  currentStreak: number;
  bestStreak: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
}

export type LogsMap = Record<string, DailyLog>;
