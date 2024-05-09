'use client';

import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { SignInButton } from '@/components/sign-in/sign-in-button';
import { SignInError } from '@/components/sign-in/sign-in-error';

type SingInOption = {
	name: string;
	id: string;
	icon: string;
};

const SignInOptions: SingInOption[] = [
	{ name: 'Github', id: 'github', icon: '/static/github.svg' },
	{ name: 'Google', id: 'google', icon: '/static/google.png' },
	{ name: 'Facebook', id: 'facebook', icon: '/static/facebook.svg' }
];

const SignIn = () => {
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/');
		}
	}, [status, router]);

	return (
		<div className="flex flex-col gap-10 mx-auto sm:w-auto">
			<div className="font-sarpanch max-w-96 font-extrabold bg-zinc-900 bg-opacity-70 rounded-2xl border-2 border-primary p-8 sm:p-16 text-white flex flex-col gap-10 items-center">
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
			<Suspense
				fallback={
					<div className="flex justify-center">
						<span className="loading loading-spinner loading-lg" />
					</div>
				}
			>
				<SignInError />
			</Suspense>
		</div>
	);
};

export default SignIn;
