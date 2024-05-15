'use client';

import { type Session } from 'next-auth';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { usePostList } from '@/hooks/post-list';
import { type PostData } from '@/types/post-data';

import { LogoLoader } from '../logo-loader';

import { PostCard } from './post-card';

type InfiniteFeedProps = {
	initialPosts: PostData[];
	selectedGenre: string | null;
	session: Session | null;
	genreChanged: boolean;
	onEffect: () => void;
};

export const InfiniteFeed = ({
	initialPosts,
	selectedGenre,
	session,
	genreChanged,
	onEffect
}: InfiniteFeedProps) => {
	const { postsList, hasMore, fetchData } = usePostList(
		initialPosts,
		10 // page size
	);

	useEffect(() => {
		if (genreChanged) {
			if (selectedGenre !== null) {
				fetchData(true, selectedGenre, 1).then(() => null);
			} else {
				fetchData(true, selectedGenre, 1).then(() => null);
			}
			onEffect();
		}
	}, [genreChanged, onEffect, fetchData, selectedGenre]);

	return (
		<div>
			<InfiniteScroll
				dataLength={postsList.length}
				next={async () => await fetchData(false, selectedGenre)}
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
