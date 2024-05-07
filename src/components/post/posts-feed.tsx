'use server';

import { desc } from 'drizzle-orm';

import { db } from '@/db';
import { posts } from '@/db/schema/posts';

import { Post } from './post';

export const PostsFeed = async () => {
	const postsArray = await db.query.posts.findMany({
		with: { reactions: true },
		orderBy: [desc(posts.timestamp)]
	});
	return (
		<div className="flex flex-col w-10/12 justify-center">
			{postsArray.map(post => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};
