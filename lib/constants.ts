import type { Achievement, UserProfile } from './types';

export const DEFAULT_PROFILE: UserProfile = {
  name: '成长者',
  age: 21,
  height: 170,
  weight: 77.5,
  bloodPressure: null,
  mainQuests: ['身体健康', '减脂&血压恢复', 'Python & AI学习'],
  level: 1,
  xp: 0,
  titles: ['新生'],
  joinedAt: new Date().toISOString(),
};

export const SUBJECT_LABELS: Record<string, string> = {
  python: 'Python',
  ai: 'AI',
  major: '专业课',
  psychology: '心理学',
  logic: '逻辑学',
  'game-design': '游戏设计',
  other: '其他',
};

export const SUBJECT_ICONS: Record<string, string> = {
  python: '🐍',
  ai: '🤖',
  major: '📚',
  psychology: '🧠',
  logic: '🔍',
  'game-design': '🎮',
  other: '📝',
};

export const TRAINING_LABELS: Record<string, string> = {
  chest: '胸部训练',
  back: '背部训练',
  shoulder: '肩部训练',
  leg: '腿部训练',
  cardio: '有氧运动',
  rest: '休息日',
};

export const MOOD_LABELS: Record<number, string> = {
  1: '很差',
  2: '较差',
  3: '一般',
  4: '不错',
  5: '很好',
};

export const MOOD_EMOJIS: Record<number, string> = {
  1: '😞',
  2: '😕',
  3: '😐',
  4: '😊',
  5: '😄',
};

export const ENERGY_LABELS: Record<number, string> = {
  1: '疲惫',
  2: '偏低',
  3: '正常',
  4: '充沛',
  5: '巅峰',
};

export const ENERGY_EMOJIS: Record<number, string> = {
  1: '🔋',
  2: '🪫',
  3: '⚡',
  4: '🔥',
  5: '💪',
};

export const XP_VALUES = {
  FITNESS_COMPLETE: 50,
  FITNESS_LOW_CONFIG: 20,
  LEARNING_SESSION: 50,
  LEARNING_LOW_CONFIG: 15,
  REFLECTION_COMPLETE: 30,
  STREAK_3_BONUS: 0.2,
  STREAK_7_BONUS: 0.5,
};

export const TITLES: { xp: number; title: string }[] = [
  { xp: 0, title: '新生' },
  { xp: 500, title: '成长者' },
  { xp: 1500, title: '自律执行者' },
  { xp: 3000, title: '深度思考者' },
  { xp: 6000, title: 'AI时代创造者' },
  { xp: 12000, title: '系统构建者' },
  { xp: 25000, title: '终身成长者' },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_fitness', title: '第一次训练', description: '完成第一次健身训练', icon: '🏋️', unlockedAt: null },
  { id: 'first_learn', title: '第一次学习', description: '完成第一次学习记录', icon: '📖', unlockedAt: null },
  { id: 'first_reflect', title: '第一次复盘', description: '完成第一次每日复盘', icon: '📝', unlockedAt: null },
  { id: 'streak_3', title: '三日坚持', description: '连续3天完成任意打卡', icon: '🔥', unlockedAt: null },
  { id: 'streak_7', title: '一周坚持', description: '连续7天完成任意打卡', icon: '⭐', unlockedAt: null },
  { id: 'streak_30', title: '月度坚持者', description: '连续30天完成任意打卡', icon: '👑', unlockedAt: null },
  { id: 'fitness_10', title: '训练新手', description: '累计完成10次训练', icon: '💪', unlockedAt: null },
  { id: 'fitness_50', title: '训练达人', description: '累计完成50次训练', icon: '🏆', unlockedAt: null },
  { id: 'learn_10h', title: '学习10小时', description: '累计学习10小时', icon: '🎓', unlockedAt: null },
  { id: 'reflect_7', title: '复盘一周', description: '连续7天完成复盘', icon: '🧘', unlockedAt: null },
  { id: 'level_5', title: '成长者Lv.5', description: '达到5级', icon: '🌟', unlockedAt: null },
  { id: 'level_10', title: '进化者Lv.10', description: '达到10级', icon: '✨', unlockedAt: null },
];

export const RECOVERY_SUGGESTIONS = [
  '今天只需完成最低配置，就已经很棒了 ✨',
  '休息是成长的一部分，不必勉强自己',
  '低配完成也是完成，你已经在前进了',
  '状态是波动的，接受今天的自己',
  '喝杯水，散个步，就是今天最好的开始',
  '即使只学5分钟，也比停滞不前好',
];

export const PEAK_SUGGESTIONS = [
  '今天状态很好，可以稍微挑战一下自己',
  '精力充沛的时候，适合深度工作',
  '把握好状态，但也要记得休息',
  '状态好时建立的习惯，会在状态差时拯救你',
];

export const NORMAL_SUGGESTIONS = [
  '按计划稳步前进就好',
  '保持节奏，不需要每天都冲刺',
  '稳定的日常就是最好的成长',
];

export const MAIN_QUESTS = [
  {
    id: 'health',
    title: 'S级：身体健康',
    description: '减脂、降血压、增强体能',
    color: '#22c55e',
    tasks: ['每周训练4-5次', '控制饮食', '记录血压'],
    outcome: '血压稳定、体重下降、精力提升',
  },
  {
    id: 'python-ai',
    title: 'A级：Python & AI',
    description: '掌握编程能力，进入AI领域',
    color: '#6366f1',
    tasks: ['每天学习编程', '做小型项目', '上传GitHub'],
    outcome: '可接兼职项目、建立技术作品集',
  },
  {
    id: 'major',
    title: 'A级：专业课',
    description: '交通管理专业课程学习',
    color: '#f59e0b',
    tasks: ['完成课程作业', '复习考试内容'],
    outcome: '顺利毕业、专业能力积累',
  },
  {
    id: 'psychology',
    title: 'B级：心理学',
    description: '兴趣爱好，拓展认知',
    color: '#ec4899',
    tasks: ['阅读心理学书籍', '记录思考'],
    outcome: '理解自我与他人、提升认知深度',
  },
  {
    id: 'logic',
    title: 'B级：逻辑学',
    description: '提升思维能力',
    color: '#8b5cf6',
    tasks: ['学习逻辑学基础', '练习批判性思维'],
    outcome: '更强的分析与判断能力',
  },
  {
    id: 'game-design',
    title: 'B级：游戏设计',
    description: '兴趣探索',
    color: '#06b6d4',
    tasks: ['了解游戏设计原理', '分析游戏系统'],
    outcome: '将游戏化思维用于成长系统设计',
  },
];
