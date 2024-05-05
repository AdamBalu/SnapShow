'use server';

import { EventList } from '@/components/event/event-list';
import { getEventsWithNameAndGenre } from '@/server-actions/events';
import { getAllGenres } from '@/server-actions/genres';
import { formatDate } from '@/utils/date-time-converter';

const Page = async () => {
	const maxDate = formatDate(new Date(8640000000000000));
	const minDate = formatDate(new Date(-8640000000000000));

	// load initial 50 items
	const initialEvents = await getEventsWithNameAndGenre('', 1, 50, [], {
		dateFrom: minDate,
		dateTo: maxDate
	});

	const genres = await getAllGenres();

	return <EventList initialEvents={initialEvents} genres={genres} />;
};

export default Page;
