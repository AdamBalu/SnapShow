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

	await db
		.insert(usersFriends)
		.values({ user1Id: userId, user2Id: friendId, isPending: true })
		.onConflictDoUpdate({
			target: [usersFriends.user1Id, usersFriends.user2Id],
			set: {
				isDeleted: false,
				isPending: true
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

	revalidatePath('/friends', 'page');
	revalidatePath('/user/[userId]', 'page');
};

export const getUsersFriends = async (userId: string, limit?: number) =>
	db
		.select({
			id: users.id,
			username: users.username,
			image: users.image
		})
		.from(usersFriends)
		.innerJoin(
			users,
			or(eq(users.id, usersFriends.user1Id), eq(users.id, usersFriends.user2Id))
		)
		.where(
			and(
				or(eq(usersFriends.user1Id, userId), eq(usersFriends.user2Id, userId)),
				ne(users.id, userId),
				eq(usersFriends.isPending, false),
				eq(usersFriends.isDeleted, false)
			)
		)
		.limit(limit ?? Number.MAX_SAFE_INTEGER);

export const getFriendRequests = async () => {
	const userId = await checkUserIsSigned();

	return db
		.select({
			id: users.id,
			username: users.username,
			image: users.image
		})
		.from(usersFriends)
		.innerJoin(users, eq(users.id, usersFriends.user1Id))
		.where(
			and(
				// user1Id is user who initiated the request -> filter only id2
				eq(usersFriends.user2Id, userId),
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
				// user1Id is user who initiated the request -> filter only id2
				eq(usersFriends.user2Id, userId),
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
			and(eq(usersFriends.user1Id, friendId), eq(usersFriends.user2Id, userId))
		);

	revalidatePath('/friends', 'page');
};
