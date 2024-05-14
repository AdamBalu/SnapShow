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
		if (newGenre.toLowerCase() === 'all genres') {
			setSelectedGenre(null);
		} else {
			setSelectedGenre(newGenre);
		}
		setGenreChanged(true);
	};

	const onEffect = () => {
		setGenreChanged(false);
	};

	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
	// const [initPosts, setInitPosts] = useState(initialPosts);
	const [genreChanged, setGenreChanged] = useState(false);

	return (
		<div>
			<div className="flex justify-between h-20 mb-10 w-[90vw]">
				{session?.user && events && (
					<NewPost
						userId={session.user.id}
						profilePicture={session.user.image}
						events={events}
					/>
				)}
				<HomepageFilters genres={genres} onGenreChange={onGenreChange} />
			</div>
			<div className="flex justify-center">
				<InfiniteFeed
					initialPosts={initialPosts}
					selectedGenre={selectedGenre}
					session={session}
					genreChanged={genreChanged}
					onEffect={onEffect}
				/>
			</div>
		</div>
	);
};
