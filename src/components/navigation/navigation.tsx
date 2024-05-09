import React from 'react';

import { NavLink } from '@/components/navigation/nav-link';
import { NavigationItems } from '@/components/navigation/navigation-list';
import { getCountOfFriendRequests } from '@/server-actions/usersFriends';
import { auth } from '@/auth';

export const Navigation = async () => {
	const session = await auth();

	const friendRequestCount =
		session !== null ? await getCountOfFriendRequests() : 0;

	return (
		<nav className="flex navbar-end gap-5 flex-1">
			<ul className="hidden lg:flex justify-end gap-x-16 py-4">
				{NavigationItems.map((item, index) => {
					if (index === NavigationItems.length - 1 && session === null) {
						return null;
					}

					return (
						<div key={item.href}>
							{friendRequestCount > 0 && item.href === '/community' ? (
								<div className="indicator">
									<span className="indicator-item badge badge-outline bg-red-500 mt-3 ml-2 indicator-end indicator-top sm:mr-2">
										{friendRequestCount}
									</span>
									<NavLink href={item.href} label={item.label} />
								</div>
							) : (
								<NavLink href={item.href} label={item.label} />
							)}
						</div>
					);
				})}
			</ul>
		</nav>
	);
};
