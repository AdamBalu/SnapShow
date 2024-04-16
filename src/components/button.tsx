import {
	type ButtonHTMLAttributes,
	type DetailedHTMLProps,
	forwardRef
} from 'react';

import { cn } from '@/lib/cn';

type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, ...buttonProps }: ButtonProps, ref) => (
		<button
			ref={ref}
			className={cn('w-96 rounded-md py-1 text-white', className)}
			{...buttonProps}
		/>
	)
);
