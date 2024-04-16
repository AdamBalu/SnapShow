import { NavLink } from '@/components/navigation/nav-link';

export const Navigation = () => (
	<nav className="bg-[#16181D]">
		<div className="container flex items-center h-32 justify-between">
			<h1 className="text-3xl text-white font-bold">SnapShow</h1>
			<ul className="flex gap-x-16 py-4">
				<NavLink redirectLink="/" label="Home" />
				<NavLink redirectLink="/events" label="Events" />
				<NavLink redirectLink="/community" label="Community" />
			</ul>
		</div>
	</nav>
);
