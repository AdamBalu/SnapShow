import React from 'react';

import { UserList } from '@/components/community/user-list';
import { auth } from '@/auth';

const CommunityPage = async () => {
	const session = await auth();
	const userId = session?.user.id;
	if (!userId) return;

	return <UserList userId={userId} />;
};
export default CommunityPage;
