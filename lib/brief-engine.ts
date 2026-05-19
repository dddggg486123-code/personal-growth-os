import type { DailyBrief, BriefItem, RadarItem } from './types';

const BRIEF_POOL: DailyBrief[] = [
  {
    date: 'rotation',
    items: [
      {
        id: 'ai-1',
        category: 'ai',
        title: 'Claude 模型持续进化，推理能力大幅提升',
        summary: '最新版本在多模态推理、代码生成、长文本理解等任务上取得显著进步，AI 正在成为更强大的思维伙伴。',
        url: 'https://www.anthropic.com',
        tags: ['Claude', 'AI', '大模型'],
      },
      {
        id: 'ai-2',
        category: 'ai',
        title: 'AI 编程工具正改变软件开发流程',
        summary: '从代码补全到全功能生成，AI 编程助手正在降低编程门槛。Python + AI 是目前最具价值的技能组合之一。',
        tags: ['AI编程', 'Python', '开发工具'],
      },
      {
        id: 'tech-1',
        category: 'tech',
        title: 'Next.js 全栈开发持续主导 Web 生态',
        summary: 'React Server Components、App Router、Turbopack 等技术创新推动 Web 开发进入新阶段。',
        tags: ['Next.js', 'React', 'Web开发'],
      },
      {
        id: 'tech-2',
        category: 'tech',
        title: '开源社区活跃：推荐本周值得关注的 GitHub 项目',
        summary: '专注于 Python 数据科学、AI Agent 框架、个人知识管理工具的开源项目正在快速增长。',
        tags: ['GitHub', '开源', 'Python'],
      },
      {
        id: 'growth-1',
        category: 'growth',
        title: '深度工作：在碎片化时代重建专注力',
        summary: '研究表明，每天 2-3 小时的深度工作远胜于 8 小时的浅层忙碌。保护你的专注时间就是保护你的未来。',
        tags: ['深度工作', '专注力', '生产力'],
      },
      {
        id: 'growth-2',
        category: 'growth',
        title: '长期主义者的优势：复利思维如何改变人生',
        summary: '每天进步 1%，一年后你将成长 37 倍。真正的成长不是冲刺，而是可持续的积累。',
        tags: ['长期主义', '复利', '成长'],
      },
      {
        id: 'trend-1',
        category: 'trend',
        title: 'AI 正在重塑就业市场：未来 5 年最有价值的能力',
        summary: '批判性思维、AI 协作能力、跨学科整合能力正在成为核心竞争力。单一技能的时代正在结束。',
        tags: ['就业趋势', 'AI协作', '未来能力'],
      },
      {
        id: 'personalized-1',
        category: 'personalized',
        title: 'Python 学习者如何开始第一个 AI 项目',
        summary: '从简单的数据分析开始，逐步过渡到机器学习模型训练。建议从小项目入手，边做边学。',
        tags: ['Python', 'AI', '项目实战'],
      },
      {
        id: 'personalized-2',
        category: 'personalized',
        title: '血压管理科学：运动与饮食的最新研究',
        summary: '有氧运动 + 力量训练 + DASH 饮食被证明对血压管理最有效。每周 150 分钟中等强度运动是黄金标准。',
        tags: ['健康', '血压', '运动科学'],
      },
    ],
    dailyQuestion: '如果 AI 能完成你当前 50% 的工作，你会把省下的时间用来发展什么能力？',
    futureRadar: [
      {
        title: '开源多模态模型',
        description: '小型开源模型正在手机上运行，隐私保护的本地 AI 成为可能',
        category: 'model',
        impact: 'high',
      },
      {
        title: 'AI Agent 自动化',
        description: 'AI 代理能自主完成多步骤任务，从预订到研究均可自动化',
        category: 'tool',
        impact: 'high',
      },
      {
        title: '个性化学习 AI',
        description: '基于个人知识图谱的 AI 导师正成为最有效的学习方式',
        category: 'trend',
        impact: 'medium',
      },
    ],
  },
];

// Rotate briefs based on day of year
export function getDailyBrief(dateStr?: string): DailyBrief {
  const now = dateStr ? new Date(dateStr) : new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );

  const template = BRIEF_POOL[dayOfYear % BRIEF_POOL.length];
  return {
    ...template,
    date: dateStr || now.toISOString().slice(0, 10),
  };
}

export function filterBriefByInterest(
  brief: DailyBrief,
  interests: string[]
): DailyBrief {
  if (interests.length === 0) return brief;

  const interestLower = interests.map((i) => i.toLowerCase());
  const filteredItems = brief.items.filter((item) =>
    item.tags.some((tag) => interestLower.some((i) => tag.toLowerCase().includes(i)))
  );

  return {
    ...brief,
    items: filteredItems.length > 0 ? filteredItems : brief.items.slice(0, 4),
  };
}
