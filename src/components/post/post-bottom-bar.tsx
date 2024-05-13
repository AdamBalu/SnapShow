'use client';

import { LucideMessageCircle, LucideThumbsUp } from 'lucide-react';
import { getSession } from 'next-auth/react';

import { toggleReactionAction } from '@/server-actions/posts';

import { PostButton } from './post-button';

type PostBottomBarProps = {
	postId: string;
	isLiked: boolean;
	onChangeReaction: () => void;
	toggleComments: () => void;
};

const toggleLike = async (postId: string, userId: string) => {
	await toggleReactionAction(postId, userId);
};

export const PostBottomBar = (props: PostBottomBarProps) => (
	<div className="flex justify-evenly">
		<PostButton
			onClickAction={async () => {
				const session = await getSession();
				if (session?.user.id) {
					props.onChangeReaction();
					await toggleLike(props.postId, session?.user.id);
				}
			}}
			icon={<LucideThumbsUp fill={props.isLiked ? '#eee' : undefined} />}
			text="Like"
		/>
		<PostButton
			onClickAction={() => props.toggleComments()}
			icon={<LucideMessageCircle />}
			text="Comment"
		/>
	</div>
);
