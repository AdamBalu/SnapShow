import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import { getEvent } from '@/server-actions/events';
import { EventDetail } from '@/components/event/event-detail';
import { LogoLoader } from '@/components/logo-loader';

type EventPageProps = {
	params: {
		eventId: string;
	};
};

export const generateMetadata = async ({
	params
}: EventPageProps): Promise<Metadata> => {
	const event = await getEvent(params.eventId);

	return {
		title: event?.name ?? 'Event Detail',
		openGraph: {
			images: [event?.imageUrl ?? '/static/event-placeholder.png']
		}
	};
};

const EventPage = async ({ params }: EventPageProps) => {
	const event = await getEvent(params.eventId);

	if (!event) {
		notFound();
	}

	return (
		<div className="flex flex-col items-center">
			<Suspense fallback={<LogoLoader />}>
				<EventDetail event={event} />
			</Suspense>
		</div>
	);
};
export default EventPage;
