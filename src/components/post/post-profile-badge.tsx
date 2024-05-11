'use server';

import { eq } from 'drizzle-orm';
import Image from 'next/image';
import React from 'react';

import { db } from '@/db';
import { users } from '@/db/schema/users';
import { TimeBadge } from '@/components/post/time-badge';

import { LocationBadge } from './location-badge';

type PostProfileBadgeProps = {
	userId: string | undefined;
	eventId: string | null | undefined;
	timestamp: Date | null | undefined;
};

export const PostProfileBadge = async (props: PostProfileBadgeProps) => {
	if (props.userId === undefined) {
		return <span>Unknown user</span>;
	}
	const user = await db.query.users.findFirst({
		where: eq(users.id, props.userId)
	});

	return (
		<div className="mb-6 flex flex-row">
			<a href={`/user/${user?.id}`}>
				{user?.image && (
					<Image
						className="rounded-badge mr-2 w-16 h-16 hover:drop-shadow-md hover:shadow-blue-400"
						src={user?.image}
						width={512}
						height={512}
						alt="User profile image"
					/>
				)}
			</a>
			<div className="flex-col">
				<a href={`/user/${user?.id}`}>
					<span className="hover:underline">{user?.name}</span>
				</a>
				<div className="flex text-gray-600">
					{props.timestamp && <TimeBadge timestamp={props.timestamp} />}
					{props.eventId && <LocationBadge eventId={props.eventId} />}
				</div>
			</div>
		</div>
	);
};
