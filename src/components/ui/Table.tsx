import { ReactNode } from 'react';
import clsx from 'clsx';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function Table<T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  emptyMessage = 'No data found'
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-2xl border-separate border-spacing-0 bg-white/90 dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-700">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={clsx(
                  'px-6 py-4 text-left text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider bg-gradient-to-r from-primary-50 to-accent-100 dark:from-zinc-800 dark:to-zinc-900',
                  index === 0 && 'rounded-tl-2xl',
                  index === columns.length - 1 && 'rounded-tr-2xl',
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center">
                <div className="flex items-center justify-center gap-2 text-primary-500">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading...
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-zinc-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-primary-50/60 dark:hover:bg-zinc-800 transition">
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={clsx(
                      'px-6 py-4 whitespace-nowrap',
                      column.className
                    )}
                  >
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : item[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
