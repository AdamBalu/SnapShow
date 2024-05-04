'use client';

import React, {
	type ButtonHTMLAttributes,
	type DetailedHTMLProps,
	useState
} from 'react';
import { CircleX } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/cn';
import { removeFriend } from '@/server-actions/usersFriends';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader';

type FriendRemoveButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	friendId: string;
	username: string | null;
	isPending: boolean;
};

export const FriendRemoveButton = ({
	friendId,
	username,
	isPending,
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
			<button
				onClick={() => {
					if (document) {
						(
							document.getElementById(`modal-${friendId}`) as HTMLFormElement
						).showModal();
					}
				}}
				{...props}
				className={cn(
					'size-auto self-center md:-mt-4 md:-mr-8 md:-mb-6 md:self-end',
					className
				)}
			>
				<CircleX
					className="text-primary size-8 hover:text-primary-shadow"
					strokeWidth={1}
				/>
			</button>
			<dialog id={`modal-${friendId}`} className="modal">
				<div className="modal-box flex flex-col justify-between border border-solid border-primary rounded-3xl bg-zinc-900 h-52">
					<p className="text-center py-4">
						{isPending
							? 'Do you really want to remove this friend request?'
							: `Do you really want to remove ${username} from your friends?`}
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
