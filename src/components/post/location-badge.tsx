import { LucideMapPin } from 'lucide-react';

type LocationBadge = {
	eventId: string | null | undefined;
	venueName: string | null | undefined;
	venueAddress: string | null | undefined;
	eventName: string | null | undefined;
};

export const LocationBadge = (props: LocationBadge) => {
	let locationInfo = '';
	const eventName = props.eventName ?? '';
	const venueName = props.venueName ?? '';

	if (eventName !== '' && venueName !== '') {
		locationInfo = `${props.eventName} | ${props.venueName}`;
	} else if (eventName !== '') {
		locationInfo = eventName!;
	} else if (venueName !== '') {
		locationInfo = venueName!;
	} else {
		locationInfo = 'Unknown event location';
	}
	console.log(locationInfo);

	return (
		<div className="text-gray-600 mt-4 md:flex md:items-center md:ml-6 md:mt-0 text-sm md:text-base">
			<div className="flex items-center ml-4">
				<div className="w-8 h-8">
					<LucideMapPin />
				</div>
				<a href={`/event/${props.eventId}`}>
					<span
						data-tip={`${props.venueAddress}`}
						className="tooltip tooltip-bottom underline md:no-underline hover:underline"
					>
						{locationInfo}
					</span>
				</a>
			</div>
		</div>
	);
};
