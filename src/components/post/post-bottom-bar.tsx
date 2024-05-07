'use client';

import { LucideMessageCircle, LucideThumbsUp } from 'lucide-react';
import { getSession } from 'next-auth/react';
import { useState } from 'react';

import { toggleReactionAction } from '@/server-actions/posts';

import { Loader } from '../loader';

import { PostButton } from './post-button';

type PostBottomBarProps = {
	postId: string;
	isLiked: boolean;
};

const toggleLike = async (postId: string, userId: string) => {
	await toggleReactionAction(postId, userId);
};

export const PostBottomBar = (props: PostBottomBarProps) => {
	const [loading, setLoading] = useState(false);
	return (
		// const currentSession = await getUser;
		// if (!currentSession?.user) {
		// 	return null; // TODO: handle in a nicer way
		// }

		<div className="flex justify-evenly">
			{loading ? (
				<Loader />
			) : (
				<PostButton
					onClickAction={async () => {
						setLoading(true);
						const session = await getSession();
						if (session?.user.id) {
							await toggleLike(props.postId, session?.user.id);
						}
						setLoading(false);
					}}
					icon={<LucideThumbsUp fill={props.isLiked ? '#eee' : undefined} />}
					text="Like"
				/>
			)}
			<PostButton
				onClickAction={() => null}
				icon={<LucideMessageCircle />}
				text="Comment"
			/>
		</div>
	);
};
