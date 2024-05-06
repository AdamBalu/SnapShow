import React from 'react';
import Image from 'next/image';

import { getUsers } from '@/server-actions/user';

export const FriendsPreview = async () => {
	const friends = await getUsers(1, 4, 'friends', undefined);

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
