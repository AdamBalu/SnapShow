'use server';

import { GenreFilter } from './genre-filter';
import { LocalityFilter } from './locality-filter';

export const HomepageFilters = async () => (
	<div className="flex justify-center items-center mb-10 ">
		<div className="w-10/12 flex justify-between sticky top-0">
			<LocalityFilter />
			<GenreFilter />
		</div>
	</div>
);
