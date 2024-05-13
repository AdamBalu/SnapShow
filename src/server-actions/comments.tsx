'use server';

import { count, eq } from 'drizzle-orm';

import { db } from '@/db';
import { comments } from '@/db/schema/comments';

export const getCommentsPaginated = async (
	postId: string,
	page: number,
	pageSize: number
) => {};

export const getCommentsCount = async (postId: string) => {
	const query = db
		.select({
			count: count()
		})
		.from(comments)
		.where(eq(comments.postId, postId));

	return query;
};
