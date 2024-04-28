'use client';

import React from 'react';
import { CircleX } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const errorMessages: Record<string, string> = {
	OAuthSignin: 'Try signing in with a different account.',
	OAuthCallback: 'Try signing in with a different account.',
	OAuthCreateAccount: 'Try signing in with a different account.',
	Callback: 'Try signing in with a different account.',
	OAuthAccountNotLinked: 'Account with this email is already in use.',
	SessionRequired: 'Please sign in to access this page.',
	default: 'Unexpected error while signing in. Please try again later.'
};

export const SignInError = () => {
	const searchParams = useSearchParams();
	const error = searchParams.get('error');

	return (
		<div>
			{error && (
				<div role="alert" className="alert alert-error flex">
					<CircleX size={48} />
					<span>{errorMessages[error]}</span>
				</div>
			)}
		</div>
	);
};
