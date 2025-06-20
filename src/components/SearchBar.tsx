import { useState, useEffect } from 'react';
import type {JobState} from '../types/job';
import { useTheme } from '../hooks/useTheme';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

interface SearchBarProps {
  users: string[];
  onSearch: (params: {
    text: string;
    status: JobState | '';
    date: string;
    user: string;
  }) => void;
}

const jobStates: { label: string; value: JobState | '' }[] = [
  { label: 'All Statuses', value: '' },
  { label: 'Waiting', value: 'WAITING' },
  { label: 'Running', value: 'RUNNING' },
  { label: 'Success', value: 'SUCCESS' },
  { label: 'Failed', value: 'FAILED' },
  { label: 'Cancelled', value: 'CANCELLED' },
  { label: 'Manual', value: 'MANUAL' },
];

export default function SearchBar({ users, onSearch }: Readonly<SearchBarProps>) {
  const { isDark, toggleTheme } = useTheme();
  const [text, setText] = useState('');
  const [status, setStatus] = useState<JobState | ''>('');
  const [date, setDate] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    onSearch({ text, status, date, user });
  }, [text, status, date, user, onSearch]);

  return (
    <div className={[
      'fixed top-0 left-0 w-full z-20 flex flex-row items-center h-[64px] m-0 rounded-none shadow-lg',
      isDark
        ? 'bg-black border-b-2 border-teal-600'
        : 'bg-zinc-100 border-b-2 border-primary-300',
    ].join(' ')}
    style={{ minHeight: 64 }}
    >
      <div className="flex flex-1 h-full items-center gap-3 px-2 w-full">
        <span className="hidden sm:flex text-2xl font-extrabold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent animate-gradient-x mr-6 whitespace-nowrap">
          JobOrchestrator
        </span>
        <input
          type="text"
          placeholder="Search jobs..."
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 min-w-0 h-12 px-5 text-lg font-medium rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition shadow-none
            bg-white text-zinc-800 border-primary-300 dark:bg-black dark:text-primary-100 dark:border-teal-600"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value as JobState | '')}
          className="h-12 px-2 text-base font-medium rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition shadow-none w-24
            bg-white text-zinc-800 border-primary-300 dark:bg-black dark:text-primary-100 dark:border-teal-600"
        >
          <option value="">Status</option>
          {jobStates.filter(s => s.value).map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <div className="relative w-24 rounded-2xl overflow-hidden bg-white dark:bg-black">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className={`h-12 px-2 text-sm font-medium rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition shadow-none w-full
              bg-white text-zinc-800 border-primary-300 dark:bg-black dark:text-primary-100 dark:border-teal-600 ${date ? 'text-xs' : ''}`}
            aria-label="Date"
          />
        </div>
        <select
          value={user}
          onChange={e => setUser(e.target.value)}
          className="h-12 px-2 text-base font-medium rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition shadow-none w-24
            bg-white text-zinc-800 border-primary-300 dark:bg-black dark:text-primary-100 dark:border-teal-600"
        >
          <option value="">User</option>
          {users.map(u => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>
      <button
        onClick={toggleTheme}
        className="ml-1 h-12 w-12 flex items-center justify-center rounded-full border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 relative overflow-hidden
          border-primary-300 bg-white hover:bg-primary-50 dark:border-black dark:bg-black dark:hover:bg-zinc-900"
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{ minWidth: 48 }}
      >
        {isDark ? (
          <HiOutlineSun className="w-7 h-7 text-primary-200 z-10" />
        ) : (
          <HiOutlineMoon className="w-7 h-7 text-primary-700 z-10" />
        )}
      </button>
    </div>
  );
}
