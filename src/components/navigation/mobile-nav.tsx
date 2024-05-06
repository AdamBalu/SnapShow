import React from 'react';

import { MobileNavLink } from '@/components/navigation/mobile-nav-link';
import { NavigationItems } from '@/components/navigation/navigation-list';
import { getCountOfFriendRequests } from '@/server-actions/usersFriends';

export const MobileNav = async () => {
	const friendRequestCount = await getCountOfFriendRequests();

	return (
		<nav className="container w-[60%]">
			<ul className="flex justify-between">
				{NavigationItems.map(item =>
					friendRequestCount > 0 && item.href === '/community' ? (
						<div key={item.href} className="indicator">
							<span className="indicator-item badge badge-outline bg-red-500 mt-3 indicator-end indicator-top sm:mr-2">
								{friendRequestCount}
							</span>
							<MobileNavLink key={item.label} {...item} />
						</div>
					) : (
						<MobileNavLink key={item.href} {...item} />
					)
				)}
			</ul>
		</nav>
	);
};
