import type {ButtonHTMLAttributes} from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const variants = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white border-primary-400 dark:from-primary-700 dark:to-primary-500 dark:hover:from-primary-800 dark:hover:to-primary-600 dark:text-primary-50 dark:border-primary-600',
  secondary: 'bg-gradient-to-r from-zinc-100 to-zinc-200 hover:from-zinc-200 hover:to-zinc-300 text-zinc-800 border-zinc-300 dark:from-primary-900 dark:to-primary-800 dark:hover:from-primary-800 dark:hover:to-primary-700 dark:text-primary-100 dark:border-primary-700',
  accent: 'bg-gradient-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white border-primary-400 dark:from-primary-600 dark:to-primary-400 dark:hover:from-primary-700 dark:hover:to-primary-500 dark:text-primary-50 dark:border-primary-500',
  outline: 'bg-transparent border-primary-400 text-primary-700 hover:bg-primary-50 dark:border-primary-600 dark:text-primary-200 dark:hover:bg-primary-900/20'
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base'
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'font-semibold rounded-lg shadow transition-all duration-200 border disabled:opacity-60 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </div>
      ) : children}
    </button>
  );
}
