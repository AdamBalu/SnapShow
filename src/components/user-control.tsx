import React from 'react';
import Image from 'next/image';

import { NavLink } from '@/components/navigation/nav-link';
import { auth } from '@/auth';
import { signOutAction } from '@/server-actions/user';
import { getCountOfFriendRequests } from '@/server-actions/usersFriends';

export const UserControl = async () => {
	const session = await auth();
	const friendRequests = await getCountOfFriendRequests();

	return (
		<div className="indicator">
			{friendRequests > 0 && (
				<span className="indicator-item badge badge-outline bg-red-500 mt-2 ml-2 indicator-top indicator-start sm:indicator-end sm:indicator-top sm:mr-2">
					{friendRequests}
				</span>
			)}
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
					<NavLink href="/friends" label="Friends">
						{friendRequests > 0 && (
							<span className="indicator-item badge badge-outline bg-red-500 indicator-right indicator-middle mr-6">
								{friendRequests}
							</span>
						)}
					</NavLink>
				</ul>
			</details>
		</div>
	);
};
