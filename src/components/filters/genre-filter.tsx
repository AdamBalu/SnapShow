import { Dropdown } from '@/components/ui/dropdown';
import { type Genres } from '@/db/schema/genres';

type GenreFilterProps = {
	genres: Genres[];
	onGenreChange: (newGenre: string) => void;
};

export const GenreFilter = ({ genres, onGenreChange }: GenreFilterProps) => {
	const dropdownItems = genres.map(genre => ({
		label: genre.name,
		iconSrc: genre.icon,
		callback: onGenreChange
	}));

	return <Dropdown items={dropdownItems} />;
};
