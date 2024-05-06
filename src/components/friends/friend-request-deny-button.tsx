'use client';

import React, {
	type ButtonHTMLAttributes,
	type DetailedHTMLProps,
	useState
} from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/cn';
import { removeFriend } from '@/server-actions/usersFriends';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader';
import { ControlButton } from '@/components/ui/control-button';

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

	const onFriendRemove = async () => {
		setLoading(true);
		await removeFriend(friendId)
			.catch(err => {
				toast.error(err.message);
			})
			.finally(() => {
				if (document) {
					(
						document.getElementById(`modal-${friendId}`) as HTMLFormElement
					).close();
				}
				setLoading(false);
			});
	};

	return (
		<>
			<ControlButton
				onClick={() => {
					if (document) {
						(
							document.getElementById(`modal-${friendId}`) as HTMLFormElement
						).showModal();
					}
				}}
				{...props}
				className={cn(className)}
			>
				Reject
			</ControlButton>
			<dialog id={`modal-${friendId}`} className="modal">
				<div className="modal-box flex flex-col justify-between border border-solid border-primary rounded-3xl bg-zinc-900 h-52">
					<p className="text-center py-4">
						Do you really want to remove this friend request?
					</p>
					{!loading && (
						<div className="modal-action mt-0 flex gap-4">
							<Button onClick={onFriendRemove} className="">
								Yes
							</Button>
							<form method="dialog">
								<Button className="">No</Button>
							</form>
						</div>
					)}
					{loading && (
						<div className="flex w-full justify-center">
							<Loader />
						</div>
					)}
				</div>
			</dialog>
		</>
	);
};
