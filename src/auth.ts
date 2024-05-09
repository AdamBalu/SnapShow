import NextAuth, { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Google from '@auth/core/providers/google';
import Facebook from '@auth/core/providers/facebook';

import { isRegistrationFinished } from '@/server-actions/user';

import { db } from './db';

const getIsProtectedPath = (path: string) =>
	path !== '/' &&
	!path.startsWith('/static') &&
	!path.startsWith('/events') &&
	!path.startsWith('/signin') &&
	!path.startsWith('/api');

const providers = [GitHub, Google, Facebook];

export const authOptions = {
	providers,
	adapter: DrizzleAdapter(db),
	pages: {
		signIn: '/signin'
	},
	callbacks: {
		session: async ({ session, user }) => {
			session.user.id = user.id;
			session.user.isRegistrationFinished = await isRegistrationFinished(
				user.id
			);
			return session;
		},
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user;
			const isProtected = getIsProtectedPath(nextUrl.pathname);

			// New user must set its username
			if (
				isLoggedIn &&
				auth?.user?.isRegistrationFinished === false &&
				nextUrl.pathname !== '/registration'
			) {
				return Response.redirect(new URL('/registration', nextUrl.origin));
			}

			if (!isLoggedIn && isProtected) {
				const redirectUrl = new URL('/signin', nextUrl.origin);
				redirectUrl.searchParams.append('callbackUrl', nextUrl.href);

				return Response.redirect(redirectUrl);
			}

			return true;
		}
	},
	secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(authOptions);
