import React from 'react';

import { UserList } from '@/components/community/user-list';
import { UserSearch } from '@/components/community/user-search';
import FriendsPage from '@/app/(layout)/friends/page';

const Page = () => (
	<div className="mx-2">
		{/*<FriendsPage />*/}

		<UserList searchSubstring="ger" />
	</div>
);
export default Page;
