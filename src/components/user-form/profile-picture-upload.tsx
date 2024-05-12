import React, { useState } from 'react';
import { toast } from 'sonner';
import { Controller, useFormContext } from 'react-hook-form';

import { Avatar } from '@/components/user/avatar';
import { UploadButton } from '@/components/uploadthing/upload-button';

type ProfilePictureUploadProps = {
	profilePicture: string | undefined | null;
	name: string;
};

export const ProfilePictureUpload = ({
	profilePicture,
	name
}: ProfilePictureUploadProps) => {
	const [profilePic, setProfilePic] = useState(profilePicture);
	const { register, control, setValue } = useFormContext();

	return (
		<div className="flex flex-col items-center size-32 md:size-48">
			<Avatar
				className="size-32 p-1.5 md:p-2 md:size-48"
				profilePicture={profilePic}
			/>
			<Controller
				{...register(name)}
				control={control}
				render={({ field: { name } }) => (
					<UploadButton
						{...register(name)}
						appearance={{
							button:
								"bg-base-100 ml-20 -mt-8 lg:ml-32 lg:-mt-12 w-9 h-9 border border-primary rounded-full bg-center text-opacity-0 bg-no-repeat bg-[url('/static/camera.svg')]",
							allowedContent: 'hidden'
						}}
						endpoint="imageUploader"
						onClientUploadComplete={res => {
							if (res.at(0)?.url) {
								const picture = res.at(0)?.url;
								setProfilePic(picture);
								setValue(name, res.at(0)?.url);
								toast.success(`File uploaded successfully!`);
							}
						}}
						onUploadError={(error: Error) => {
							toast.error(`Error: ${error.message}`);
						}}
					/>
				)}
			/>
		</div>
	);
};
