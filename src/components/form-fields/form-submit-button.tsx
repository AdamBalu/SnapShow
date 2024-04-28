import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';

type FromButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	label: string;
	isPending: boolean;
};

export const FormSubmitButton = ({
	label,
	isPending,
	...buttonProps
}: FromButtonProps) => {
	const { register } = useFormContext();
	return (
		<Button
			{...buttonProps}
			{...register('submit')}
			className="bg-blue-700 my-2"
		>
			{isPending ? 'Submitting...' : label}
		</Button>
	);
};
