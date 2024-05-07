'use client';

import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/navigation';

import { type Genre } from '@/db/schema/genre';
import { formatDate } from '@/utils/date-time-converter';
import { useEventList } from '@/hooks/event-list';
import {
	type EventsListData,
	type Dates,
	type EventFilterSortColumn
} from '@/types/event-data';
import { LogoLoader } from '@/components/logo-loader';

import { SortButton, type SortType } from './sort-button';
import {
	EventFilter,
	type EventGenre,
	type EventFilterSchema
} from './event-filter';
import { EventCard } from './event-card';

type EventListProps = {
	initialEvents: EventsListData[];
	genres: Genre[];
};

type Sort = {
	sortType: SortType;
	sortColumn: EventFilterSortColumn;
};

export const EventList = ({ initialEvents, genres }: EventListProps) => {
	const maxDate = formatDate(new Date(8640000000000000));
	const minDate = formatDate(new Date(-8640000000000000));

	const { eventList, hasMore, loading, fetchData } = useEventList(
		initialEvents,
		50
	);

	const [activeFilter, setActiveFilter] = useState<EventFilterSortColumn>(null);
	const [sortType, setSortType] = useState<SortType>(null);

	const [sort, setSort] = useState<Sort>({ sortType: null, sortColumn: null });
	const [filter, setFilter] = useState<string>('');
	const [selectedGenres, setSelectedGenres] = useState<EventGenre[]>([]);
	const [selecteDates, setSelectedDates] = useState<Dates>({
		dateFrom: minDate,
		dateTo: maxDate
	});

	const filterData = (
		eventName: string,
		genres: EventGenre[],
		dates: Dates,
		sortColumn: EventFilterSortColumn,
		sortType: SortType
	) => {
		fetchData(true, eventName, genres, dates, sortColumn, sortType, 1);
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
		filterData(
			values.eventName,
			values.genres ?? [],
			dates,
			sort.sortColumn,
			sort.sortType
		);
	};

	const onEventClick = (eventId: string) => {
		router.push(`/event/${eventId}`);
	};

	const router = useRouter();

	const sortData = (sortColumn: EventFilterSortColumn, direction: SortType) => {
		setSort({
			sortColumn,
			sortType: direction
		});
		filterData(
			filter,
			selectedGenres ?? [],
			selecteDates,
			sortColumn,
			direction
		);
	};

	const onCountrySort = (direction: SortType) => {
		if (!loading) {
			const sortColumn = direction ? 'country' : null;
			sortData(sortColumn, direction);
		}
	};

	const onNameSort = (direction: SortType) => {
		if (!loading) {
			const sortColumn = direction ? 'name' : null;
			sortData(sortColumn, direction);
		}
	};

	const onDateTimeSort = (direction: SortType) => {
		if (!loading) {
			const sortColumn = direction ? 'date' : null;
			sortData(sortColumn, direction);
		}
	};

	useEffect(() => console.log(sortType), [sortType]);
	useEffect(() => console.log(activeFilter), [activeFilter]);

	return (
		<div>
			<EventFilter
				onSubmit={onSubmit}
				genres={genres}
				usersGenres={[]}
				loading={loading}
			/>
			<div className="flex gap-x-4 mb-5 ml-2">
				<SortButton
					label="Country"
					name="country"
					sortType={sortType}
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					setSortType={setSortType}
					onSort={onCountrySort}
					disabled={loading}
				/>
				<SortButton
					label="Name"
					name="name"
					sortType={sortType}
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					setSortType={setSortType}
					onSort={onNameSort}
					disabled={loading}
				/>
				<SortButton
					label="Date"
					name="date"
					sortType={sortType}
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					setSortType={setSortType}
					onSort={onDateTimeSort}
					disabled={loading}
				/>
			</div>

			<InfiniteScroll
				dataLength={eventList.length}
				next={async () =>
					await fetchData(
						false,
						filter,
						selectedGenres,
						selecteDates,
						sort.sortColumn,
						sort.sortType
					)
				}
				hasMore={hasMore}
				loader={
					<div className="flex justify-center mt-4">
						<LogoLoader />
					</div>
				}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					{eventList ? (
						eventList.map(event => (
							<EventCard
								event={event}
								onClick={onEventClick}
								key={event.eventId}
							/>
						))
					) : (
						<div>e</div>
					)}
				</div>
			</InfiniteScroll>
		</div>
	);
};
