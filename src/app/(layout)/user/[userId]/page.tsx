import React from 'react';
import { notFound } from 'next/navigation';

import { Profile } from '@/components/profile/profile';
import { getUser } from '@/server-actions/user';

type UserPageProps = {
	params: {
		userId: string;
	};
};

const UserPage = async ({ params }: UserPageProps) => {
	const user = await getUser(params.userId);

	if (!user) {
		notFound();
	}

	return (
		<div className="flex flex-col items-center lg:px-32">
			<Profile user={user} />
		</div>
	);
};
export default UserPage;
