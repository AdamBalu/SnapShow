import Image from 'next/image';

import { EventDescription } from '@/components/event/event-description';
import { GenreItem } from '@/components/profile/genre-item';
import { type Event } from '@/db/schema/events';
import { getEventFullDetails } from '@/server-actions/events';
import { getEventGenres } from '@/server-actions/genres';

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
		<div className="w-[90vw] md:w-[70vw] relative font-extrabold bg-zinc-900 bg-opacity-70 rounded-2xl text-white flex flex-col overflow-hidden">
			<div className="flex">
				<Image
					className="rounded-tl-2xl rounded-tr-2xl w-full"
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
