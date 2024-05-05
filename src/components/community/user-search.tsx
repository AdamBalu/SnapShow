'use client';
import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormInput } from '@/components/ui/form/form-input';

const searchSchema = z.object({
	search: z.string()
});

type SearchSchema = z.infer<typeof searchSchema>;

export const UserSearch = () => {
	const form = useForm<SearchSchema>({
		resolver: zodResolver(searchSchema)
	});

	const { register, handleSubmit } = form;

	const onSubmit = async (values: SearchSchema) => {
		console.log(values);
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-[800px] mx-auto">
				<FormInput
					{...register('search')}
					label="Search users"
					name="user-search"
					className="bg-[#303F57] rounded-2xl text-white"
					placeholder="Janko Hrasko"
					icon={
						<Image
							width={24}
							height={24}
							src="/static/search.svg"
							alt="search icon"
						/>
					}
				/>
			</form>
		</FormProvider>
	);
};
