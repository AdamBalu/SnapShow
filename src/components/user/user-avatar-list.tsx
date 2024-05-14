import React from 'react';
import Image from 'next/image';

type UserAvatarPreview = {
	id: string;
	image: string | null | undefined;
};

type UserAvatarListProps = {
	users: UserAvatarPreview[];
};

export const UserAvatarList = ({ users }: UserAvatarListProps) => (
	<div className="avatar-group -space-x-3 rtl:space-x-reverse">
		{users.map(
			user =>
				user.image && (
					<div key={user.id} className="avatar">
						<div className="w-5">
							<Image
								width={24}
								height={24}
								alt="profile picture"
								className="h-24 w-24 rounded-full object-cover"
								src={user.image}
							/>
						</div>
					</div>
				)
		)}
	</div>
);
