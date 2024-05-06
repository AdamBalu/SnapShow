import React from 'react';
import Image from 'next/image';

import { NavLink } from '@/components/navigation/nav-link';
import { auth } from '@/auth';
import { signOutAction } from '@/server-actions/user';

export const UserControl = async () => {
	const session = await auth();

	return (
		<div>
			<div className="dropdown dropdown-end">
				<div
					// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
					tabIndex={0}
					role="presentation"
					className="btn btn-ghost btn-circle avatar"
				>
					<div className="w-10 rounded-full">
						<Image
							width={64}
							height={64}
							alt="Tailwind CSS Navbar component"
							src={session?.user?.image ?? '/static/user_placeholder.svg'}
						/>
					</div>
				</div>

				<ul
					// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
					tabIndex={0}
					role="presentation"
					className="menu menu-sm dropdown-content bg-zinc-900 mt-3 z-[1] p-2 shadow rounded-box w-52"
				>
					<li>
						<form
							className="btn btn-ghost flex flex-col"
							action={signOutAction}
						>
							<button className="uppercase font-extrabold text-xl">
								Sign Out
							</button>
						</form>
					</li>
					<NavLink href={`/user/${session?.user.id}`} label="Profile" />
				</ul>
			</div>
		</div>
	);
};
