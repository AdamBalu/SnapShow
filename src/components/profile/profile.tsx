import React from 'react';

import { auth } from '@/auth';
import { Avatar } from '@/components/user/avatar';
import { getUsersFavoriteGenres } from '@/server-actions/genres';
import { GenreItem } from '@/components/profile/genre-item';
import { FriendsInfoBanner } from '@/components/profile/friends-info-banner';
import {
	getCountOfUsersFriends,
	getFriendsStatus
} from '@/server-actions/usersFriends';
import { type User } from '@/db/schema/users';

type ProfileProps = {
	user: User;
};

export const Profile = async ({ user }: ProfileProps) => {
	const session = await auth();
	const signedUserId = session!.user.id;
	const usersGenres = await getUsersFavoriteGenres(user.id);
	const friendCount = await getCountOfUsersFriends(user.id);
	const friendsStatus = await getFriendsStatus(user.id, signedUserId);

	return (
		<div className="flex flex-col items-center mx-2 xl:w-1/2">
			<div className="py-8 p-8 md:px-16 mt-16 font-extrabold bg-zinc-900 bg-opacity-70 rounded-2xl border-2 border-primary text-white flex flex-col gap-10 items-center">
				<div className="font-sarpanch -mt-24 items-center flex flex-col gap-4 md:mt-0 md:flex-row md:gap-20 md:w-full md:justify-evenly">
					<Avatar
						className="md:-mt-28 p-1.5 md:p-2 size-32 md:size-48"
						profilePicture={user.image}
					/>
					<div className="flex flex-col gap-4 items-center md:items-start flex-grow">
						<h1 className="text-3xl md:text-4xl text-ellipsis overflow-hidden max-w-96">
							{user.username}
						</h1>
						<FriendsInfoBanner
							friendCount={friendCount}
							friendStatus={friendsStatus}
							signedUserId={signedUserId}
							userId={user.id}
						/>
					</div>
				</div>
				<div className="flex flex-col items-start gap-10 w-full">
					<div className="flex flex-col gap-3">
						<span className="font-sarpanch">Bio</span>
						<p className="text-sm md:text-md text-justify">{user?.bio}</p>
					</div>
					<div className="flex flex-col gap-3">
						<span className="font-sarpanch">Favorite genres</span>
						<ul className="flex gap-5 flex-wrap justify-evenly md:justify-start">
							{usersGenres.map(genre => (
								<GenreItem key={genre.id} {...genre} />
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
