'use client';

import { type Session } from 'next-auth';

type PostsFeedProps = {
	currentUser: Session | null;
};

export const PostsFeed = async () => (
	<div>yo</div>
	// <div className="flex flex-col w-10/12 justify-center">
	// 	{postsArray.map(post => (
	// 		<PostCard
	// 			key={post.id}
	// 			post={post}
	// 			reactions={post.reactions}
	// 			photos={post.photos}
	// 		/>
	// 	))}
	// </div>
);
