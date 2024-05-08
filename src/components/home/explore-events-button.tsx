'use client';
import React from 'react';

import { Button } from '@/components/ui/button';

const scrollToMainPageStart = () => {
	const mainPageStart = document.getElementById('main-page-start');
	if (mainPageStart) {
		mainPageStart.scrollIntoView({ behavior: 'smooth' });
	}
};

export const ExploreEventsButton = () => (
	<Button
		className="justify-center flex flex-col md:justify-start transition duration-1000 h-min"
		onClick={scrollToMainPageStart}
	>
		Explore events
	</Button>
);
