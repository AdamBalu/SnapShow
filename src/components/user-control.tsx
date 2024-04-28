import React from 'react';
import Image from 'next/image';

import { NavLink } from '@/components/navigation/nav-link';
import { auth } from '@/auth';
import { signOutAction } from '@/server-actions/user';

export const UserControl = async () => {
	const session = await auth();

	return (
		<div className="dropdown dropdown-end">
			<button tabIndex={0} className="btn btn-ghost btn-circle avatar">
				<div className="w-10 rounded-full">
					<Image
						width={64}
						height={64}
						alt="Tailwind CSS Navbar component"
						src={session?.user?.image ?? '/static/user_placeholder.svg'}
					/>
				</div>
			</button>
			<ul className="menu menu-sm dropdown-content bg-zinc-900 mt-3 z-[1] p-2 shadow rounded-box w-52">
				<form className="flex flex-col" action={signOutAction}>
					<button className="btn btn-ghost uppercase font-extrabold text-xl">
						Sign Out
					</button>
				</form>
				<NavLink href="/profile" label="Profile" />
			</ul>
		</div>
	);
};
