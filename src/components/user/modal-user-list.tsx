import React from 'react';
import Link from 'next/link';

import { Avatar } from '@/components/user/avatar';

type UserPreview = {
	id: string;
	username: string | null | undefined;
	image: string | null | undefined;
};

type ModalUserListProps = {
	users?: UserPreview[];
};

export const ModalUserList = ({ users }: ModalUserListProps) => (
	<ul className="flex flex-col gap-2 w-full">
		{users?.map(friend => (
			<li key={friend.id} className="btn h-16 w-full">
				<Link
					className="flex w-full flex-row gap-2 items-center justify-between"
					href={`/user/${friend.id}`}
				>
					<Avatar className="size-12 p-0" profilePicture={friend.image} />
					<span className="font font-sarpanch flex-grow text-wrap break-words text-md md:text-xl">
						{friend.username}
					</span>
				</Link>
			</li>
		))}
	</ul>
);
