import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { useTheme } from '../hooks/useTheme';

export default function Topbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 glass-panel border-b border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent animate-gradient-x">job</span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent animate-gradient-x">Orchestrator</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/80 dark:hover:bg-zinc-700/50 rounded-xl transition-all duration-200 hover:shadow-soft"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <HiOutlineSun className="w-5 h-5 transition-transform hover:rotate-12 duration-300" />
            ) : (
              <HiOutlineMoon className="w-5 h-5 transition-transform hover:-rotate-12 duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
