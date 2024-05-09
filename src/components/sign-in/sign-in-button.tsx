'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { signInAction } from '@/server-actions/user';

type SignInProviderProps = {
	iconPath: string;
	providerName: string;
	providerId: string;
};

export const SignInButton = ({
	iconPath,
	providerId,
	providerName
}: SignInProviderProps) => {
	const [loading, setLoading] = useState(false);

	const onSignIn = async () => {
		setLoading(true);

		await signInAction(providerId);
	};

	return (
		<li>
			<Button
				onClick={onSignIn}
				className="min-w-52 sm:min-w-64 justify-center px-4"
			>
				{!loading && (
					<Image src={iconPath} alt="provider icon" width="32" height="32" />
				)}
				{loading && <span className="loading loading-spinner w-8 h-8" />}

				<div className="ml-1 border-r-2 border-primary-shadow h-8 sm:h-10" />

				<span className="flex-grow">{providerName}</span>
			</Button>
		</li>
	);
};
