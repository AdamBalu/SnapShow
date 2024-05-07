'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Avatar } from '@/components/user/avatar';
import { acceptFriendRequest } from '@/server-actions/usersFriends';
import { ControlButton } from '@/components/ui/control-button';
import { FriendRequestDenyButton } from '@/components/friends/friend-request-deny-button';
import { LogoLoader } from '@/components/logo-loader';

type FriendCardProps = {
	username: string | null;
	image: string | null;
	friendId: string;
};

export const FriendRequestCard = ({
	image,
	username,
	friendId
}: FriendCardProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const onAcceptRequest = async () => {
		setIsLoading(true);
		await acceptFriendRequest(friendId)
			.catch(err => {
				toast.error(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className="px-3 py-2 bg-opacity-70 justify-between font-sarpanch flex-grow gap-3 items-center font-extrabold text-white flex flex-row border border-solid border-primary rounded-3xl bg-zinc-900">
			<Link
				className="flex flex-row gap-2 items-center"
				href={`/user/${friendId}`}
			>
				<Avatar className="size-12 xl:size-16 p-1" profilePicture={image} />
				<span className="text-sm md:text-md break-words text-wrap">
					{username}
				</span>
			</Link>
			{isLoading && (
				<div className="flex items-center h-12">
					<LogoLoader />
				</div>
			)}
			{!isLoading && (
				<div className="flex gap-2 md:gap-4 justify-between items-center">
					<ControlButton onClick={onAcceptRequest} className="md:h-10 w-16">
						Accept
					</ControlButton>
					<FriendRequestDenyButton
						className="md:h-10 w-16 bg-zinc-900 hover:bg-zinc-900 text-primary border border-primary hover:border-primary"
						friendId={friendId}
					/>
				</div>
			)}
		</div>
	);
};
