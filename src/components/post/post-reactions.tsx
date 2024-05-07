'use server';

import { type Reaction } from '@/db/schema/reactions';

import { ReactingPeople } from './reacting-people';

type PostReactionsProps = {
	reactions: Reaction[];
};

export const PostReactions = async (props: PostReactionsProps) => {
	const likeCount = props.reactions.length;
	return (
		<div className="flex">
			<div className="mr-4">
				{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
			</div>
			<ReactingPeople reactions={props.reactions} />
		</div>
	);
};
