'use client';

import React, {
	type ButtonHTMLAttributes,
	type DetailedHTMLProps,
	useState
} from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

import { cn } from '@/lib/cn';
import { removeFriend } from '@/server-actions/usersFriends';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader';
import { ControlButton } from '@/components/ui/control-button';
import Modal from '@/components/ui/modal';

type FriendRemoveButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	friendId: string;
};

export const FriendRequestDenyButton = ({
	friendId,
	className,
	...props
}: FriendRemoveButtonProps) => {
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const queryClient = useQueryClient();

	const onFriendRemove = async () => {
		setLoading(true);
		await removeFriend(friendId)
			.then(_ => {
				queryClient.invalidateQueries({ queryKey: ['users'] });
			})
			.catch(err => {
				toast.error(err.message);
			})
			.finally(() => {
				setModalOpen(false);
				setLoading(false);
			});
	};

	return (
		<>
			<ControlButton
				onClick={() => setModalOpen(true)}
				{...props}
				className={cn(className)}
			>
				Reject
			</ControlButton>
			<Modal
				title="Do you really want to remove this friend request?"
				modalId={`modal-${friendId}`}
				open={modalOpen}
				close={() => setModalOpen(false)}
			>
				{!loading && (
					<div className="modal-action mt-10 flex gap-4">
						<Button onClick={onFriendRemove} className="">
							Yes
						</Button>
						<form method="dialog">
							<Button onClick={() => setModalOpen(false)} className="">
								No
							</Button>
						</form>
					</div>
				)}
				{loading && (
					<div className="flex w-full justify-center">
						<Loader />
					</div>
				)}
			</Modal>
		</>
	);
};
