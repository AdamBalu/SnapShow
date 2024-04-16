import {
	type DetailedHTMLProps,
	forwardRef,
	type SelectHTMLAttributes
} from 'react';

type SelectProps = DetailedHTMLProps<
	SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
> & {
	options?: string[];
	name: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ name, options, ...selectProps }: SelectProps, ref) => {
		const isLoading = options === undefined;
		return (
			<select
				ref={ref}
				className="w-96 cursor-pointer appearance-none rounded-lg bg-slate-50 px-3 py-1.5 shadow"
				id={name}
				name={name}
				disabled={isLoading}
				{...selectProps}
			>
				{(options ?? ['Načítání...']).map(movieType => (
					<option key={movieType} value={movieType}>
						{movieType}
					</option>
				))}
			</select>
		);
	}
);
