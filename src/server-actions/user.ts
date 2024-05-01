'use server';

import { and, eq } from 'drizzle-orm';

import { auth, signIn, signOut } from '@/auth';
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

export const getSignedUser = async () => await auth();

export const getUsername = async (userId: string) => {
	const result = await db
		.select({ username: users.username })
		.from(users)
		.where(and(eq(users.id, userId), eq(users.isDeleted, false)));

	return result.at(0)?.username;
};

export const getUser = async (userId: string) =>
	db.query.users.findFirst({
		where: and(eq(users.id, userId), eq(users.isDeleted, false))
	});

export const checkUserNotDeleted = async (userId: string) => {
	const user = await getUser(userId);

	if (!user) {
		throw new Error('User is deleted');
	}
};

export const checkUserIsSigned = async () => {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		throw new Error('Unexpected error, user is not signed in.');
	}

	return userId;
};

export const updateUser = async (updatedUser: UserFormSchema) => {
	const userId = await checkUserIsSigned();
	await checkUserNotDeleted(userId);

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
