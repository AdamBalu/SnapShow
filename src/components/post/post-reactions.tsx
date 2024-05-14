import { ReactingPeople } from './reacting-people';

type PostReactionsProps = {
	postId: string;
	reactions: {
		id: string;
		userId: string;
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
			<ReactingPeople reactions={props.reactions} postId={props.postId} />
		</div>
	);
};
