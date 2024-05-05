'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Multiselect } from 'multiselect-react-dropdown';
import { CircleX } from 'lucide-react';
type MultiSelectInputProps<T> = {
	label: string;
	name: string;
	options: T[];
	selectedValues: T[];
	displayValue: string;
};

export const MultiSelectInput = <T,>({
	label,
	name,
	options,
	displayValue,
	selectedValues
}: MultiSelectInputProps<T>) => {
	const { register, control } = useFormContext();

	return (
		<label htmlFor={name} className="form-control w-full">
			<div className="label">
				<span className="label-text text-white font-sarpanch font-extrabold">
					{label}
				</span>
			</div>
			<Controller
				{...register(name)}
				control={control}
				render={({ field: { onChange } }) => (
					<Multiselect
						customCloseIcon={
							<CircleX
								className="cursor-pointer ml-2 w-4 h-4"
								color="#09d9d6"
							/>
						}
						options={options}
						displayValue={displayValue}
						isObject
						closeOnSelect={false}
						placeholder="Add genre"
						onSelect={onChange}
						onRemove={onChange}
						selectedValues={selectedValues}
						style={{
							multiselectContainer: {
								backgroundColor: '#1D232A'
							},
							searchBox: {
								border: '1px solid #08D9D6',
								borderRadius: '0.5rem',
								minHeight: '5rem',
								background: 'none',
								padding: '0.5rem'
							},
							chips: {
								backgroundColor: 'rgba(22, 24, 29, 0.7)',
								border: '1px solid #08D9D6',
								color: 'white'
							},
							optionContainer: {
								backgroundColor: '#1D232A',
								border: '1px solid #08D9D6'
							},
							option: {
								backgroundColor: '#1D232A',
								color: 'white'
							}
						}}
					/>
				)}
			/>
		</label>
	);
};
