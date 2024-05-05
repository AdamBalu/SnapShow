'use server';

import React from 'react';

import { auth } from '@/auth';
import { getUsers } from '@/server-actions/users';
import { UserCard } from '@/components/user/user-card';
import { UserSearch } from '@/components/community/user-search';

export const UserList = async ({
	searchSubstring
}: {
	searchSubstring: string;
}) => {
	const session = await auth();
	const signedUserId = session!.user.id;
	const users = await getUsers(signedUserId);

	console.log(users);

	const filteredUsers = users.filter(
		user =>
			user.username?.includes(searchSubstring) ??
			user.name?.includes(searchSubstring)
	);

	return (
		<div>
			<UserSearch />
			<ul className="flex flex-wrap gap-4">
				{filteredUsers.map(user => (
					<li key={user.id} className="h-48 md:w-fit">
						<UserCard
							username={user.username}
							image={user.image}
							userId={user.id}
							isPending={false}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
