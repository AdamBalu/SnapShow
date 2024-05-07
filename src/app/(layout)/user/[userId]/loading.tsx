'use client';

import React from 'react';

import { LogoLoader } from '@/components/logo-loader';

const Loading = () => (
	<div className="w-full flex justify-center">
		<LogoLoader />
	</div>
);

export default Loading;
