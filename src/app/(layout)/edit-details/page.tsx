import React from 'react';
import { type Metadata } from 'next';

import { UserForm } from '@/components/user-form/user-form';
import { auth } from '@/auth';
import { getAllGenres, getUsersFavoriteGenres } from '@/server-actions/genres';
import { getUser } from '@/server-actions/user';

export const metadata: Metadata = {
	title: 'Edit profile'
};

const NewUserPage = async () => {
	const session = await auth();
	if (!session?.user) return;

	const genres = await getAllGenres();
	const usersFavoriteGenres = await getUsersFavoriteGenres(session.user.id);
	const user = await getUser(session.user.id);

	return (
		<div className="flex flex-grow justify-center items-center">
			<UserForm
				username={user?.username}
				bio={user?.bio}
				userImage={session?.user?.image}
				heading="Edit my details"
				genres={genres}
				usersGenres={usersFavoriteGenres}
			/>
		</div>
	);
};

export default NewUserPage;
