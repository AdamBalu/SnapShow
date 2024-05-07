'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

type Status = 'interested' | 'going' | 'not-interested';

export const StatusButton = () => {
	const [status, setStatus] = useState<Status>('not-interested');

	return (
		<Button
			className={`${getButtonStyle(status)} flex items-center justify-center mr-3
			 h-1 sm:h-16 text-xs px-1 py-0 sm:px-3 sm:py-1 md:px-8 lg:py-2 transition-width transition-hover duration-300`}
			onClick={() => {
				setStatus(getNextStatus(status));
			}}
		>
			{status === 'not-interested' && (
				<div className="flex items-center gap-2">
					<Image
						width={24}
						height={24}
						src="/static/star.svg"
						alt="star"
						className="h-3 w-3 sm:h-6 sm:w-6"
					/>
					Interested
				</div>
			)}

			{status === 'interested' && (
				<Image
					width={24}
					height={24}
					src="/static/checkmark.svg"
					alt="checkmark"
					className="h-3 w-3 sm:h-6 sm:w-6"
				/>
			)}

			{status === 'going' && (
				<Image
					width={24}
					height={24}
					src="/static/checkmark.svg"
					alt="checkmark"
					className="h-3 w-3 sm:h-6 sm:w-6"
				/>
			)}
		</Button>
	);
};

const getButtonStyle = (status: Status) => {
	switch (status) {
		case 'not-interested':
			return 'w-[120px] sm:w-[250px]';
		case 'interested':
			return 'w-[90px] bg-[#09832B] shadow-[#0A521E] hover:bg-gray-800';
		case 'going':
			return 'w-[90px] shadow-none bg-gray-800 border-2 border-primary hover:bg-gray-700';
	}
};

const getNextStatus = (status: Status): Status => {
	switch (status) {
		case 'not-interested':
			return 'interested';
		case 'interested':
			return 'going';
		case 'going':
			return 'not-interested';
	}
};
