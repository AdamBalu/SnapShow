import React from 'react';

import { Navigation } from '@/components/navigation/navigation';
import { UserControl } from '@/components/user-control';
import { Logo } from '@/components/header/logo';

export const Header = () => (
	<header className="font-sarpanch font-extrabold bg-zinc-900 border-b-2 border-primary text-white">
		<div className="navbar container flex items-center h-20 justify-between">
			<Logo />

			<div className="flex gap-x-16">
				<Navigation />
				<UserControl />
			</div>
		</div>
	</header>
);
