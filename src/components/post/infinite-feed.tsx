'use client';

import { type Session } from 'next-auth';
import InfiniteScroll from 'react-infinite-scroll-component';

import { usePostList } from '@/hooks/post-list';

import { LogoLoader } from '../logo-loader';

import { PostCard } from './post-card';

type InfiniteFeedProps = {
	initialPosts: PostData[];
	selectedGenre: string | null;
	session: Session | null;
};

export const InfiniteFeed = ({
	initialPosts,
	selectedGenre,
	session
}: InfiniteFeedProps) => {
	const { postsList, hasMore, loading, fetchData } = usePostList(
		initialPosts,
		1 // page size
	);

	return (
		<div>
			<InfiniteScroll
				dataLength={postsList.length}
				next={async () => await fetchData(false, selectedGenre)} // selectedGenre ....
				hasMore={hasMore}
				loader={
					<div className="flex justify-center mt-4">
						<LogoLoader />
					</div>
				}
			>
				<div>
					{postsList ? (
						postsList.map(post => (
							// <div className="bg-blue-700 text-yellow-50 py-96" key={post.id}>
							// 	{`${post.datetime}${post.comment}`}
							// </div>
							<PostCard
								key={post.id}
								photos={post.photos}
								post={post}
								reactions={post.reactions}
								session={session}
							/>
						))
					) : (
						<div>e</div>
					)}
				</div>
			</InfiniteScroll>
		</div>
	);
};
