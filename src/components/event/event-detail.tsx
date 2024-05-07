import React from 'react';
import Image from 'next/image';

import { type Event } from '@/db/schema/events';
import { GenreItem } from '@/components/profile/genre-item';
import { getEventGenres } from '@/server-actions/genres';
import { EventDescription } from '@/components/event/event-description';
import { getEventFullDetails } from '@/server-actions/events';

export type EventDetailProps = {
	event: Event;
};

export const EventDetail = async ({ event }: EventDetailProps) => {
	const eventFullDetails = (await getEventFullDetails(event.id)).pop();
	if (!eventFullDetails) {
		return null;
	}
	const eventGenres = await getEventGenres(event.id);
	return (
		<div className="w-full lg:w-[90%] relative xl:w-[70%] mt-16 font-extrabold bg-zinc-900 bg-opacity-70 rounded-2xl text-white flex flex-col gap-10">
			<div>
				<Image
					className="rounded-tl-2xl rounded-tr-2xl"
					src={event.imageUrl ?? ''}
					alt={event.name}
					width={1250}
					height={500}
				/>
				<ul className="absolute top-4 left-4 flex flex-wrap gap-4">
					{eventGenres.map(genre => (
						<GenreItem key={genre.id} {...genre} className="bg-secondary" />
					))}
				</ul>
			</div>

			<EventDescription event={eventFullDetails} />
		</div>
	);
};
