import { type UsersFriends } from '@/db/schema/usersFriends';
import { FriendButton } from '@/components/profile/friend-button';
import { FriendsPreview } from '@/components/profile/friends-preview';

type FriendsInfoBanner = {
	userId: string;
	signedUserId: string;
	friendCount: number;
	friendStatus?: UsersFriends;
};

export const FriendsInfoBanner = ({
	signedUserId,
	userId,
	friendCount,
	friendStatus
}: FriendsInfoBanner) => (
	<div className="flex w-full gap-2 justify-center items-center md:justify-start">
		<span>{friendCount} Friends</span>
		<FriendsPreview userId={userId} />

		{userId !== signedUserId && (
			<FriendButton
				signedUserId={signedUserId}
				userId={userId}
				friendStatus={friendStatus}
			/>
		)}
	</div>
);
