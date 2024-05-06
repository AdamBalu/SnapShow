'use client';

import React, {
	type ButtonHTMLAttributes,
	type DetailedHTMLProps,
	useEffect,
	useState
} from 'react';
import { Ban, Mail, UserCheck, UserMinus, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

import { type UsersFriends } from '@/db/schema/usersFriends';
import { removeFriend, sendFriendRequest } from '@/server-actions/usersFriends';
import { ControlButton } from '@/components/ui/control-button';
import { cn } from '@/lib/cn';

type FriendButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	userId: string;
	friendStatus: UsersFriends | null | undefined;
};

type FriendshipState = 'add' | 'pending' | 'friends';

export const FriendButton = ({
	userId,
	friendStatus,
	className,
	...props
}: FriendButtonProps) => {
	const [friendshipState, setFriendshipState] = useState<FriendshipState>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setFriendshipState(
			friendStatus ? (friendStatus.isPending ? 'pending' : 'friends') : 'add'
		);
	}, [friendStatus]);

	const onFriendRequest = async () => {
		setLoading(true);
		await sendFriendRequest(userId)
			.then(_ => {
				setFriendshipState('pending');
				setLoading(false);
			})
			.catch(err => {
				toast.error(err.message);
			});
	};

	const onFriendRemove = async () => {
		setLoading(true);
		await removeFriend(userId)
			.then(_ => {
				setFriendshipState('add');
				setLoading(false);
			})
			.catch(err => {
				toast.error(err.message);
			});
	};

	return (
		<div className="flex flex-col md:flex-row gap-4">
			{friendshipState === 'add' && (
				<ControlButton
					{...props}
					onClick={onFriendRequest}
					className={cn(
						'flex text-black justify-center rounded-2xl font-sarpanch border-0 btn btn-xs bg-primary py-0 h-3 px-4 text-xs sm:text-xs w-36 hover:bg-primary',
						className
					)}
				>
					{loading ? (
						<span className="loading loading-spinner h-3 w-3" />
					) : (
						<div className="flex gap-2 items-center">
							<UserPlus className="w-4 h-4" />
							<span>Add friend</span>
						</div>
					)}
				</ControlButton>
			)}
			{friendshipState !== 'add' && (
				<div className="dropdown dropdown-end">
					<div
						// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
						tabIndex={0}
					>
						<ControlButton
							className={cn(
								'flex text-black justify-center rounded-2xl font-sarpanch border-0 btn btn-xs bg-primary py-0 h-3 px-4 text-xs sm:text-xs w-36 hover:bg-primary',
								className
							)}
						>
							{loading ? (
								<span className="loading loading-spinner h-3 w-3" />
							) : (
								<div className="flex gap-2 items-center">
									{friendshipState === 'pending' && (
										<>
											<Mail className="w-4 h-4" />
											<span>Request sent</span>
										</>
									)}
									{friendshipState === 'friends' && (
										<>
											<UserCheck className="w-4 h-4" />
											<span>Friends</span>
										</>
									)}
								</div>
							)}
						</ControlButton>
					</div>
					<div
						// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
						tabIndex={0}
						className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44"
					>
						<button
							onClick={onFriendRemove}
							className="text-primary btn btn-sm flex gap-2 items-center"
						>
							{friendshipState === 'pending' && (
								<>
									<Ban className="w-4 h-4" />
									<span>Cancel request</span>
								</>
							)}
							{friendshipState === 'friends' && (
								<>
									<UserMinus className="w-4 h-4" />
									<span>Remove friend</span>
								</>
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
