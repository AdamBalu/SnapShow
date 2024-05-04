import React from 'react';

import {
	getFriendRequests,
	getUsersFriends
} from '@/server-actions/usersFriends';
import { auth } from '@/auth';
import { FriendCard } from '@/components/user/friend-card';

const FriendsPage = async () => {
	const session = await auth();
	const signedUserId = session!.user.id;
	const friendRequests = await getFriendRequests();
	const friends = await getUsersFriends(signedUserId);

	return (
		<div className="mx-2 md:mx-32 flex flex-col gap-8 items-center md:items-start">
			{friendRequests.length > 0 && (
				<>
					<h2 className="font-sarpanch text-xl md:text-3xl text-white font-extrabold">
						Friend requests
					</h2>
					<ul className="w-full flex flex-row flex-wrap gap-6 justify-start">
						{friendRequests.map(req => (
							<li key={req.id} className="w-full md:w-fit">
								<FriendCard
									username={req.username}
									image={req.image}
									friendId={req.id}
									isPending
								/>
							</li>
						))}
					</ul>
				</>
			)}
			<h1 className="font-sarpanch text-xl md:text-3xl text-white font-extrabold">
				My friends
			</h1>
			<ul className="w-full flex flex-row flex-wrap gap-6 justify-start">
				{friends.map(friend => (
					<li key={friend.id} className="w-full md:w-fit">
						<FriendCard
							username={friend.username}
							image={friend.image}
							friendId={friend.id}
							isPending={false}
						/>
					</li>
				))}
			</ul>
			{friends.length === 0 && (
				<span className="text-white -mt-12">
					You don&apos;t have any friends yet :(
				</span>
			)}
		</div>
	);
};

export default FriendsPage;
