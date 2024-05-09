import React from 'react';

import { MobileNavLink } from '@/components/navigation/mobile-nav-link';
import { NavigationItems } from '@/components/navigation/navigation-list';
import { getCountOfFriendRequests } from '@/server-actions/usersFriends';
import { auth } from '@/auth';

export const MobileNav = async () => {
	const session = await auth();

	const friendRequestCount =
		session !== null ? await getCountOfFriendRequests() : 0;

	return (
		<nav className="container w-[60%]">
			<ul className="flex justify-between">
				{NavigationItems.map((item, index) => {
					if (index === NavigationItems.length - 1 && session === null) {
						return null;
					}

					return (
						<div key={item.href} className="indicator">
							{friendRequestCount > 0 && item.href === '/community' ? (
								<>
									<span className="indicator-item badge badge-outline bg-red-500 mt-3 indicator-end indicator-top sm:mr-2">
										{friendRequestCount}
									</span>
									<MobileNavLink {...item} />
								</>
							) : (
								<MobileNavLink {...item} />
							)}
						</div>
					);
				})}
			</ul>
		</nav>
	);
};
