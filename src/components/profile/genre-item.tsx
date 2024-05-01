import React from 'react';
import Image from 'next/image';

import { type Genre } from '@/db/schema/genre';

export const GenreItem = ({ name, icon }: Genre) => (
	<div className="flex items-center gap-2 font-sarpanch text-lg uppercase border border-solid border-primary rounded-xl py-2 px-4">
		{icon !== '' && icon !== null && (
			<Image
				width={16}
				height={16}
				alt="profile picture"
				className=""
				src={icon}
			/>
		)}
		<span>{name}</span>
	</div>
);
