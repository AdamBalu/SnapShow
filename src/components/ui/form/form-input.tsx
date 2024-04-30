'use client';

import { type HTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/cn';

type FormInputProps = HTMLProps<HTMLInputElement> & {
	label: string;
	name: string;
};

export const FormInput = ({
	label,
	name,
	className,
	...inputProps
}: FormInputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	return (
		<label htmlFor={name} className="form-control w-full">
			<div className="label">
				<span className="label-text text-white font-sarpanch font-extrabold">
					{label}
				</span>
			</div>
			<input
				id={name}
				className={cn(
					'input input-bordered w-full border-primary focus:border-primary',
					errors[name] && 'input-error',
					className
				)}
				{...inputProps}
				{...register(name, {
					valueAsNumber: inputProps.type === 'number'
				})}
			/>

			{errors[name] && (
				<span className="mt-2 text-sm text-error">
					{errors[name]?.message?.toString()}
				</span>
			)}
		</label>
	);
};
