'use server';

import { and, desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { events } from '@/db/schema/events';
import { eventsToGenres } from '@/db/schema/eventsToGenres';
import { genres } from '@/db/schema/genres';
import { photos } from '@/db/schema/photos';
import { posts } from '@/db/schema/posts';
import { reactions } from '@/db/schema/reactions';
import { users } from '@/db/schema/users';
import { venues } from '@/db/schema/venues';
import { type PostData } from '@/types/post-data';

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

const getAllPostIdsByEventPaginated = async (
	page: number,
	pageSize: number,
	eventId: string
) => {
	const postIds = await db
		.select({ id: posts.id })
		.from(posts)
		.where(eq(posts.eventId, eventId))
		.orderBy(desc(posts.datetime))
		.limit(pageSize)
		.offset((page - 1) * pageSize);
	return postIds.map(post => post.id);
};

const getAllPostIdsByUserPaginated = async (
	page: number,
	pageSize: number,
	userId: string
) => {
	const postIds = await db
		.select({ id: posts.id })
		.from(posts)
		.where(eq(posts.userId, userId))
		.orderBy(desc(posts.datetime))
		.limit(pageSize)
		.offset((page - 1) * pageSize);
	return postIds.map(post => post.id);
};

export const getAllPostIdsPaginatedFiltered = async (
	page: number,
	pageSize: number,
	genreFilter: string
) => {
	const postIds = await db
		.select({ id: posts.id })
		.from(posts)
		.innerJoin(events, eq(events.id, posts.eventId)) // Join events table
		.innerJoin(eventsToGenres, eq(eventsToGenres.eventId, events.id)) // Join eventsToGenres table
		.innerJoin(genres, eq(genres.id, eventsToGenres.genreId)) // Join genres table
		.where(eq(genres.name, genreFilter))
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
		authorUsername: author?.username,
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

export const getPostsPaginated = async (
	page: number,
	pageSize: number,
	genreFilter: string | null
) => {
	if (genreFilter === null || genreFilter === undefined) {
		const postIds = await getAllPostIdsPaginated(page, pageSize);
		const posts = await Promise.all(
			postIds.map(postId => getPostDetails(postId))
		);

		return posts;
	} else {
		const postIds = await getAllPostIdsPaginatedFiltered(
			page,
			pageSize,
			genreFilter
		);
		if (postIds.length === 0) {
			return [];
		}
		const posts = await Promise.all(
			postIds.map(postId => getPostDetails(postId))
		);
		return posts.filter(post => post !== null);
	}
};

export const getPostsPaginatedFilterByEvent = async (
	page: number,
	pageSize: number,
	eventId: string
) => {
	const postIds = await getAllPostIdsByEventPaginated(page, pageSize, eventId);
	if (postIds.length === 0) {
		return [];
	}
	const posts = await Promise.all(
		postIds.map((postId: string) => getPostDetails(postId))
	);
	if (posts === null) {
		return [];
	}
	return posts.filter(post => post !== null);
};

export const getPostsPaginatedFilterByUser = async (
	page: number,
	pageSize: number,
	userId: string
) => {
	const postIds = await getAllPostIdsByUserPaginated(page, pageSize, userId);
	if (postIds.length === 0) {
		return [];
	}
	const posts = await Promise.all(
		postIds.map((postId: string) => getPostDetails(postId))
	);
	if (posts === null) {
		return [];
	}
	return posts.filter(post => post !== null);
};
