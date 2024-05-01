import React, { Suspense } from 'react';

import { Profile } from '@/components/profile/profile';
import { Loader } from '@/components/loader';

type UserPageProps = {
	params: {
		userId: string;
	};
};

const UserPage = async ({ params }: UserPageProps) => (
	<div className="flex flex-col items-center">
		<Suspense fallback={<Loader />}>
			<Profile userId={params.userId} />
		</Suspense>
	</div>
);
export default UserPage;
