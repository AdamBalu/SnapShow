'use server';

import { and, count, eq, ne, or } from 'drizzle-orm';

import { checkUserNotDeleted } from '@/server-actions/user';
import { db } from '@/db';
import { usersFriends } from '@/db/schema/usersFriends';
import { users } from '@/db/schema/users';

export const getFriendsStatus = async (user1Id: string, user2Id: string) => {
	await checkUserNotDeleted(user1Id);
	await checkUserNotDeleted(user2Id);

	return db.query.usersFriends.findFirst({
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
};

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

export const sendFriendRequest = async (userId: string, friendId: string) => {
	await db
		.insert(usersFriends)
		.values({ user1Id: userId, user2Id: friendId, isPending: true })
		.onConflictDoUpdate({
			target: [usersFriends.user1Id, usersFriends.user2Id],
			set: { isDeleted: false, isPending: true }
		});
};

export const removeFriend = async (userId: string, friendId: string) => {
	await db
		.update(usersFriends)
		.set({ user1Id: userId, user2Id: friendId, isDeleted: true })
		.where(
			and(eq(usersFriends.user1Id, userId), eq(usersFriends.user2Id, friendId))
		);
};

export const getUsersFriends = async (userId: string, limit?: number) => {
	const result = db
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

	console.log(result);

	return result;
};
