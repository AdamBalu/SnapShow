'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Avatar } from '@/components/user/avatar';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { acceptFriendRequest } from '@/server-actions/usersFriends';
import { FriendRemoveButton } from '@/components/user/friend-remove-button';

type UserCardProps = {
	username: string | null;
	image: string | null;
	userId: string;
	isPending: boolean;
};

export const UserCard = ({
	image,
	username,
	userId,
	isPending
}: UserCardProps) => {
	const [loading, setLoading] = useState(false);

	const onAcceptRequest = async () => {
		setLoading(true);
		await acceptFriendRequest(userId)
			.catch(err => {
				toast.error(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div
			className={`w-full md:w-48 px-3 py-2 md:py-6 md:px-10 justify-between font-sarpanch flex-grow md:flex-grow-0 gap-3 items-center font-extrabold text-white flex flex-row md:flex-col border border-solid border-primary rounded-3xl bg-zinc-900 ${!isPending && 'flex-row-reverse'}`}
		>
			<Link
				className="flex flex-row md:flex-col gap-4 md:gap-2 items-center"
				href={`/user/${userId}`}
			>
				<Avatar
					className="size-16 md:size-24 p-1 md:p-1.5"
					profilePicture={image}
				/>
				<span className="max-w-28 md:max-w-36 text-sm md:text-md break-words text-wrap">
					{username}
				</span>
			</Link>
			{isPending && (
				<div className="flex gap-4 md:gap-4 justify-between items-center">
					{isPending && !loading && (
						<Button
							onClick={onAcceptRequest}
							className="h-10 justify-center md:w-36 text-md sm:text-lg px-3 mb-1 md:mb-0"
						>
							Accept
						</Button>
					)}
					{isPending && loading && (
						<div className="flex items-center h-12">
							<Loader />
						</div>
					)}
				</div>
			)}
		</div>
	);
};
