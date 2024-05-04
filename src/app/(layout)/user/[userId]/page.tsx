import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { Profile } from '@/components/profile/profile';
import { Loader } from '@/components/loader';
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
		<div className="flex flex-col items-center">
			<Suspense fallback={<Loader />}>
				<Profile user={user} />
			</Suspense>
		</div>
	);
};
export default UserPage;
