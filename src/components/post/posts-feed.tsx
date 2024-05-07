'use server';

import { db } from '@/db';

import { Post } from './post';

export const PostsFeed = async () => {
	const posts = await db.query.posts.findMany();
	return (
		<div className="flex flex-col w-10/12 justify-center">
			{posts.map(post => (
				<Post key={post.id} post={post} />
			))}
			{posts.map(post => (
				<Post key={post.id} post={post} />
			))}
			{posts.map(post => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};
