import React from 'react';
import Image from 'next/image';

import { getUsersFriends } from '@/server-actions/usersFriends';

type FriendsPreviewProps = {
	userId: string;
};

export const FriendsPreview = async ({ userId }: FriendsPreviewProps) => {
	const friends = await getUsersFriends(userId, 4);

	return (
		<div className="avatar-group -space-x-3 rtl:space-x-reverse">
			{friends.map(
				friend =>
					friend.image && (
						<div key={friend.id} className="avatar">
							<div className="w-5">
								<Image
									width={24}
									height={24}
									alt="profile picture"
									className="h-24 w-24 rounded-full object-cover"
									src={friend.image}
								/>
							</div>
						</div>
					)
			)}
		</div>
	);
};
