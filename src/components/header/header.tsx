import React from 'react';
import Link from 'next/link';

import { Navigation } from '@/components/navigation/navigation';
import { UserControl } from '@/components/user-control';
import { Logo } from '@/components/header/logo';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';

export const Header = async () => {
	const session = await auth();

	return (
		<header className="font-sarpanch font-extrabold bg-zinc-900 border-b-2 border-primary text-white">
			<div className="navbar container flex items-center h-20 justify-between">
				<Logo />

				<div className="flex gap-x-12 pr-4">
					<Navigation />
					{session !== null ? (
						<UserControl />
					) : (
						<Link
							href="/signin"
							className="flex flex-col justify-center md:justify-start"
						>
							<Button className="justify-center text-xs px-2 sm:px-6 shadow-[3px_4px_0_0]">
								Sign In
							</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};
