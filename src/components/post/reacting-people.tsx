'use server';

import { inArray } from 'drizzle-orm';
import Image from 'next/image';

import { db } from '@/db';
import { type Reaction } from '@/db/schema/reactions';
import { users } from '@/db/schema/users';

type ReactingPeopleProps = {
	reactions: Reaction[];
};

export const ReactingPeople = async (props: ReactingPeopleProps) => {
	const max5users = await props.reactions.slice(0, 5).map(user => user.userId);
	if (max5users.length < 1) {
		return null;
	}
	const profilePics = await db
		.select({ image: users.image })
		.from(users)
		.where(inArray(users.id, max5users));

	return (
		<div className="flex">
			{profilePics.map(
				(profile, idx) =>
					profile.image && (
						<Image
							className={`w-6 h-6 rounded-badge border border-white relative transform -translate-x-${10 * idx} z-${profilePics.length - idx}`}
							key={idx}
							src={profile.image}
							width={128}
							height={128}
							alt="profile img"
						/>
					)
			)}
		</div>
	);
};
