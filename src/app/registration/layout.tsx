import React from 'react';

import { signOutAction } from '@/server-actions/user';
import { Logo } from '@/components/header/logo';

const SignInLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<>
		<header className="font-sarpanch font-extrabold bg-zinc-900 border-b-2 border-primary text-white">
			<div className="navbar container flex items-center h-20 justify-between">
				<Logo />
				<div className="flex gap-x-16">
					<form className="btn btn-ghost flex flex-col" action={signOutAction}>
						<button className="uppercase font-extrabold text-xl">
							Sign Out
						</button>
					</form>
				</div>
			</div>
		</header>
		<main className="container mt-10 w-full flex flex-col gap-10 justify-center items-center">
			{children}
		</main>
	</>
);
export default SignInLayout;
