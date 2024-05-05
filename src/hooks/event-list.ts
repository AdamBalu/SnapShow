import { useState } from 'react';

import { type EventGenre } from '@/components/event/event-filter';
import { getEventsWithNameAndGenre } from '@/server-actions/events';
import {
	type EventsListData,
	type Dates,
	type EventFilterSortColumn
} from '@/types/event-data';
import { type SortType } from '@/components/event/sort-button';

export const useEventList = (
	initialEvents: EventsListData[],
	pageSize: number
) => {
	const [eventList, setEventList] = useState<EventsListData[]>(initialEvents);
	const [hasMore, setHasMore] = useState(true);
	const [index, setIndex] = useState(2);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchData = async (
		clearData: boolean,
		filterValue: string,
		genres: EventGenre[],
		dates: Dates,
		sortColumn: EventFilterSortColumn,
		sortrDirection: SortType,
		filterIndex?: number
	) => {
		if (!loading) {
			setLoading(true);
			console.log(sortColumn);
			console.log(sortrDirection);

			const events: EventsListData[] = await getEventsWithNameAndGenre(
				filterValue ? filterValue : '',
				filterIndex ? filterIndex : index,
				pageSize,
				genres ? genres.map(genre => genre.id) : [],
				dates,
				sortColumn,
				sortrDirection
			);

			setHasMore(events.length === pageSize);
			setEventList(prevItems =>
				clearData ? events : [...prevItems, ...events]
			);
			setIndex(prevIndex => (filterIndex ? filterIndex + 1 : prevIndex + 1));
			setLoading(false);
		}
	};

	return { eventList, hasMore, loading, fetchData };
};
