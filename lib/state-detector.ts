import type { DailyLog, UserState } from './types';

export function detectState(recentLogs: DailyLog[]): UserState {
  if (recentLogs.length === 0) return 'normal';

  const last3 = recentLogs.slice(-3);
  const lowDays = last3.filter((log) => log.mood <= 2 && log.energy <= 2);
  const peakDays = last3.filter((log) => log.mood >= 4 && log.energy >= 4);

  if (lowDays.length >= 2) return 'recovery';
  if (peakDays.length >= 2) return 'peak';
  if (lowDays.length === 1) return 'low';
  return 'normal';
}

export function getAdaptiveMessage(state: UserState): string {
  const messages = {
    peak: [
      '今天状态很好，可以稍微挑战一下自己！',
      '精力充沛的时候是深度工作的最佳时机',
      '把握好状态，但也要注意适当休息',
    ],
    normal: [
      '按计划稳步前进就好',
      '保持节奏，不需要每天都冲刺',
      '稳定的日常就是最好的成长',
    ],
    low: [
      '今天状态一般，降低一点期望也没关系',
      '低配完成就是胜利，你已经在前进了',
      '休息也是成长的一部分',
    ],
    recovery: [
      '今天只需做5分钟就已经很棒了',
      '给自己一点恢复的时间',
      '低配完成也算完成，你在变强的路上',
      '喝杯水，散个步，就是今天最好的开始',
      '即使只学5分钟，也比停滞不前好',
    ],
  };
  const pool = messages[state];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getSafeFitnessAdvice(
  hasHypertension: boolean,
  intensity: string
): string | null {
  if (!hasHypertension) return null;

  if (intensity === 'high') {
    return '⚠️ 高血压模式下，建议保持中等强度，避免剧烈运动时屏气';
  }
  return '💚 保持当前强度，运动过程中如有头晕请立即停止';
}
