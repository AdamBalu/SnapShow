import { useState } from 'react';

import { type EventGenre } from '@/components/event/event-filter';
import { getEventsWithNameAndGenre } from '@/server-actions/events';
import { type Dates } from '@/types/event-data';
import { type Event } from '@/db/schema/events';

export const useEventList = (initialEvents: Event[], pageSize: number) => {
	const [eventList, setEventList] = useState<Event[]>(initialEvents);
	const [hasMore, setHasMore] = useState(true);
	const [index, setIndex] = useState(2);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchData = async (
		clearData: boolean,
		filterValue: string,
		genres: EventGenre[],
		dates: Dates,
		filterIndex?: number
	) => {
		if (!loading) {
			setLoading(true);

			const events = await getEventsWithNameAndGenre(
				filterValue ? filterValue : '',
				filterIndex ? filterIndex : index,
				pageSize,
				genres ? genres.map(genre => genre.id) : [],
				dates
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
