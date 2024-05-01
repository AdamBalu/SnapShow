import React from 'react';
import Image from 'next/image';

import { NavLink } from '@/components/navigation/nav-link';
import { auth } from '@/auth';
import { signOutAction } from '@/server-actions/user';

export const UserControl = async () => {
	const session = await auth();

	return (
		<details className="dropdown dropdown-end">
			<summary role="button" className="btn btn-ghost btn-circle avatar">
				<div className="w-10 rounded-full">
					<Image
						width={64}
						height={64}
						alt="Tailwind CSS Navbar component"
						src={session?.user?.image ?? '/static/user_placeholder.svg'}
					/>
				</div>
			</summary>
			<ul className="menu menu-sm dropdown-content bg-zinc-900 mt-3 z-[1] p-2 shadow rounded-box w-52">
				<form className="flex flex-col" action={signOutAction}>
					<button className="btn btn-ghost uppercase font-extrabold text-xl">
						Sign Out
					</button>
				</form>
				<NavLink
					href="/user/[userId]"
					as={`/user/${session?.user.id}`}
					label="Profile"
				/>
			</ul>
		</details>
	);
};
