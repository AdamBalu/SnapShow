'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { generateUploadButton } from '@uploadthing/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/form-input';
import { FormTextArea } from '@/components/ui/form/form-textarea';
import { MultiSelectInput } from '@/components/ui/form/multi-select';
import { type OurFileRouter } from '@/app/api/uploadthing/core';
import { ProfilePictureUpload } from '@/components/user-form/profile-picture-upload';
import { updateUser } from '@/server-actions/user';
import { type Genre } from '@/db/schema/genre';

export const UploadButton = generateUploadButton<OurFileRouter>();

const genreSchema = z.object({
	id: z.string(),
	name: z.string()
});

const userFormSchema = z.object({
	username: z.string().min(3).max(32),
	bio: z.string().max(1024).optional(),
	genres: z.array(genreSchema),
	userImage: z.string().optional()
});

export type UserFormSchema = z.infer<typeof userFormSchema>;

type UserFormProps = {
	heading: string;
	userImage: string | null | undefined;
	genres: Genre[];
	usersGenres: Genre[];
};

export const UserForm = ({
	heading,
	userImage,
	usersGenres,
	genres
}: UserFormProps) => {
	const form = useForm<UserFormSchema>({
		resolver: zodResolver(userFormSchema)
	});
	const router = useRouter();
	const session = useSession();

	const onSubmit = async (values: UserFormSchema) => {
		await updateUser(values)
			.then(_ => {
				router.push(`/user/${session.data?.user?.id}`);
			})
			.catch(err => {
				toast.error(err.message);
			});
	};

	return (
		<div className="bg-zinc-900 bg-opacity-70 rounded-2xl border-2 border-primary p-8 sm:p-8 text-white flex flex-col gap-5 items-center mx-2 xl:w-1/2">
			<h1 className="text-xl sm:text-2xl md:text-4xl text-white font-sarpanch font-extrabold">
				{heading}
			</h1>
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-2 w-full items-center"
				>
					<ProfilePictureUpload profilePicture={userImage} name="userImage" />
					<FormInput className="w-auto" label="Username" name="username" />
					<FormTextArea className="w-auto" label="Bio" name="bio" />
					<MultiSelectInput
						displayValue="name"
						label="Favourite genres"
						options={genres.map(genre => ({ id: genre.id, name: genre.name }))}
						selectedValues={usersGenres.map(genre => ({
							id: genre.id,
							name: genre.name
						}))}
						name="genres"
					/>
					<Button
						disabled={form.formState.isSubmitting}
						className={cn(
							'btn btn-primary flex justify-center mt-4 w-full md:w-64'
						)}
					>
						Submit
						{form.formState.isSubmitting && (
							<span className="loading loading-spinner" />
						)}
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};
