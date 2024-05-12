'use client';
import ImageGallery from 'react-image-gallery';
import Image from 'next/image';

import { type Photo } from '@/db/schema/photos';
import 'react-image-gallery/styles/css/image-gallery.css';

type PhotoCarouselProps = {
	postPhotos: Photo[];
};

export const PhotoCarousel = ({ postPhotos }: PhotoCarouselProps) => {
	const mappedPostImages = postPhotos.map(photo => ({
		original: photo.url,
		originalWidth: 50
	}));

	// ImageGallery types are imported, but cannot find them for some reason
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const renderSlide = (image: any) => (
		<div className="w-[120%] h-[12rem] sm:h-[20rem] md:h-[30rem] lg:h-[40rem]">
			<Image
				fill
				src={image.original}
				alt="e"
				style={{ objectFit: 'contain' }}
				className="rounded-t-lg"
				placeholder="blur"
				blurDataURL="/static/event-placeholder.png"
			/>
		</div>
	);

	return (
		<div className="w-full">
			<ImageGallery
				showFullscreenButton={false}
				items={mappedPostImages}
				autoPlay={false}
				showPlayButton={false}
				renderItem={renderSlide}
			/>
		</div>
	);
};
