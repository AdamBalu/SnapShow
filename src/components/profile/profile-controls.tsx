import Link from 'next/link';
import { Pencil } from 'lucide-react';
import React from 'react';

import { type UsersFriends } from '@/db/schema/usersFriends';
import { FriendButton } from '@/components/profile/friend-button';
import { FriendsPreview } from '@/components/profile/friends-preview';
import { ControlButton } from '@/components/ui/control-button';

type FriendsInfoBanner = {
	userId: string;
	signedUserId: string;
	friendCount: number;
	friendStatus?: UsersFriends;
};

export const ProfileControls = ({
	signedUserId,
	userId,
	friendCount,
	friendStatus
}: FriendsInfoBanner) => (
	<div className="flex w-full gap-2 justify-center items-center md:justify-start">
		<span>{friendCount} Friends</span>
		<FriendsPreview userId={userId} />

		{userId !== signedUserId ? (
			<FriendButton userId={userId} friendStatus={friendStatus} />
		) : (
			<Link href="/edit-details">
				<ControlButton>
					<div className="flex gap-2 items-center">
						<Pencil className="w-3.5 h-3.5" />
						<span>Edit profile</span>
					</div>
				</ControlButton>
			</Link>
		)}
	</div>
);
