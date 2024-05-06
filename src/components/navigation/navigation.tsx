import React from 'react';

import { NavLink } from '@/components/navigation/nav-link';
import { NavigationItems } from '@/components/navigation/navigation-list';
import { getCountOfFriendRequests } from '@/server-actions/usersFriends';

export const Navigation = async () => {
	const friendRequestCount = await getCountOfFriendRequests();

	return (
		<nav className="flex navbar-end gap-5 flex-1">
			<ul className="hidden lg:flex justify-end gap-x-16 py-4">
				{NavigationItems.map(item =>
					friendRequestCount > 0 && item.href === '/community' ? (
						<div key={item.href} className="indicator">
							<span className="indicator-item badge badge-outline bg-red-500 mt-3 ml-2 indicator-end indicator-top sm:mr-2">
								{friendRequestCount}
							</span>
							<NavLink href={item.href} label={item.label} />
						</div>
					) : (
						<NavLink key={item.href} href={item.href} label={item.label} />
					)
				)}
			</ul>
		</nav>
	);
};
