import { HiOutlineViewGrid, HiOutlineClipboardList } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
	{
		name: 'Jobs',
		path: '/jobs',
		icon: HiOutlineViewGrid,
	},
	{
		name: 'Executions',
		path: '/executions',
		icon: HiOutlineClipboardList,
	},
];

export default function Sidebar() {
	const location = useLocation();

	return (
		<aside className="w-64 shrink-0 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border-r border-zinc-200 dark:border-zinc-700 shadow-soft">
			<div className="flex flex-col h-full">
				<div className="p-6">
					<div className="flex items-center gap-2">
						<span className="text-2xl font-extrabold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent animate-gradient-x">
							job
						</span>
						<span className="text-2xl font-extrabold bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent animate-gradient-x">
							Orchestrator
						</span>
					</div>
				</div>

				<nav className="flex-1 px-4">
					<ul className="space-y-2">
						{navItems.map(({ name, path, icon: Icon }) => (
							<li key={name}>
								<Link
									to={path}
									className={clsx(
										'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
										location.pathname.startsWith(path)
											? 'bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400 shadow-inner-soft'
											: 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/80 dark:hover:bg-zinc-700/50 hover:shadow-soft'
									)}
								>
									<Icon className={clsx(
										'w-5 h-5 transition-transform duration-200',
										location.pathname.startsWith(path) ? 'scale-110' : 'group-hover:scale-110'
									)} />
									{name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="p-4 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-700">
					&copy; {new Date().getFullYear()} jobOrchestrator
				</div>
			</div>
		</aside>
	);
}
