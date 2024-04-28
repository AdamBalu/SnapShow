'use server';

import { signIn, signOut } from '@/auth';

export const signInAction = async (providerId: string) => {
	await signIn(providerId, { redirectTo: '/home' });
};

export const signOutAction = async () => {
	await signOut({ redirectTo: '/' });
};
