import Image from 'next/image';
import React from 'react';

type EventDescriptionAttributeProps = {
	description: string;
	iconSrc: string;
};

export const EventDescriptionAttribute = ({
	description,
	iconSrc
}: EventDescriptionAttributeProps) => (
	<div className="flex gap-3 items-center p-4 text-xs sm:text-base">
		<Image
			width={24}
			height={24}
			src={iconSrc}
			alt=""
			className="w-3 h-3 sm:w-6 sm:h-6"
		/>
		{description}
	</div>
);
