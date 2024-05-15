'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LucideSendHorizonal } from 'lucide-react';
import { type Session } from 'next-auth';
import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { LogoLoader } from '@/components/logo-loader';
import { FormInput } from '@/components/ui/form/form-input';
import { useCommentsListPaginated } from '@/hooks/comments-list';
import { sendComment } from '@/server-actions/comments';

const commentSchema = z.object({
	comment: z.string().trim().min(1).max(1024)
});

type CommentSchema = z.infer<typeof commentSchema>;

type CommentSectionProps = {
	postId: string;
	open: boolean;
	session: Session | null;
};

export const CommentSection = ({
	postId,
	open,
	session
}: CommentSectionProps) => {
	const form = useForm<CommentSchema>({
		resolver: zodResolver(commentSchema)
	});

	const { register, handleSubmit, reset } = form;

	const onSubmit = async (values: CommentSchema) => {
		if (session?.user === undefined) {
			return;
		}
		await sendComment(session.user.id, postId, values.comment);
		reset();
		refetch();
	};

	const { data, isPending, refetch } = useCommentsListPaginated(postId, 1, 10);
	return (
		open && (
			<div className="bg-zinc-900 rounded-lg p-2 h-full border-t-zinc-700 border-t-2">
				{isPending ? (
					<div className="w-full my-10 flex justify-center">
						<LogoLoader />
					</div>
				) : data && data.length > 0 ? (
					<div className="">
						{data.map(comment => (
							<div key={comment?.id} className="chat chat-start">
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
								<div className="chat-header">
									{comment?.userName}
									<time className="text-xs opacity-50 ml-2">
										{comment?.datetime}
									</time>
								</div>
								<div className="chat-bubble break-words mb-4 bg-slate-800">
									{comment?.text}
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="flex w-full justify-center">
						<span className="opacity-50 text-xs my-10">
							No comments under this post, yet :(
						</span>
					</div>
				)}

				<FormProvider {...form}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex mt-2">
							<FormInput
								placeholder="Enter your comment..."
								type="textarea"
								{...register('comment')}
								className="bg-zinc-800 w-full border border-primary rounded-lg px-2 py-1"
							/>
							<button type="submit">
								<LucideSendHorizonal className="w-8 h-8 p-2 rounded-lg text-primary border border-primary hover:bg-zinc-600 mx-2" />
							</button>
						</div>
					</form>
				</FormProvider>
			</div>
		)
	);
};
