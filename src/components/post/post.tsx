'use server';

import Image from 'next/image';

import { type Post as PostType } from '@/db/schema/posts';

import { PostBottomBar } from './post-bottom-bar';
import { PostProfileBadge } from './post-profile-badge';
import { PostReactions } from './post-reactions';
import { PostText } from './post-text';

type PostProps = {
	post?: PostType;
};

export const Post = (props: PostProps) => (
	<div className="bg-zinc-900 rounded-lg m-4 p-4 flex flex-col justify-center">
		<PostProfileBadge
			userId={props.post?.userId}
			eventId="idkyet"
			timestamp={1704010049} // TODO replace with real timestamp
		/>
		<div className=" pb-6">
			<PostText content={props.post?.comment} />
		</div>
		<div className="flex justify-center">
			{props.post?.photo && (
				<Image
					className="rounded-md py-4"
					src={props.post.photo}
					alt="post image content"
					width={400}
					height={250}
				/>
			)}
		</div>
		<PostReactions />
		<PostBottomBar />
	</div>
);
