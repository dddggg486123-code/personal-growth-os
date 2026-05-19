'use client';

import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            backgroundColor: 'var(--accent)',
            color: '#fff',
          }}
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
