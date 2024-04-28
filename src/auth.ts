import NextAuth, { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Google from '@auth/core/providers/google';
import Facebook from '@auth/core/providers/facebook';

import { db } from './db';

const getIsProtectedPath = (path: string) =>
	path !== '/' && !path.startsWith('/static') && !path.startsWith('/signin');

export type SingInOption = {
	name: string;
	id: string;
	icon: string;
};

export const SignInOptions: SingInOption[] = [
	{ name: 'Github', id: 'github', icon: '/static/github.svg' },
	{ name: 'Google', id: 'google', icon: '/static/google.png' },
	{ name: 'Facebook', id: 'facebook', icon: '/static/facebook.svg' }
];

const providers = [GitHub, Google, Facebook];

export const authOptions = {
	providers,
	adapter: DrizzleAdapter(db),
	pages: {
		signIn: '/signin'
	},
	callbacks: {
		session: ({ session, user }) => {
			session.user.id = user.id;
			return session;
		},
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user;
			const isProtected = getIsProtectedPath(nextUrl.pathname);

			if (!isLoggedIn && isProtected) {
				const redirectUrl = new URL('/signin', nextUrl.origin);
				redirectUrl.searchParams.append('callbackUrl', nextUrl.href);

				return Response.redirect(redirectUrl);
			}

			return true;
		}
	}
} satisfies NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(authOptions);
