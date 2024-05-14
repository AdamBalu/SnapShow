import { LucideMapPin } from 'lucide-react';

type LocationBadge = {
	eventId: string | null | undefined;
	venueName: string | null | undefined;
	venueAddress: string | null | undefined;
	eventName: string | null | undefined;
};

export const LocationBadge = (props: LocationBadge) => (
	<div
		className="text-gray-600 mt-4 md:flex md:items-center md:ml-6 md:mt-0 tooltip tooltip-bottom text-sm md:text-base"
		data-tip={`${props.venueAddress}`}
	>
		<div className="flex items-center ml-4">
			<div className="w-8 h-8">
				<LucideMapPin />
			</div>
			<a href={`/event/${props.eventId}`}>
				{props.venueName && (
					<span className="underline md:no-underline hover:underline">
						{props.eventName && props.venueName
							? `${props.eventName} | ${props.venueName}`
							: props.venueName
								? props.venueName === ''
								: props.eventName === ''
									? props.eventName === ''
									: 'Unknown event'}
					</span>
				)}
			</a>
		</div>
	</div>
);
