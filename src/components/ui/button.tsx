import {
	type ButtonHTMLAttributes,
	type DetailedHTMLProps,
	forwardRef,
	type PropsWithChildren
} from 'react';

import { cn } from '@/lib/cn';

type ButtonProps = PropsWithChildren<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, ...buttonProps }: ButtonProps, ref) => (
		<button
			ref={ref}
			className={cn(
				'flex justify-between h-auto px-8 py-2 rounded-xl text-xl ' +
					'sm:text-2xl font-sarpanch hover:bg-primary border-0 shadow-primary-shadow shadow-[5px_7px_0px_0px] ' +
					'font-bold text-zinc-800 btn bg-primary hover:translate-y-1 hover:translate-x-1 transition duration-300 ' +
					'ease-in-out hover:shadow-none disabled:bg-primary-shadow disabled:text-gray-300',
				className
			)}
			{...buttonProps}
		>
			{children}
		</button>
	)
);
