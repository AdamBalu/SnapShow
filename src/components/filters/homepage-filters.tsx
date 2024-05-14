'use client';

import { type Genres } from '@/db/schema/genres';

import { GenreFilter } from './genre-filter';

type HomepageFiltersProps = {
	genres: Genres[];
	onGenreChange: (newGenre: string) => void;
};

export const HomepageFilters = ({
	genres,
	onGenreChange
}: HomepageFiltersProps) => (
	<div className="mb-10 absolute right-0 z-20">
		<GenreFilter genres={genres} onGenreChange={onGenreChange} />
	</div>
);
