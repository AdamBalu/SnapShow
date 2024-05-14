import { ReactingPeople } from './reacting-people';

type PostReactionsProps = {
	reactions: {
		id: string;
		userId: string;
		postId: string;
		userPic: string | null | undefined;
	}[];
};

export const PostReactions = (props: PostReactionsProps) => {
	const likeCount = props.reactions.length;
	return (
		<div className="flex my-2">
			<div className="mr-4">
				{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
			</div>
			<ReactingPeople reactions={props.reactions} />
		</div>
	);
};
