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
	<div className="flex justify-center items-center mb-10 ">
		<div className="w-10/12 flex justify-between sticky top-0">
			<GenreFilter genres={genres} onGenreChange={onGenreChange} />
		</div>
	</div>
);
