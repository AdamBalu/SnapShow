'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { FormTextArea } from '@/components/ui/form/form-textarea';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/user/avatar';
import { FormSelect } from '@/components/ui/form/form-select';
import { PostImagesUpload } from '@/components/post/new-post-form/post-images-upload';
import { createPost } from '@/server-actions/posts';

const newPostSchema = z.object({
	comment: z.string().max(1024),
	eventId: z.string(),
	images: z.array(z.string()).nonempty()
});

export type NewPostSchema = z.infer<typeof newPostSchema>;

type NewPostProps = {
	userId: string;
	profilePicture: string | null | undefined;
	events: {
		id: string;
		name: string;
	}[];
};

export const NewPost = ({ userId, profilePicture, events }: NewPostProps) => {
	const [modalOpen, setModalOpen] = useState(false);
	const form = useForm<NewPostSchema>({
		resolver: zodResolver(newPostSchema)
	});

	const onSubmit = async (values: NewPostSchema) => {
		await createPost(values.comment, values.eventId, userId, values.images)
			.then(_ => {
				form.reset();
				setModalOpen(false);
			})
			.catch(err => {
				toast.error(err.message);
			});
	};

	return (
		<>
			<Button onClick={() => setModalOpen(true)}>New post</Button>
			<Modal
				title="New post"
				modalId="new-post"
				open={modalOpen}
				className="max-w-4xl h-[85vh]"
				close={() => setModalOpen(false)}
			>
				<FormProvider {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2 w-full items-center "
					>
						<div className="flex w-full gap-5 items-center">
							<Avatar
								className="p-1 xl:p-1.5 size-16 xl:size-24 flex-shrink-0"
								profilePicture={profilePicture}
							/>
							<FormTextArea className="w-auto" label="Comment" name="comment" />
						</div>

						<FormSelect
							label="Event"
							name="eventId"
							options={events.map(event => ({
								label: event.name,
								value: event.id
							}))}
						/>

						<PostImagesUpload name="images" />

						<Button
							disabled={form.formState.isSubmitting}
							className={cn(
								'btn btn-primary flex justify-center mt-4 w-full md:w-64'
							)}
						>
							Snap it!
							{form.formState.isSubmitting && (
								<span className="loading loading-spinner" />
							)}
						</Button>
					</form>
				</FormProvider>
			</Modal>
		</>
	);
};
