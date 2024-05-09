import React from 'react';
import { CircleCheck, Star } from 'lucide-react';

import { displayableDateTime } from '@/utils/date-time-converter';
import { StatusButton } from '@/components/event/status-button';
import {
	getUserEventStatus,
	getUsersActionOnEventCount
} from '@/server-actions/events';
import type { UserEventStatus } from '@/types/event-data';
import VenueMap from '@/components/event/venue-map';

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
	venueLng: string;
	venueLat: string;
};

export const EventDescription = async ({
	event
}: {
	event: EventDescriptionProps;
}) => {
	const usersGoingCount = await getUsersActionOnEventCount(
		event.eventId,
		'going'
	);

	const usersInterestedCount = await getUsersActionOnEventCount(
		event.eventId,
		'interested'
	);

	const userEventStatus =
		(await getUserEventStatus(event.eventId)) ?? 'not-interested';

	return (
		<div className="flex flex-col-reverse lg:flex-row">
			<div className="lg:w-2/5">
				<VenueMap lat={Number(event.venueLat)} lng={Number(event.venueLng)} />
			</div>
			<div>
				<div className="flex w-full px-6 justify-between items-center gap-4">
					<h1 className="text-xl sm:text-3xl md:text-2xl font-sarpanch font-extrabold">
						{event.eventName}
					</h1>
					<div className="flex flex-col justify-end items-end mt-6">
						<StatusButton
							eventId={event.eventId}
							initialStatus={userEventStatus}
						/>
						<span className="text-xs text-gray-600 text-end mt-3.5 mr-3">
							you are {getStatusStr(userEventStatus)}
						</span>
					</div>
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
							description={`${usersGoingCount} going`}
							icon={
								<CircleCheck
									size={24}
									className="text-primary"
									strokeWidth={2}
								/>
							}
						/>

						<EventDescriptionAttribute
							description={`${usersInterestedCount} interested`}
							icon={<Star size={24} className="text-primary" strokeWidth={2} />}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const getStatusStr = (s: UserEventStatus): string => {
	switch (s) {
		case 'not-interested':
			return 'not interested';
		default:
			return s.toString();
	}
};
