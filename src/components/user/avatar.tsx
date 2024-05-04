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
			'flex justify-center items-center p-2 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 from-40% to-70%',
			className
		)}
	>
		<Image
			width={200}
			height={200}
			alt="profile picture"
			className="h-full rounded-full object-cover"
			src={profilePicture ?? '/static/user_placeholder.svg'}
		/>
	</div>
);
