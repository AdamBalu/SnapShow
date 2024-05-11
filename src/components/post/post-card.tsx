'use server';

import Image from 'next/image';

import { auth } from '@/auth';
import { type Reaction } from '@/db/schema/reactions';
import { type Photo } from '@/db/schema/photos';
import { type Post } from '@/db/schema/posts';

import { PostBottomBar } from './post-bottom-bar';
import { PostProfileBadge } from './post-profile-badge';
import { PostReactions } from './post-reactions';
import { PostText } from './post-text';

type PostProps = {
	post: Post;
	reactions: Reaction[];
	photos: Photo[];
};

export const PostCard = async ({ post, reactions, photos }: PostProps) => {
	const currentSession = await auth();
	const isLiked = !!reactions.find(
		reaction => reaction.userId === currentSession?.user.id
	);

	return (
		<div className="bg-zinc-900 rounded-lg mb-4 p-4 flex flex-col justify-center">
			<PostProfileBadge
				userId={post.userId}
				eventId={post.eventId}
				timestamp={post.timestamp}
			/>
			<div className=" pb-6">
				<PostText content={post.comment} />
			</div>
			<div className="flex justify-center">
				{photos.at(0)?.url && (
					<Image
						className="rounded-md py-4"
						src={photos[0].url}
						alt="post image content"
						width={400}
						height={250}
					/>
				)}
			</div>
			{reactions && <PostReactions reactions={reactions} />}
			<PostBottomBar postId={post.id} isLiked={isLiked} />
		</div>
	);
};
