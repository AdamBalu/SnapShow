import { eq } from 'drizzle-orm';
import { LucideMapPin } from 'lucide-react';

import { db } from '@/db';
import { events } from '@/db/schema/events';
import { venues } from '@/db/schema/venues';

type LocationBadge = {
	eventId: string;
};

export const LocationBadge = async (props: LocationBadge) => {
	const locationQuery = await db
		.select()
		.from(events)
		.where(eq(events.id, props.eventId))
		.leftJoin(venues, eq(events.venueId, venues.id));

	const location = locationQuery[0] ?? null;
	return (
		<div
			className="tooltip tooltip-bottom"
			data-tip={`${location.venue?.address} ${location.venue?.country}`}
		>
			<div className="flex ml-4">
				<LucideMapPin />
				<a href={`/event/${location.event.id}`}>
					{location?.venue && (
						<span className="hover:underline">
							{location.venue.name
								? `${location.event.name} | ${location.venue.name}`
								: location.event.name}
						</span>
					)}
				</a>
			</div>
		</div>
	);
};
