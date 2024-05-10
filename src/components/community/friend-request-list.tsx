import React from 'react';

import { getFriendRequests } from '@/server-actions/usersFriends';
import { FriendRequestCard } from '@/components/friends/friend-request-card';

export const FriendRequestList = async () => {
	const friendRequests = await getFriendRequests();

	if (friendRequests.length === 0) return;

	return (
		<div className="flex flex-col gap-4 lg:w-1/3">
			<h2 className="font-sarpanch text-xl md:text-3xl text-white font-extrabold">
				Friend requests
			</h2>
			<ul className="w-full flex flex-col gap-4">
				{friendRequests.map(req => (
					<li key={req.id} className="flex-grow">
						<FriendRequestCard
							username={req.username}
							image={req.image}
							friendId={req.id}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
