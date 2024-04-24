import React from 'react';

import { MobileNavLink } from '@/components/navigation/mobile-nav-link';
import { NavigationItems } from '@/components/navigation/navigation-list';

export const MobileNav = () => (
	<div className="container flex items-center justify-center">
		<ul className="flex gap-10">
			{NavigationItems.map(item => (
				<MobileNavLink key={item.label} {...item} />
			))}
		</ul>
	</div>
);
