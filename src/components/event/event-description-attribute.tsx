import Image from 'next/image';
import React from 'react';

type EventDescriptionAttributeProps = {
	description: string;
	iconSrc?: string;
	icon?: React.ReactNode;
};

export const EventDescriptionAttribute = ({
	description,
	iconSrc,
	icon
}: EventDescriptionAttributeProps) => (
	<div className="flex gap-3 items-center p-4 text-xs sm:text-base">
		{icon ? (
			icon
		) : (
			<Image
				width={24}
				height={24}
				src={iconSrc ?? '/static/logo.png'}
				alt=""
				className="w-3 h-3 sm:w-6 sm:h-6"
			/>
		)}
		{description}
	</div>
);
