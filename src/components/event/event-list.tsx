'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { type Event } from '@/db/schema/events';
import { Loader } from '@/components/loader';
import { type Genre } from '@/db/schema/genre';
import { displayableDateTime, formatDate } from '@/utils/date-time-converter';
import { useEventList } from '@/hooks/event-list';
import { type Dates } from '@/types/event-data';

import {
	EventFilter,
	type EventGenre,
	type EventFilterSchema
} from './event-filter';

type EventListProps = {
	initialEvents: Event[];
	genres: Genre[];
};

export const EventList = ({ initialEvents, genres }: EventListProps) => {
	const maxDate = formatDate(new Date(8640000000000000));
	const minDate = formatDate(new Date(-8640000000000000));

	const { eventList, hasMore, loading, fetchData } = useEventList(
		initialEvents,
		50
	);

	const [filter, setFilter] = useState<string>('');
	const [selectedGenres, setSelectedGenres] = useState<EventGenre[]>([]);
	const [selecteDates, setSelectedDates] = useState<Dates>({
		dateFrom: minDate,
		dateTo: maxDate
	});

	const filterData = (
		eventName: string,
		genres: EventGenre[],
		dates: Dates
	) => {
		fetchData(true, eventName, genres, dates, 1);
	};

	const onSubmit = async (values: EventFilterSchema) => {
		setFilter(values.eventName);
		setSelectedGenres(values.genres ?? []);

		const dates: Dates = {
			dateFrom: values.fromDate
				? formatDate(new Date(values.fromDate))
				: minDate,
			dateTo: values.toDate ? formatDate(new Date(values.toDate)) : maxDate
		};

		setSelectedDates(dates);
		filterData(values.eventName, values.genres ?? [], dates);
	};

	const onEventClick = (eventId: string) => {
		router.push(`/event/${eventId}`);
	};

	const router = useRouter();

	return (
		<div>
			<EventFilter
				onSubmit={onSubmit}
				genres={genres}
				usersGenres={[]}
				loading={loading}
			/>
			<InfiniteScroll
				dataLength={eventList.length}
				next={async () =>
					await fetchData(false, filter, selectedGenres, selecteDates)
				}
				hasMore={hasMore}
				loader={
					<div className="flex justify-center">
						<Loader />
					</div>
				}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
					{eventList ? (
						eventList.map(event => (
							<button
								onClick={() => onEventClick(event.id)}
								key={event.id}
								className="min-w-[30%] max-w-[100%] flex flex-col m-4 bg-zinc-900 border-primary-shadow shadow rounded-lg transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
							>
								<Image
									alt={`Image of ${event.name}`}
									src={event.imageUrl ?? ''}
									width={300}
									height={150}
									layout="responsive"
									className="rounded-t-lg"
								/>
								<div className="flex flex-col p-4">
									<span>{displayableDateTime(new Date(event.datetime))}</span>
									<span>
										<b>{event.name}</b>
									</span>
									<span>{event.id}</span>
								</div>
							</button>
						))
					) : (
						<div>e</div>
					)}
				</div>
			</InfiniteScroll>
		</div>
	);
};
