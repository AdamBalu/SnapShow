import { LucideMapPin } from 'lucide-react';

type LocationBadge = {
	eventId: string;
};

export const LocationBadge = async (_props: LocationBadge) => {
	const location = 'O2 Aréna; Praha'; // TODO: replace with actual venue location

	return (
		<div className="flex ml-4">
			<LucideMapPin />
			<span>{location}</span>
		</div>
	);
};
