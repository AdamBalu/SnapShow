'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

const scrollToMainPageStart = () => {
	const mainPageStart = document.getElementById('main-page-start');
	if (mainPageStart) {
		mainPageStart.scrollIntoView({ behavior: 'smooth' });
	}
};

export const ExploreEventsButton = () => (
	<Button
		className="flex flex-row gap-3 px-6 transition h-min max-w-56 mx-auto"
		onClick={scrollToMainPageStart}
	>
		<div className="flex uppercase flex-col gap-0 w-24 md:w-32 h-min">
			<div className="flex w-full">
				<span className="flex justify-start w-full text-base md:text-2xl">
					Explore
				</span>
			</div>
			{'\n'}
			<span className="flex justify-end w-full text-base md:text-2xl">
				content
			</span>
		</div>
		<Image
			src="/static/arrow-down.svg"
			alt="arrow down"
			width={32}
			height={32}
		/>
	</Button>
);
