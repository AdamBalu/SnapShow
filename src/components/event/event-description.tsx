import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { EventDetailProps } from '@/components/event/event-detail';
import { displayableDateTime } from '@/utils/date-time-converter';

export const EventDescription = ({ event }: EventDetailProps) => {
	return (
		<>
			<div className="flex w-full px-6 justify-between items-center">
				<h1 className="text-3xl font-sarpanch font-extrabold">{event.name}</h1>
				<Button className="flex mr-3 h-16">
					<Image width={24} height={24} src="/static/star.svg" alt="star" />
					Interested
				</Button>
			</div>
			<div className="flex">
				<p className="text-lg font-sarpanch font-bold">Hosted by: </p>
				{displayableDateTime(new Date(event.datetime))}
			</div>
		</>
	);
};
