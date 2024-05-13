'use server';

import { and, desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { events } from '@/db/schema/events';
import { photos } from '@/db/schema/photos';
import { posts } from '@/db/schema/posts';
import { reactions } from '@/db/schema/reactions';
import { users } from '@/db/schema/users';
import { venues } from '@/db/schema/venues';

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

// Function to fetch all post IDs
export const getAllPostIds = async () => {
	const postIds = await db.select({ id: posts.id }).from(posts);
	return postIds.map(post => post.id);
};

export const getAllPostIdsPaginated = async (
	page: number,
	pageSize: number
) => {
	const postIds = await db
		.select({ id: posts.id })
		.from(posts)
		.orderBy(desc(posts.datetime))
		.limit(pageSize)
		.offset((page - 1) * pageSize);
	return postIds.map(post => post.id);
};

// Function to fetch post details along with reactions and photos
export const getPostDetails = async (postId: string) => {
	// Fetch post details
	const post = await db.query.posts.findFirst({
		where: eq(posts.id, postId)
	});
	if (!post) {
		return null;
	}
	const authorId = post?.userId;

	let author;
	if (authorId) {
		author = await db.query.users.findFirst({
			where: eq(users.id, post?.userId)
		});
	}

	const eventId = post?.eventId;

	let event;
	if (eventId) {
		event = await db.query.events.findFirst({
			where: eq(events.id, eventId)
		});
	}
	let venue;
	if (event?.venueId) {
		venue = await db.query.venues.findFirst({
			where: eq(venues.id, event.venueId)
		});
	}

	// Fetch reactions for the post
	const reacts = await db.query.reactions.findMany({
		where: eq(reactions.postId, postId)
	});

	// Fetch photos for the post
	const pics = await db.query.photos.findMany({
		where: eq(photos.postId, postId)
	});

	// Fetch user pictures asynchronously
	const userPicsPromises = reacts.map(async reac => {
		const user = await db.query.users.findFirst({
			where: eq(users.id, reac.userId)
		});
		return user?.image;
	});

	const userPics = await Promise.all(userPicsPromises);

	const postData: PostData = {
		id: post.id,
		authorName: author?.name,
		comment: post.comment,
		userId: post.userId,
		authorPic: author?.image,
		isDeleted: post.isDeleted,
		eventId: post.eventId,
		datetime: post.datetime,
		venueAddress: venue?.address,
		country: venue?.country,
		venueName: venue?.name,
		eventName: event?.name,
		reactions: reacts.map((reac, index) => ({
			id: reac.id,
			userId: reac.userId,
			postId: reac.postId,
			userPic: userPics[index]
		})),
		photos: pics.map(pic => ({
			id: pic.id,
			postId: pic.postId,
			url: pic.url
		}))
	};

	console.log(postData);
	return postData;
};

// Function to fetch details of all posts
export const getAllPosts = async () => {
	const postIds = await getAllPostIds();
	const posts = await Promise.all(
		postIds.map(postId => getPostDetails(postId))
	);
	return posts;
};

export const getPostsPaginated = async (page: number, pageSize: number) => {
	const postIds = await getAllPostIdsPaginated(page, pageSize);
	const posts = await Promise.all(
		postIds.map(postId => getPostDetails(postId))
	);
	return posts;
};
