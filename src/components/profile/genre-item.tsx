import React from 'react';
import Image from 'next/image';

import { type Genre } from '@/db/schema/genre';

export const GenreItem = ({
	name,
	icon,
	className
}: Genre & { className?: string }) => (
	<li
		className={`${className} flex text-sm gap-1 sm:gap-2 px-2 py-1 rounded-md items-center
	font-sarpanch sm:text-lg uppercase border border-solid border-primary sm:rounded-xl sm:py-2 sm:px-4`}
	>
		{icon !== '' && icon !== null && (
			<Image
				width={64}
				height={64}
				alt="genre icon"
				className="w-4 h-4 sm:w-6 sm:h-6"
				src={icon}
			/>
		)}
		<span>{name}</span>
	</li>
);
