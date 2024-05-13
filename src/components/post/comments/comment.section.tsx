'use client';

import { Loader } from '@/components/loader';
import { useCommentsList } from '@/hooks/comments-list';

type CommentSectionProps = {
	postId: string;
	open: boolean;
};

export const CommentSection = ({ postId, open }: CommentSectionProps) => {
	// const comment = useCommentsList(postId);
	const { data, isPending, refetch } = useCommentsList(postId);
	return (
		open && (
			<div className="bg-slate-400 h-24">
				Hello world
				{isPending ? <Loader /> : <p>{data?.map(count => count.count)}</p>}
			</div>
		)
	);
};
