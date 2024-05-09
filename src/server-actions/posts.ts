'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { reactions } from '@/db/schema/reactions';

export const toggleReactionAction = async (postId: string, userId: string) => {
	// try to fetch the current reaction from user
	const userReaction = await db.query.reactions.findFirst({
		where: and(eq(reactions.postId, postId), eq(reactions.userId, userId))
	});
	if (userReaction) {
		// the reaction already exists -> remove it
		await db
			.delete(reactions)
			.where(and(eq(reactions.postId, postId), eq(reactions.userId, userId)));
	} else {
		// the reaction doesn't exist -> add it
		await db.insert(reactions).values({ userId, postId });
	}
	revalidatePath('/');
};
