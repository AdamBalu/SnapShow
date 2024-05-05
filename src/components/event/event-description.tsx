import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { type EventDetailProps } from '@/components/event/event-detail';
import { displayableDateTime } from '@/utils/date-time-converter';

import { EventDescriptionAttribute } from './event-description-attribute';

export const EventDescription = ({ event }: EventDetailProps) => (
	<>
		<div className="flex w-full px-6 justify-between items-center gap-4">
			<h1 className="text-xl sm:text-3xl md:text-2xl font-sarpanch font-extrabold">
				{event.name}
			</h1>
			<Button className="flex mr-3 h-1 sm:h-16 text-xs px-2 py-0 sm:px-3 sm:py-1 md:px-8 lg:py-2">
				<Image
					width={24}
					height={24}
					src="/static/star.svg"
					alt="star"
					className="h-3 w-3 sm:h-6 sm:w-6"
				/>
				Interested
			</Button>
		</div>
		<div className="flex justify-between p-4">
			<div>
				<EventDescriptionAttribute
					description={displayableDateTime(new Date(event.datetime))}
					iconSrc="/static/calendar.svg"
				/>
				<EventDescriptionAttribute
					description="somewhere"
					iconSrc="/static/location.svg"
				/>
			</div>
			<div>
				<EventDescriptionAttribute
					description="xyz friends are going"
					iconSrc="/static/going.svg"
				/>

				<EventDescriptionAttribute
					description="xyz friends are interested"
					iconSrc="/static/interested.svg"
				/>
			</div>
		</div>
	</>
);
