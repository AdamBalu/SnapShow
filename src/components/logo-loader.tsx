import React from 'react';

import { cn } from '@/lib/cn';

export const LogoLoader = ({ className = '' }) => (
	<object
		width={60}
		type="image/svg+xml"
		height={60}
		data="/static/logo-animated.svg"
		className={cn('h-16 w-16 sm:h-24 sm:w-24', className)}
	/>
);
