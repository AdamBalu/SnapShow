'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useFriendList } from '@/hooks/user-list';
import Modal from '@/components/ui/modal';
import { Loader } from '@/components/loader';
import { Avatar } from '@/components/user/avatar';

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
				<div className="avatar-group -space-x-3 rtl:space-x-reverse">
					{previewFriends.map(
						friend =>
							friend.image && (
								<div key={friend.id} className="avatar">
									<div className="w-5">
										<Image
											width={24}
											height={24}
											alt="profile picture"
											className="h-24 w-24 rounded-full object-cover"
											src={friend.image}
										/>
									</div>
								</div>
							)
					)}
				</div>
			</button>

			<Modal
				className="h-96"
				modalId="friend-list-modal"
				title={"User's friends"}
				open={modalOpen}
				close={() => setModalOpen(false)}
			>
				<div className="flex flex-col items-center h-96">
					{isPending && <Loader />}
					<ul className="overflow-scroll flex flex-col gap-2 w-full">
						{data?.map(friend => (
							<li key={friend.id} className="btn h-16 w-full">
								<Link
									className="flex w-full flex-row gap-2 items-center justify-between"
									href={`/user/${friend.id}`}
								>
									<Avatar
										className="size-12 p-0"
										profilePicture={friend.image}
									/>
									<span className="flex-grow text-wrap break-words text-md md:text-xl">
										{friend.username}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</Modal>
		</>
	);
};
