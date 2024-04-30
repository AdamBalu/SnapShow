import React from 'react';

import { auth } from '@/auth';
import { getCountOfUsersFriends } from '@/server-actions/user';
import { Avatar } from '@/components/profile/avatar';
import { Button } from '@/components/ui/button';

export const Profile = async () => {
	const session = await auth();

	if (session?.user?.id === undefined) {
		return;
	}

	const friendCount = await getCountOfUsersFriends(session.user.id);

	return (
		<div className="mt-32 lg:mx-32">
			<div className="font-sarpanch font-extrabold bg-zinc-900 bg-opacity-70 rounded-2xl border-2 border-primary p-8 sm:p-8 text-white flex flex-col gap-10 items-center">
				<div className="flex gap-10">
					<Avatar profilePicture={session.user.image} />
					<div>
						<h1 className="text-5xl">{session.user.username}</h1>
						<div className="flex">
							<span>{friendCount} Friends</span>
							<Button className="uppercase">Add friend</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
