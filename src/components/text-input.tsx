import { forwardRef, type HTMLProps } from 'react';

type TextInputProps = HTMLProps<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	(inputProps, ref) => (
		<input
			ref={ref}
			className="w-96 rounded-lg bg-slate-50 px-3 py-1.5 shadow"
			{...inputProps}
		/>
	)
);
