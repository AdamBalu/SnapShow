'use server';

import { count, eq } from 'drizzle-orm';

import { db } from '@/db';
import { comments, type Comment } from '@/db/schema/comments';
import { users } from '@/db/schema/users';

type _CommentType = Comment & {
	userImage: string | null | undefined;
};

const getCommentIdsPaginated = async (
	postId: string,
	page: number,
	pageSize: number
) => {
	const commentIds = await db
		.select({ id: comments.id })
		.from(comments)
		.where(eq(comments.postId, postId))
		.orderBy(comments.datetime)
		.limit(pageSize)
		.offset((page - 1) * pageSize);

	return commentIds.map(comment => comment.id);
};

const getCommentDetails = async (commentId: string) => {
	const commentDetails = await db.query.comments.findFirst({
		where: eq(comments.id, commentId)
	});

	if (commentDetails?.userId === null || commentDetails?.userId === undefined) {
		return;
	}

	const userDetails = await db.query.users.findFirst({
		where: eq(users.id, commentDetails!.userId!)
	});

	return {
		...commentDetails,
		userImage: userDetails?.image,
		userName: userDetails?.username
	};
};

export const getCommentsPaginated = async (
	postId: string,
	page: number,
	pageSize: number
) => {
	const commentIds: string[] = await getCommentIdsPaginated(
		postId,
		page,
		pageSize
	);

	const commentsWithDetails = await Promise.all(
		commentIds.map(async commentId => {
			const commentDetails = await getCommentDetails(commentId);
			return commentDetails;
		})
	);
	return commentsWithDetails;
};

export const getCommentsCount = async (postId: string) => {
	const query = db
		.select({
			count: count()
		})
		.from(comments)
		.where(eq(comments.postId, postId));

	return query;
};

export const sendComment = async (
	userId: string,
	postId: string,
	text: string
) => {
	await db.insert(comments).values({
		text,
		userId,
		postId
	});
};
