import React from 'react';

import { NavLink } from '@/components/navigation/nav-link';

export const UserControl = () => (
	<div className="dropdown dropdown-end">
		<button tabIndex={0} className="btn btn-ghost btn-circle avatar">
			<div className="w-10 rounded-full">
				<img
					alt="Tailwind CSS Navbar component"
					src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
				/>
			</div>
		</button>
		<ul className="menu menu-sm dropdown-content bg-zinc-900 mt-3 z-[1] p-2 shadow rounded-box w-52">
			<button
				tabIndex={0}
				className="btn btn-ghost uppercase font-extrabold text-xl"
			>
				Log out
			</button>
			<NavLink href="/profile" label="Profile" />
		</ul>
	</div>
);
