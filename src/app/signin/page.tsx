'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CircleX } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { SignInButton } from '@/components/sign-in/sign-in-button';

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

const errorMessages: Record<string, string> = {
	OAuthSignin: 'Try signing in with a different account.',
	OAuthCallback: 'Try signing in with a different account.',
	OAuthCreateAccount: 'Try signing in with a different account.',
	Callback: 'Try signing in with a different account.',
	OAuthAccountNotLinked: 'Account with this email is already in use.',
	SessionRequired: 'Please sign in to access this page.',
	default: 'Unexpected error while signing in. Please try again later.'
};

const SignIn = () => {
	const searchParams = useSearchParams();
	const error = searchParams.get('error');
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/');
		}
	}, [status, router]);

	return (
		<div className="flex flex-col gap-10 mx-5 w-screen sm:w-auto">
			<div className="font-sarpanch font-extrabold bg-zinc-900 bg-opacity-70 rounded-2xl border-2 border-primary p-8 sm:p-16 text-white flex flex-col gap-10 items-center">
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
			{error && (
				<div role="alert" className="alert alert-error flex">
					<CircleX size={48} />
					<span>{errorMessages[error]}</span>
				</div>
			)}
		</div>
	);
};

export default SignIn;
