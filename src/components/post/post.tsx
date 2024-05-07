'use server';

import Image from 'next/image';

import { auth } from '@/auth';
import { type PostWithReactions } from '@/db/schema/posts';

import { PostBottomBar } from './post-bottom-bar';
import { PostProfileBadge } from './post-profile-badge';
import { PostReactions } from './post-reactions';
import { PostText } from './post-text';

type PostProps = {
	post?: PostWithReactions;
};

export const Post = async (props: PostProps) => {
	const currentSession = await auth();
	const isLiked = !!props.post?.reactions.find(
		reaction => reaction.userId === currentSession?.user.id
	);

	return (
		<div className="bg-zinc-900 rounded-lg mb-4 p-4 flex flex-col justify-center">
			<PostProfileBadge
				userId={props.post?.userId}
				eventId={props.post?.eventId}
				timestamp={props.post?.timestamp}
			/>
			<div className=" pb-6">
				<PostText content={props.post?.comment} />
			</div>
			<div className="flex justify-center">
				{props.post?.photo && (
					<Image
						className="rounded-md py-4"
						src={props.post.photo}
						alt="post image content"
						width={400}
						height={250}
					/>
				)}
			</div>
			{props.post?.id && <PostReactions reactions={props.post?.reactions} />}
			<PostBottomBar postId={props.post!.id} isLiked={isLiked} />
		</div>
	);
};
