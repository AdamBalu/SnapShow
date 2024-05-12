'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { PostImagesUpload } from '@/components/post/new-post-form/post-images-upload';
import { Button } from '@/components/ui/button';
import { FormSelect } from '@/components/ui/form/form-select';
import { FormTextArea } from '@/components/ui/form/form-textarea';
import InfoBox from '@/components/ui/info-box';
import Modal from '@/components/ui/modal';
import { Avatar } from '@/components/user/avatar';
import { cn } from '@/lib/cn';
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
				{!events || events.length === 0 ? (
					<div className="mt-8">
						<InfoBox>
							Please go to event page and select events you are going to attend
							to be able to add posts.
						</InfoBox>
					</div>
				) : (
					<FormProvider {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-2 items-center flex-grow"
						>
							<div className="flex w-full gap-5 items-center">
								<Avatar
									className="p-1 xl:p-1.5 size-16 xl:size-24 flex-shrink-0"
									profilePicture={profilePicture}
								/>
								<FormTextArea
									className="w-auto"
									label="Comment"
									name="comment"
								/>
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
								disabled={form.formState.isSubmitting || !events}
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
				)}
			</Modal>
		</>
	);
};
