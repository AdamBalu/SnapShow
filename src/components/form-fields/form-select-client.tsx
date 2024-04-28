'use client';

import React, {
	type DetailedHTMLProps,
	type SelectHTMLAttributes
} from 'react';
import { useFormContext } from 'react-hook-form';

import { Select } from '@/components/ui/select';

type FormSelectProps = DetailedHTMLProps<
	SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
> & {
	name: string;
	options?: string[];
};

export const FormSelectClient = ({
	name,
	options,
	...selectProps
}: FormSelectProps) => {
	const { register } = useFormContext();
	return <Select options={options} {...selectProps} {...register(name)} />;
};
