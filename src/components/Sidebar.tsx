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
		<aside className="w-56 shrink-0 bg-white dark:bg-zinc-900 backdrop-blur-sm border-r border-zinc-200 dark:border-zinc-800 shadow-soft">
			<div className="flex flex-col h-full">
				<div className="p-2" />

				<nav className="flex-1 px-4">
					<ul className="space-y-2">
						{navItems.map(({ name, path, icon: Icon }) => (
							<li key={name}>
								<Link
									to={path}
									className={clsx(
										'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
										location.pathname.startsWith(path)
											? 'bg-primary-50 dark:bg-primary-800/60 text-primary-700 dark:text-primary-100 shadow-inner-soft'
											: 'text-zinc-600 dark:text-primary-200 hover:bg-zinc-100/80 dark:hover:bg-primary-900/40 hover:shadow-soft'
									)}
								>
									<Icon className={clsx(
										'w-5 h-5 transition-transform duration-200',
										location.pathname.startsWith(path) ? 'scale-110' : 'group-hover:scale-110',
										'text-primary-500 dark:text-primary-200'
									)} />
									<span className="text-lg font-bold text-inherit">{name}</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</aside>
	);
}
