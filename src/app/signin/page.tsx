import React from 'react';
import { redirect } from 'next/navigation';

import { SignInButton } from '@/components/sign-in/sign-in-button';
import { auth, SignInOptions } from '@/auth';

const SignIn = async () => {
	const session = await auth();

	if (session?.user) {
		redirect('/home');
	}

	return (
		<div className="mx-5 w-screen sm:w-auto font-sarpanch font-extrabold bg-zinc-900 bg-opacity-70 rounded-2xl border-2 border-primary p-8 sm:p-16 text-white flex flex-col gap-10 items-center">
			<h1 className="text-3xl">Sign In</h1>

			<ul className="flex flex-col gap-6 w-auto">
				{SignInOptions.map(option => (
					<SignInButton
						key={option.id}
						iconPath={option.icon}
						providerName={option.name}
						providerId={option.id}
					/>
				))}
			</ul>
		</div>
	);
};

export default SignIn;
