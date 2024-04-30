import React from 'react';
import Image from 'next/image';

type AvatarProps = {
	profilePicture: string | undefined | null;
};

export const Avatar = ({ profilePicture }: AvatarProps) => (
	<div className="flex justify-center items-center w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 from-40% to-70%">
		<Image
			width={200}
			height={200}
			alt="profile picture"
			className="h-28 w-28 lg:w-44 lg:h-44 rounded-full object-cover"
			src={profilePicture ?? '/static/user_placeholder.svg'}
		/>
	</div>
);
