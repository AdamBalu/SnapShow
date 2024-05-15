'use client';

import { type Session } from 'next-auth';
import InfiniteScroll from 'react-infinite-scroll-component';

import { usePostListById } from '@/hooks/post-list-by-id';
import { type PostData } from '@/types/post-data';

import { LogoLoader } from '../logo-loader';

import { PostCard } from './post-card';

type InfiniteFeedProps = {
	initialPosts: PostData[];
	session: Session | null;
	eventId?: string;
	userId?: string;
};

export const InfiniteFeedById = ({
	initialPosts,
	session,
	eventId,
	userId
}: InfiniteFeedProps) => {
	const { postsList, hasMore, fetchData } = usePostListById(
		initialPosts,
		10, // page size
		eventId ?? undefined,
		userId ?? undefined
	);

	return (
		<div>
			<InfiniteScroll
				dataLength={postsList.length}
				next={async () => await fetchData()}
				hasMore={hasMore}
				loader={
					<div className="flex justify-center mt-4">
						{postsList.length !== 0 && <LogoLoader />}
					</div>
				}
			>
				<div>
					{postsList && postsList.length !== 0 ? (
						postsList.map(post => (
							<PostCard
								key={post.id}
								photos={post.photos}
								post={post}
								reactions={post.reactions}
								session={session}
							/>
						))
					) : (
						<div className="flex justify-center mt-4">
							{postsList.length !== 0 ? (
								<LogoLoader />
							) : (
								<div>There are no posts yet, be the first to create one!</div>
							)}
						</div>
					)}
				</div>
			</InfiniteScroll>
		</div>
	);
};
