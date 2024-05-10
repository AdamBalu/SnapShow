'use server';

import { and, count, eq, ne, or } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { checkUserIsSigned, checkUserIsValid } from '@/server-actions/user';
import { db } from '@/db';
import { usersFriends } from '@/db/schema/usersFriends';
import { users } from '@/db/schema/users';

export const getFriendsStatus = async (user1Id: string, user2Id: string) =>
	db.query.usersFriends.findFirst({
		where: and(
			or(
				and(
					eq(usersFriends.user1Id, user1Id),
					eq(usersFriends.user2Id, user2Id)
				),
				and(
					eq(usersFriends.user2Id, user1Id),
					eq(usersFriends.user1Id, user2Id)
				)
			),
			eq(usersFriends.isDeleted, false)
		)
	});

export const getCountOfUsersFriends = async (userId: string) => {
	const userCount = await db
		.select({ count: count() })
		.from(usersFriends)
		.where(
			and(
				or(eq(usersFriends.user1Id, userId), eq(usersFriends.user2Id, userId)),
				eq(usersFriends.isPending, false),
				eq(usersFriends.isDeleted, false)
			)
		);

	return userCount[0].count;
};

export const sendFriendRequest = async (friendId: string) => {
	const userId = await checkUserIsSigned();
	await checkUserIsValid(userId);
	await checkUserIsValid(friendId);

	const user1Id = userId <= friendId ? userId : friendId;
	const user2Id = userId <= friendId ? friendId : userId;

	await db
		.insert(usersFriends)
		.values({
			user1Id,
			user2Id,
			isPending: true,
			initiatedBy: userId
		})
		.onConflictDoUpdate({
			target: [usersFriends.user1Id, usersFriends.user2Id],
			set: {
				isDeleted: false,
				isPending: true,
				initiatedBy: userId
			}
		});
};

export const removeFriend = async (friendId: string) => {
	const userId = await checkUserIsSigned();

	await db
		.update(usersFriends)
		.set({ isDeleted: true })
		.where(
			or(
				and(
					eq(usersFriends.user1Id, userId),
					eq(usersFriends.user2Id, friendId)
				),
				and(
					eq(usersFriends.user2Id, userId),
					eq(usersFriends.user1Id, friendId)
				)
			)
		);

	revalidatePath(`/user/${friendId}`);
	revalidatePath('/community');
};

export const getFriendRequests = async () => {
	const userId = await checkUserIsSigned();

	return db
		.select({
			id: users.id,
			username: users.username,
			image: users.image
		})
		.from(usersFriends)
		.innerJoin(
			users,
			and(
				or(
					eq(users.id, usersFriends.user1Id),
					eq(users.id, usersFriends.user2Id)
				)
			)
		)
		.where(
			and(
				or(eq(usersFriends.user1Id, userId), eq(usersFriends.user2Id, userId)),
				ne(usersFriends.initiatedBy, userId),
				ne(users.id, userId),
				eq(usersFriends.isPending, true),
				eq(usersFriends.isDeleted, false)
			)
		);
};

export const getCountOfFriendRequests = async () => {
	const userId = await checkUserIsSigned();

	const requestCount = await db
		.select({ count: count() })
		.from(usersFriends)
		.where(
			and(
				or(eq(usersFriends.user1Id, userId), eq(usersFriends.user2Id, userId)),
				ne(usersFriends.initiatedBy, userId),
				eq(usersFriends.isPending, true),
				eq(usersFriends.isDeleted, false)
			)
		);

	return requestCount[0].count;
};

export const acceptFriendRequest = async (friendId: string) => {
	const userId = await checkUserIsSigned();

	await db
		.update(usersFriends)
		.set({
			isPending: false
		})
		.where(
			and(
				eq(usersFriends.initiatedBy, friendId),
				or(eq(usersFriends.user1Id, userId), eq(usersFriends.user2Id, userId))
			)
		);

	revalidatePath('/community');
};
