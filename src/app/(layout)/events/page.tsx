'use server';

import { EventListWithContext } from '@/components/event/event-list';
import { getEventsWithNameAndGenre } from '@/server-actions/events';
import { getAllGenres } from '@/server-actions/genres';
import { formatDate } from '@/utils/date-time-converter';

const Page = async () => {
	// load initial 50 items
	const initialEvents = await getEventsWithNameAndGenre(
		'',
		1,
		50,
		[],
		{
			dateFrom: null,
			dateTo: null
		},
		null,
		null
	);

	const genres = await getAllGenres();

	return <EventListWithContext initialEvents={initialEvents} genres={genres} />;
};

export default Page;
