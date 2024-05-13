import { LucideMapPin } from 'lucide-react';

type LocationBadge = {
	eventId: string | null | undefined;
	venueName: string | null | undefined;
	venueAddress: string | null | undefined;
	eventName: string | null | undefined;
};

export const LocationBadge = (props: LocationBadge) => (
	<div className="tooltip tooltip-bottom" data-tip={`${props.venueAddress}`}>
		<div className="flex ml-4">
			<LucideMapPin />
			<a href={`/event/${props.eventId}`}>
				{props.venueName && (
					<span className="hover:underline">
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
