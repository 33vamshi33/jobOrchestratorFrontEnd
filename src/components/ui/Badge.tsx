import type {ReactNode} from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  withDot?: boolean;
  className?: string;
}

const variants = {
  success: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-700/30 dark:text-green-300 dark:border-green-600',
  error: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-700/30 dark:text-red-300 dark:border-red-600',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-700/30 dark:text-yellow-300 dark:border-yellow-600',
  info: 'bg-accent-100 text-accent-700 border-accent-300 dark:bg-accent-700/30 dark:text-accent-200 dark:border-accent-500',
  default: 'bg-accent-400/20 text-accent-700 border-accent-200 dark:bg-accent-500/30 dark:text-accent-200 dark:border-accent-400'
};

export default function Badge({
  children,
  variant = 'default',
  withDot,
  className
}: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow border',
      variants[variant],
      className
    )}>
      {withDot && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
      {children}
    </span>
  );
}
