import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { Loader } from '@/components/loader';
import { getEvent } from '@/server-actions/events';
import { EventDetail } from '@/components/event/event-detail';

type EventPageProps = {
	params: {
		eventId: string;
	};
};

const EventPage = async ({ params }: EventPageProps) => {
	const event = await getEvent(params.eventId);

	if (!event) {
		notFound();
	}

	return (
		<div className="flex flex-col items-center lg:px-32">
			<Suspense fallback={<Loader />}>
				<EventDetail event={event} />
			</Suspense>
		</div>
	);
};
export default EventPage;
