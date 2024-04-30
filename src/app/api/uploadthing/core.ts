'use server';

import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import { auth } from '@/auth';

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: '16MB' } })
		.middleware(async () => {
			const session = await auth();

			if (!session?.user) {
				throw new UploadThingError('Unauthorized');
			}

			return { userId: session?.user.id };
		})
		.onUploadComplete(async ({ metadata }) => ({
			uploadedBy: metadata.userId
		}))
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
