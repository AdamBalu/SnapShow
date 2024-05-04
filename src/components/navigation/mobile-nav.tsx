import React from 'react';

import { MobileNavLink } from '@/components/navigation/mobile-nav-link';
import { NavigationItems } from '@/components/navigation/navigation-list';

export const MobileNav = () => (
	<div className="container w-[60%]">
		<ul className="flex justify-between">
			{NavigationItems.map(item => (
				<MobileNavLink key={item.label} {...item} />
			))}
		</ul>
	</div>
);
