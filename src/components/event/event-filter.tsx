'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Search } from 'lucide-react';

import { FormInput } from '@/components/ui/form/form-input';
import { type Genres } from '@/db/schema/genres';

import { MultiSelectInput } from '../ui/form/multi-select';

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
	genres: Genres[];
	usersGenres: Genres[];
	loading: boolean;
};

export const EventFilter = ({ onSubmit, genres }: EventFilterProps) => {
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
								className="w-full"
								label="EventName"
								name="eventName"
							/>
							<button
								type="submit"
								className="z-1 -ml-14 mt-8 sm:-ml-20 active:scale-90 transition-transform duration-300"
							>
								<Search size={28} color="#08d9d6" />
							</button>
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
							<div className="flex flex-row gap-8 items-end">
								<FormInput
									type="date"
									className="text-xs sm:text-base"
									label="From"
									name="fromDate"
								/>
								<FormInput
									type="date"
									className="text-xs sm:text-base"
									label="To"
									name="toDate"
								/>
							</div>
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};
