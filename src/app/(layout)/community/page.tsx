import React from 'react';
import { type Metadata } from 'next';

import { UserList } from '@/components/community/user-list';
import { auth } from '@/auth';

export const metadata: Metadata = {
	title: 'Community'
};

const CommunityPage = async () => {
	const session = await auth();
	const userId = session?.user.id;
	if (!userId) return;

	return <UserList userId={userId} />;
};
export default CommunityPage;
