'use client';

import { type Session } from 'next-auth';
import { useState } from 'react';

import { type Genres } from '@/db/schema/genres';
import { type UserEvent } from '@/types/event-data';

import { HomepageFilters } from '../filters/homepage-filters';

import { InfiniteFeed } from './infinite-feed';
import { NewPost } from './new-post-form/new-post';

type HomepageProps = {
	initialPosts: PostData[];
	session: Session | null;
	events: UserEvent[] | undefined;
	genres: Genres[];
};

export const Homepage = ({
	initialPosts,
	session,
	events,
	genres
}: HomepageProps) => {
	const onGenreChange = (newGenre: string) => {
		console.log(newGenre);
		if (newGenre.toLowerCase() === 'all genres') {
			setSelectedGenre(null);
		} else {
			setSelectedGenre(newGenre);
		}
	};

	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

	return (
		<div>
			<p>{selectedGenre}</p>
			<div className="flex justify-between h-20 mb-10">
				<HomepageFilters genres={genres} onGenreChange={onGenreChange} />
				{session?.user && events && (
					<NewPost
						userId={session.user.id}
						profilePicture={session.user.image}
						events={events}
					/>
				)}
			</div>
			<div className="flex justify-center">
				<InfiniteFeed
					initialPosts={initialPosts}
					selectedGenre={selectedGenre}
					session={session}
				/>
			</div>
		</div>
	);
};
