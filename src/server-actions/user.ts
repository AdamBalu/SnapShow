'use server';

import { count, eq, or } from 'drizzle-orm';

import { auth, signIn, signOut } from '@/auth';
import { usersFriends } from '@/db/schema/usersFriends';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { type UserFormSchema } from '@/components/user-form/user-form';
import { usersToGenres } from '@/db/schema/usersToGenres';

export const signInAction = async (providerId: string) => {
	await signIn(providerId, { redirectTo: '/home' });
};

export const signOutAction = async () => {
	await signOut({ redirectTo: '/' });
};

export const getUsername = async (userId: string) => {
	const result = await db
		.select({ username: users.username })
		.from(users)
		.where(eq(users.id, userId));

	return result.at(0)?.username;
};

export const getUser = async (userId: string) =>
	db.select().from(users).where(eq(users.id, userId));

export const getCountOfUsersFriends = async (userId: string) => {
	const userCount = await db
		.select({ count: count() })
		.from(usersFriends)
		.where(
			or(eq(usersFriends.user1Id, userId), eq(usersFriends.user2Id, userId))
		);

	return userCount[0].count;
};

export const updateUser = async (updatedUser: UserFormSchema) => {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		throw new Error('Unexpected error, user is not signed in.');
	}

	await db.transaction(async tx => {
		// Update user details
		await tx
			.update(users)
			.set({
				username: updatedUser.username,
				bio: updatedUser.bio,
				image: updatedUser.userImage
			})
			.where(eq(users.id, userId));

		// Update favorite genres
		await tx
			.update(usersToGenres)
			.set({ isDeleted: true })
			.where(eq(usersToGenres.userId, userId));

		for (const genre of updatedUser.genres) {
			await tx
				.insert(usersToGenres)
				.values({ userId, genreId: genre.id })
				.onConflictDoUpdate({
					target: [usersToGenres.genreId, usersToGenres.userId],
					set: { isDeleted: false }
				});
		}
	});
};

export const getCurrentUser = async () => await auth();
