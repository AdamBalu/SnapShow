import React, { type HTMLProps } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/cn';

type AvatarProps = HTMLProps<HTMLDivElement> & {
	profilePicture: string | undefined | null;
};

export const Avatar = ({
	profilePicture,
	className,
	...props
}: AvatarProps) => (
	<div
		{...props}
		className={cn(
			'flex justify-center items-center w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 from-40% to-70%',
			className
		)}
	>
		<Image
			width={200}
			height={200}
			alt="profile picture"
			className="h-28 w-28 md:w-44 md:h-44 rounded-full object-cover"
			src={profilePicture ?? '/static/user_placeholder.svg'}
		/>
	</div>
);
