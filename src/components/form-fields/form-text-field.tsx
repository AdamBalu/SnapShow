import { type HTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { TextInput } from '../text-input';

type FormTextFieldProps = HTMLProps<HTMLInputElement> & {
	name: string;
	label: string;
};

/**
 * NOTE: This component is ready to use when wrapped with FormProvider from RHF
 */
export const FormTextField = ({
	name,
	label,
	...inputProps
}: FormTextFieldProps) => {
	const { register } = useFormContext();

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={name}>{label}</label>

			<TextInput {...inputProps} {...register(name)} />
		</div>
	);
};
