import React from 'react';
import Link from 'next/link';

import { Avatar } from '@/components/user/avatar';
import { FriendButton } from '@/components/friends/friend-button';
import { type UsersFriends } from '@/db/schema/usersFriends';

type UserCardProps = {
	username: string | null;
	image: string | null;
	userId: string;
	friendsStatus: UsersFriends | null;
};

export const UserCard = ({
	image,
	username,
	userId,
	friendsStatus
}: UserCardProps) => (
	<div className="px-3 py-2 bg-opacity-70 justify-between font-sarpanch flex-grow gap-3 items-center font-extrabold text-white flex flex-row border border-solid border-primary rounded-3xl bg-zinc-900">
		<Link className="flex flex-row gap-2 items-center" href={`/user/${userId}`}>
			<Avatar className="size-12 xl:size-16 p-1" profilePicture={image} />
			<span className="max-w-36 md:max-w-full text-wrap break-words text-sm md:text-xl">
				{username}
			</span>
		</Link>
		<FriendButton
			className="h-10 w-24 md:w-48"
			userId={userId}
			friendStatus={friendsStatus}
		/>
	</div>
);
