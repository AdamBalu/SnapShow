'use server';

import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { reactions } from '@/db/schema/reactions';
import { users } from '@/db/schema/users';

export const getReactingUsers = async (postId: string) =>
	db
		.select({
			id: users.id,
			username: users.username,
			image: users.image
		})
		.from(reactions)
		.innerJoin(users, eq(reactions.userId, users.id))
		.where(and(eq(reactions.postId, postId), eq(users.isDeleted, false)));
