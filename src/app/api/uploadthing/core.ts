import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from '@uploadthing/shared';

import { getSignedUser } from '@/server-actions/user';

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: '16MB' } })
		.middleware(async () => {
			// auth() must be wrapped with here with function with use server, db does not work otherwise
			const session = await getSignedUser();

			const userId = session?.user?.id;

			if (!userId) {
				throw new UploadThingError('Unauthorized');
			}

			return { userId: 1 };
		})
		.onUploadComplete(async ({ metadata }) => ({
			uploadedBy: metadata.userId
		}))
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
