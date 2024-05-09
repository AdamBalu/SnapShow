'use server';

import { and, count, eq, like, ne, or } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { type SQLiteSelect } from 'drizzle-orm/sqlite-core';

import { auth, signIn, signOut } from '@/auth';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { type UserFormSchema } from '@/components/user-form/user-form';
import { usersToGenres } from '@/db/schema/usersToGenres';
import { usersFriends } from '@/db/schema/usersFriends';

export const signInAction = async (providerId: string) => {
	await signIn(providerId, { redirectTo: '/' });
};

export const signOutAction = async () => {
	await signOut({ redirectTo: '/' });
};

export const getSignedUser = async () => await auth();

export const isRegistrationFinished = async (userId: string) => {
	const result = await db
		.select({ registrationFinished: users.registrationFinished })
		.from(users)
		.where(and(eq(users.id, userId), eq(users.isDeleted, false)));

	return result.at(0)?.registrationFinished;
};

export const getUser = async (userId: string) =>
	db.query.users.findFirst({
		where: and(
			eq(users.id, userId),
			eq(users.isDeleted, false),
			eq(users.registrationFinished, true)
		)
	});

export const checkUserNotDeleted = async (userId: string) => {
	const user = await db
		.select({ isDeleted: users.isDeleted })
		.from(users)
		.where(eq(users.id, userId));

	if (!user.at(0) || user.at(0)?.isDeleted) {
		throw new Error('User is deleted');
	}
};

export const checkUserIsValid = async (userId: string) => {
	const user = await db
		.select({
			isDeleted: users.isDeleted,
			registrationFinished: users.registrationFinished
		})
		.from(users)
		.where(eq(users.id, userId));

	if (user.at(0)?.isDeleted ?? !user.at(0)?.registrationFinished ?? true) {
		throw new Error('User is deleted or did not finish his registration');
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
				image: updatedUser.userImage,
				registrationFinished: true
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

	revalidatePath(`/user/${userId}`);
};

const withFriends = <T extends SQLiteSelect>(
	qb: T,
	userId: string,
	method: 'all' | 'friends',
	nameFilter?: string
) =>
	qb
		.leftJoin(
			usersFriends,
			and(
				or(
					eq(users.id, usersFriends.user1Id),
					eq(users.id, usersFriends.user2Id)
				),
				or(eq(usersFriends.user1Id, userId), eq(usersFriends.user2Id, userId)),
				eq(usersFriends.isDeleted, false)
			)
		)
		.where(
			and(
				ne(users.id, userId),
				eq(users.isDeleted, false),
				nameFilter ? like(users.username, `%${nameFilter}%`) : undefined,
				method === 'friends'
					? and(
							eq(usersFriends.isPending, false),
							eq(usersFriends.isDeleted, false)
						)
					: undefined
			)
		);

const withPagination = <T extends SQLiteSelect>(
	qb: T,
	page: number = 1,
	pageSize: number = 10
) => qb.limit(pageSize).offset((page - 1) * pageSize);

export const getUsers = async (
	userId: string,
	page: number,
	pageSize: number,
	method: 'all' | 'friends',
	nameFilter?: string
) => {
	const query = db
		.selectDistinct({
			id: users.id,
			username: users.username,
			image: users.image,
			friendStatus: usersFriends
		})
		.from(users)
		.$dynamic();

	return withPagination(
		withFriends(query, userId, method, nameFilter),
		page,
		pageSize
	);
};

export const getUsersCount = async (
	userId: string,
	method: 'all' | 'friends',
	nameFilter?: string
) => {
	const query = db
		.selectDistinct({
			count: count()
		})
		.from(users)
		.$dynamic();

	const rowCount = await withFriends(query, userId, method, nameFilter);

	return rowCount.at(0)!.count;
};
