import React from 'react';

import { displayableDateTime } from '@/utils/date-time-converter';
import { getFriendsActionOnEventCount } from '@/server-actions/usersFriends';
import { StatusButton } from '@/components/event/status-button';

import { EventDescriptionAttribute } from './event-description-attribute';

type EventDescriptionProps = {
	eventId: string;
	eventName: string;
	eventImageUrl: string | null;
	eventDescription: string | null;
	eventDateTime: string;
	eventIsDeleted: boolean | null;
	venueId: string;
	venueName: string;
	venueAddress: string;
	venueCountry: string;
	venueZipCode: string;
};

export const EventDescription = async ({
	event
}: {
	event: EventDescriptionProps;
}) => {
	const friendsAttendingEventCount = await getFriendsActionOnEventCount(
		event.eventId,
		'going'
	);

	const friendsInterestedInEventCount = await getFriendsActionOnEventCount(
		event.eventId,
		'interested'
	);

	return (
		<>
			<div className="flex w-full px-6 justify-between items-center gap-4">
				<h1 className="text-xl sm:text-3xl md:text-2xl font-sarpanch font-extrabold">
					{event.eventName}
				</h1>
				<StatusButton />
			</div>
			<div className="flex justify-between p-4">
				<div>
					<EventDescriptionAttribute
						description={displayableDateTime(new Date(event.eventDateTime))}
						iconSrc="/static/calendar.svg"
					/>
					<EventDescriptionAttribute
						description={`${event.venueAddress}, ${event.venueCountry}`}
						iconSrc="/static/location.svg"
					/>
				</div>
				<div>
					<EventDescriptionAttribute
						description={`${friendsAttendingEventCount} friends are going`}
						iconSrc="/static/going.svg"
					/>

					<EventDescriptionAttribute
						description={`${friendsInterestedInEventCount} friends are interested`}
						iconSrc="/static/interested.svg"
					/>
				</div>
			</div>
		</>
	);
};
