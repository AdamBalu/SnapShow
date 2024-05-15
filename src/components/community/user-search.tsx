import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormInput } from '@/components/ui/form/form-input';

const searchSchema = z.object({
	search: z.string().optional()
});

type SearchSchema = z.infer<typeof searchSchema>;

type UserSearchProps = {
	setNameFilter: (name: string) => void;
};

export const UserSearch = ({ setNameFilter }: UserSearchProps) => {
	const form = useForm<SearchSchema>({
		resolver: zodResolver(searchSchema)
	});

	const { register, handleSubmit } = form;

	const onSubmit = async (values: SearchSchema) => {
		setNameFilter(values.search ?? '');
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex-grow w-full flex items-center"
			>
				<FormInput
					{...register('search')}
					className="rounded-2xl text-white bg-opacity-70 bg-zinc-900"
					placeholder="Search"
				/>
				<button
					type="submit"
					className="z-50 -ml-10 active:scale-90 transition-transform duration-300"
				>
					<Search size={28} color="#08d9d6" />
				</button>
			</form>
		</FormProvider>
	);
};
