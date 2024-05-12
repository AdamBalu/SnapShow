'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { reactions } from '@/db/schema/reactions';
import { posts } from '@/db/schema/posts';
import { photos } from '@/db/schema/photos';
import { photos } from '@/db/schema/photos';

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

export const createPost = async (
	comment: string,
	eventId: string,
	userId: string,
	images: string[]
) => {
	await db.transaction(async tx => {
		// Create new post
		const postId = (
			await tx
				.insert(posts)
				.values({ userId, eventId, comment })
				.returning({ id: posts.id })
				.all()
		).at(0)?.id;

		if (!postId) throw Error('Unexpected error while creating new post.');

		// Add all images associated to the post
		for (const image of images) {
			await tx.insert(photos).values({ postId, url: image });
		}
	});

	revalidatePath('/');
};

export const retrievePostPhotos = async (postId: string) =>
	db.select().from(photos).where(eq(photos.postId, postId));
