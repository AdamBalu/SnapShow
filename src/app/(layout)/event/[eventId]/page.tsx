import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getEvent } from '@/server-actions/events';
import { EventDetail } from '@/components/event/event-detail';
import { LogoLoader } from '@/components/logo-loader';

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
			<Suspense fallback={<LogoLoader />}>
				<EventDetail event={event} />
			</Suspense>
		</div>
	);
};
export default EventPage;
