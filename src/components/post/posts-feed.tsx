'use server';

import { desc } from 'drizzle-orm';

import { db } from '@/db';
import { posts } from '@/db/schema/posts';

import { PostCard } from './post-card';

export const PostsFeed = async () => {
	const postsArray = await db.query.posts.findMany({
		with: { reactions: true },
		orderBy: [desc(posts.datetime)]
	});

	return (
		<div className="flex flex-col w-10/12 justify-center">
			{postsArray.map(post => (
				<PostCard
					key={post.id}
					post={post}
					reactions={post.reactions}
					photos={post.photos}
				/>
			))}
		</div>
	);
};
