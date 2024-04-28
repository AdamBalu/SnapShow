import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Navigation } from '@/components/navigation/navigation';
import { UserControl } from '@/components/user-control';

export const Header = () => (
	<header className="font-sarpanch font-extrabold bg-zinc-900 border-b-2 border-primary text-white">
		<div className="navbar container flex items-center h-20 justify-between">
			<Link className="navbar-start flex gap-5 items-center" href="/">
				<Image
					className="hidden lg:block"
					src="/static/logo.png"
					alt="snapshow logo"
					width="64"
					height="64"
				/>
				<Image
					className="block lg:hidden"
					src="/static/logo.png"
					alt="snapshow logo"
					width="48"
					height="48"
				/>
				<h1 className="text-2xl lg:text-3xl">SnapShow</h1>
			</Link>

			<div className="flex gap-x-16">
				<Navigation />
				<UserControl />
			</div>
		</div>
	</header>
);
