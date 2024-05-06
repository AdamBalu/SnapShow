import {
	type ButtonHTMLAttributes,
	type DetailedHTMLProps,
	type PropsWithChildren
} from 'react';

import { cn } from '@/lib/cn';

type ButtonProps = PropsWithChildren<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const ControlButton = ({
	className,
	children,
	...buttonProps
}: ButtonProps) => (
	<button
		className={cn(
			'flex text-black justify-center rounded-2xl font-sarpanch border-0 btn btn-xs bg-primary py-0 h-3 px-4 text-xs sm:text-xs w-36 hover:bg-primary',
			className
		)}
		{...buttonProps}
	>
		{children}
	</button>
);
