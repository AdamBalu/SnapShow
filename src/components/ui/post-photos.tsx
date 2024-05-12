import { retrievePostPhotos } from '@/server-actions/posts';

import { PhotoCarousel } from './photo-carousel';

type PhotoDisplayPtops = {
	postId: string;
};

export const PostPhotos = async ({ postId }: PhotoDisplayPtops) => {
	const postPhotos = await retrievePostPhotos(postId);

	return <PhotoCarousel postPhotos={postPhotos} />;
};
