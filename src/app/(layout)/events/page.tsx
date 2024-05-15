import { type Metadata } from 'next';

import { EventListWithContext } from '@/components/event/event-list';
import { getEventsWithNameAndGenre } from '@/server-actions/events';
import { getAllGenres } from '@/server-actions/genres';
import { auth } from '@/auth';

export const metadata: Metadata = {
	title: 'Events'
};

const Page = async () => {
	const session = await auth();

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

	return (
		<EventListWithContext
			initialEvents={initialEvents}
			genres={genres}
			isUserSignedIn={session !== null}
		/>
	);
};

export default Page;
