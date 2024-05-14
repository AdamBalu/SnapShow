import Image from 'next/image';

import { TimeBadge } from '@/components/post/time-badge';

import { LocationBadge } from './location-badge';

type PostProfileBadgeProps = {
	userId: string | undefined;
	eventId: string | null | undefined;
	datetime: Date | null;
	venueName: string | undefined | null;
	eventName: string | undefined | null;
	venueAddress: string | undefined | null;
	userPic: string | undefined | null;
	userName: string | undefined | null;
};

export const PostProfileBadge = (props: PostProfileBadgeProps) => {
	if (props.userId === undefined) {
		return <span>Unknown user</span>;
	}

	return (
		<div className="mb-6 md:flex md:flex-row">
			<div className="flex md:items-center">
				<a href={`/user/${props.userId}`}>
					{props.userPic && (
						<div className="avatar relative w-16 h-16 mr-4">
							<Image
								className="rounded-badge mr-2 w-16 h-16 hover:drop-shadow-md hover:shadow-blue-400"
								src={props.userPic}
								width={256}
								height={256}
								alt="User profile image"
							/>
						</div>
					)}
				</a>
				<div className="flex-col">
					<a href={`/user/${props.userId}`}>
						<span className="underline md:no-underline hover:underline">
							{props.userName}
						</span>
					</a>
					<div className="text-gray-600">
						{props.datetime && <TimeBadge datetime={props.datetime} />}
					</div>
				</div>
			</div>
			{props.eventId && (
				<LocationBadge
					eventId={props.eventId}
					venueName={props.venueName}
					venueAddress={props.venueAddress}
					eventName={props.eventName}
				/>
			)}
		</div>
	);
};
