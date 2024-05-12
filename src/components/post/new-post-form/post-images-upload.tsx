import React, { useState } from 'react';
import { toast } from 'sonner';
import { Controller, useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';
import Image from 'next/image';

import { UploadButton } from '@/components/uploadthing/upload-button';

type PostImagesUploadProps = {
	name: string;
};

export const PostImagesUpload = ({ name }: PostImagesUploadProps) => {
	const [images, setImages] = useState<string[]>([]);
	const { register, control, setValue } = useFormContext();

	const onImageDelete = async (imageToDelete: string) => {
		setImages([...images.filter(img => img !== imageToDelete)]);
		await fetch('api/uploadthing', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url: imageToDelete
			})
		});

		setValue(name, [...images.filter(img => img !== imageToDelete)]);
	};

	return (
		<div className="flex flex-col w-full h-full justify-between gap-4 flex-grow">
			<Controller
				{...register(name)}
				control={control}
				render={({ field: { name } }) => (
					<div className="mt-3 flex w-full justify-between items-center">
						<span className="label-text text-white font-sarpanch font-extrabold">
							Images
						</span>
						<UploadButton
							appearance={{
								button:
									'flex text-black justify-center rounded-2xl font-sarpanch border-0 btn btn-xs bg-primary py-0 h-3 px-4 text-xs sm:text-xs w-36 hover:bg-primary',
								allowedContent: 'hidden'
							}}
							endpoint="imageUploader"
							onClientUploadComplete={res => {
								if (res.at(0)?.url) {
									const newImage = res[0].url;
									setImages([...images, newImage]);
									setValue(name, [...images, newImage]);
									toast.success(`Image uploaded successfully!`);
								}
							}}
							onUploadError={(error: Error) => {
								toast.error(`Error: ${error.message}`);
							}}
						/>
					</div>
				)}
			/>
			<ul className="mt-2 flex flex-row h-80 overflow-scroll gap-6 flex-wrap justify-around md:justify-start p-5 rounded-lg">
				{images.map(image => (
					<li key={image} className="flex flex-col items-end">
						<button
							onClick={() => onImageDelete(image)}
							className="-mb-8 mr-2 z-50 btn btn-circle btn-xs"
						>
							<X className="size-4" />
						</button>
						<Image
							className=" w-full h-auto sm:h-32 sm:w-auto lg:h-40 rounded-lg"
							src={image}
							width="0"
							height="0"
							sizes="100vw"
							objectFit="contain"
							alt="uploaded image"
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
