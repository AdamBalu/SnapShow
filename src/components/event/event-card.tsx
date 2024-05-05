import Image from 'next/image';
import { MapPin, Calendar } from 'lucide-react';

import { displayableDateTime } from '@/utils/date-time-converter';
import { type EventsListData } from '@/types/event-data';

type EventCardProps = {
	event: EventsListData;
	onClick: (eventId: string) => void;
};

export const EventCard = ({ event, onClick }: EventCardProps) => (
	<button
		onClick={() => onClick(event.eventId)}
		key={event.eventId}
		className="min-w-[30%] max-w-[100%] flex flex-col m-4 bg-zinc-900 border-primary-shadow shadow rounded-lg transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
	>
		<Image
			alt={`Image of ${event.eventName}`}
			src={event.eventImageUrl ?? '/static/event-placeholder.png'}
			width={300}
			height={150}
			layout="responsive"
			className="rounded-t-lg"
			placeholder="blur"
			blurDataURL="/static/event-placeholder.png"
		/>
		<div className="flex flex-col p-4 items-start">
			<span className="text-primary text-sm text-nowrap overflow-hidden text-ellipsis max-w-sm sm:max-w-64 md:max-w-72 lg:max-w-[18rem] xl:max-w-[23rem]">
				<b>{event.eventName}</b>
			</span>

			<span className="text-sm text-zinc-400">{event.venueName}</span>
			<div className="flex items-center text-zinc-600 text-xs ">
				<MapPin className="mr-2" height={14} width={12} />
				<span className="text-nowrap overflow-hidden text-ellipsis max-w-sm sm:max-w-[14rem] md:max-w-72 lg:max-w-[16rem] xl:max-w-[23rem]">
					{event.venueCountry}, {event.venueAddress}
				</span>
			</div>
			<div className="flex items-center text-zinc-600 text-xs">
				<Calendar className="mr-2" height={14} width={12} />
				{displayableDateTime(new Date(event.eventDateTime))}
			</div>
		</div>
	</button>
);
