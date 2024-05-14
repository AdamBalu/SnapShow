'use client';

import Image from 'next/image';

import { LogoLoader } from '@/components/logo-loader';
import { comments } from '@/db/schema/comments';
import { useCommentsListPaginated } from '@/hooks/comments-list';

type CommentSectionProps = {
	postId: string;
	open: boolean;
};

export const CommentSection = ({ postId, open }: CommentSectionProps) => {
	// const comment = useCommentsList(postId);
	const { data, isPending, refetch } = useCommentsListPaginated(postId, 1, 10);
	return (
		open && (
			<div className="bg-zinc-900 rounded-lg p-2 h-full border-t-zinc-700 border-t-2">
				{/* {postId} */}
				{isPending ? (
					<div className="flex align-middle">
						<LogoLoader />
					</div>
				) : comments ? (
					<div className="chat chat-start">
						{data?.map(comment => (
							<>
								<div className="chat-image avatar">
									<div className="w-10 rounded-full">
										{comment?.userImage && (
											<Image
												alt="chat bubble"
												src={comment?.userImage}
												width={256}
												height={256}
											/>
										)}
									</div>
								</div>
								<div className="chat-header">{comment?.userName}</div>
								<time className="text-xs opacity-50 ml-2">
									{comment?.datetime}
								</time>
								<div
									key={comment?.id}
									className="chat-bubble mb-4 bg-slate-800"
								>
									{comment?.text}
								</div>
							</>
						))}
					</div>
				) : (
					<span>No comments under this post :&#40</span>
				)}
				<input />
			</div>
		)
	);
};
