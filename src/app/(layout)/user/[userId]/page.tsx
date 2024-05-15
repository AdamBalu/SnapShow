import React from 'react';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import { Profile } from '@/components/profile/profile';
import { getUser } from '@/server-actions/user';

type UserPageProps = {
	params: {
		userId: string;
	};
};

export const generateMetadata = async ({
	params
}: UserPageProps): Promise<Metadata> => {
	const user = await getUser(params.userId);

	return {
		title: user?.username ?? 'User Detail'
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
