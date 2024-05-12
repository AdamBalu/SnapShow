import React, { type HTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/cn';

type SelectInputProps = HTMLProps<HTMLSelectElement> & {
	label?: string;
	name: string;
	options: { value: string | number; label: string }[];
};

export const FormSelect = ({
	label,
	name,
	options,
	className,
	...selectProps
}: SelectInputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	return (
		<div className="form-control w-full">
			{label && (
				<label htmlFor={name} className="label">
					<span className="label-text text-white font-sarpanch font-extrabold">
						{label}
					</span>
				</label>
			)}

			<select
				id={name}
				className={cn(
					'select select-bordered w-full border-primary focus:border-primary bg-neutral',
					errors[name] && 'input-error',
					className
				)}
				{...selectProps}
				{...register(name)}
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>

			{errors[name] && (
				<span className="mt-2 text-sm text-error">
					{errors[name]?.message?.toString()}
				</span>
			)}
		</div>
	);
};
