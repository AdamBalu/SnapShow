'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/form-input';
import { type Genre } from '@/db/schema/genre';

import { MultiSelectInput } from '../ui/form/multi-select';
import { Loader } from '../loader';

const genreSchema = z.object({
	id: z.string(),
	name: z.string()
});

const eventFilterSchema = z.object({
	eventName: z.string().default(''),
	genres: z.array(genreSchema).optional(),
	fromDate: z.string().optional(),
	toDate: z.string().optional()
});

export type EventFilterSchema = z.infer<typeof eventFilterSchema>;
export type EventGenre = z.infer<typeof genreSchema>;

type EventFilterProps = {
	onSubmit: (values: EventFilterSchema) => void;
	genres: Genre[];
	usersGenres: Genre[];
	loading: boolean;
};

export const EventFilter = ({
	onSubmit,
	genres,
	loading
}: EventFilterProps) => {
	const form = useForm<EventFilterSchema>({
		resolver: zodResolver(eventFilterSchema)
	});
	return (
		<div className="mx-2 mb-16">
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-2 w-full items-center"
				>
					<div className="flex flex-col w-full">
						<div className="flex flex-row gap-3 md:gap-8 ">
							<FormInput
								className="w-auto"
								label="EventName"
								name="eventName"
							/>
							<Button
								className="h-min w-min self-end mr-1"
								disabled={form.formState.isSubmitting}
							>
								{loading ? (
									<Loader className="bg-zinc-900 w-[24px] h-[24px]" />
								) : (
									<Search />
								)}
							</Button>
						</div>
						<div className="flex flex-col space-between gap-x-8 lg:flex-row">
							<div className="w-full ">
								<MultiSelectInput
									displayValue="name"
									label="Genres"
									options={genres.map(genre => ({
										id: genre.id,
										name: genre.name
									}))}
									name="genres"
									selectedValues={[]}
								/>
							</div>
							<div className="flex flex-row flex-grow gap-8 items-end">
								<FormInput
									type="date"
									className=""
									label="From"
									name="fromDate"
								/>
								<FormInput type="date" className="" label="To" name="toDate" />
							</div>
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};
