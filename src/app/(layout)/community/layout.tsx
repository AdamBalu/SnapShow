import React from 'react';

import { FriendRequestList } from '@/components/community/friend-request-list';

const FriendRequestLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<div className="flex flex-col lg:flex-row gap-10 justify-center">
		<FriendRequestList />
		{children}
	</div>
);

export default FriendRequestLayout;
