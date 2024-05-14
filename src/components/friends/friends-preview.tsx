'use client';

import React, { useState } from 'react';

import { useFriendList } from '@/hooks/user-list';
import Modal from '@/components/ui/modal';
import { Loader } from '@/components/loader';
import { UserAvatarList } from '@/components/user/user-avatar-list';
import { ModalUserList } from '@/components/user/modal-user-list';

type Friend = {
	id: string;
	username: string | null | undefined;
	image: string | null | undefined;
};

type FriendsPreviewProps = {
	userId: string;
	previewFriends: Friend[];
};

export const FriendsPreview = ({
	userId,
	previewFriends
}: FriendsPreviewProps) => {
	const { data, isPending, refetch } = useFriendList(userId);
	const [modalOpen, setModalOpen] = useState(false);

	const onModalOpen = async () => {
		setModalOpen(true);
		await refetch();
	};

	return (
		<>
			<button onClick={onModalOpen}>
				<UserAvatarList users={previewFriends} />
			</button>

			<Modal
				className="h-96"
				modalId="friend-list-modal"
				title="Friends"
				open={modalOpen}
				close={() => setModalOpen(false)}
			>
				<div className="scrollbar-thin flex flex-col items-center h-96 overflow-y-scroll">
					{isPending && <Loader />}
					<ModalUserList users={data} />
				</div>
			</Modal>
		</>
	);
};
