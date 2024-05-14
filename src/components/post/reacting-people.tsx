'use client';

import React, { useState } from 'react';

import { useReactionsList } from '@/hooks/user-list';
import Modal from '@/components/ui/modal';
import { Loader } from '@/components/loader';
import { UserAvatarList } from '@/components/user/user-avatar-list';
import { ModalUserList } from '@/components/user/modal-user-list';

type ReactingPeopleProps = {
	postId: string;
	reactions: {
		id: string;
		userId: string;
		userPic: string | null | undefined;
	}[];
};

export const ReactingPeople = ({ postId, reactions }: ReactingPeopleProps) => {
	const { data, isPending, refetch } = useReactionsList(postId);
	const [modalOpen, setModalOpen] = useState(false);
	const max5reactions = reactions.slice(0, 5);

	const onModalOpen = async () => {
		setModalOpen(true);
		await refetch();
	};

	return (
		<>
			<button onClick={onModalOpen}>
				<UserAvatarList
					users={max5reactions.map(reaction => ({
						image: reaction.userPic,
						...reaction
					}))}
				/>
			</button>

			<Modal
				className="h-96"
				modalId={`post-${postId}-modal`}
				title="Likes"
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
