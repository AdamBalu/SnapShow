'use client';

import Image from 'next/image';

type ReactingPeopleProps = {
	reactions: {
		id: string;
		userId: string;
		postId: string;
		userPic: string | null | undefined;
	}[];
};

export const ReactingPeople = ({ reactions }: ReactingPeopleProps) => {
	const max5reactions = reactions.slice(0, 5);
	return (
		<div className="flex">
			{max5reactions.map(
				(reaction, idx) =>
					reaction.userPic && (
						<Image
							className={`w-6 h-6 rounded-badge border border-white relative transform -translate-x-${10 * idx} z-${max5reactions.length - idx}`}
							key={idx}
							src={reaction.userPic}
							width={128}
							height={128}
							alt="profile img"
						/>
					)
			)}
		</div>
	);
};
