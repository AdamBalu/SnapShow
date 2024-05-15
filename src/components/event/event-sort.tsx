import { useContext } from 'react';

import { type SortType, type EventFilterSortColumn } from '@/types/event-data';
import { EasterEggContext } from '@/hooks/easter-egg-context';

import { SortButton } from './sort-button';

type Sort = {
	sortType: SortType;
	sortColumn: EventFilterSortColumn;
};

type EventSortProps = {
	sortType: SortType;
	sortColumn: EventFilterSortColumn;
	setSort: (sort: Sort) => void;
	sortData: (sortColumn: EventFilterSortColumn, direction: SortType) => void;
	loading: boolean;
};

export const EventSort = ({
	sortColumn,
	sortType,
	sortData,
	setSort,
	loading
}: EventSortProps) => {
	const easterEgg = useContext(EasterEggContext);

	const onCountrySort = (direction: SortType) => {
		if (!loading) {
			const sortColumn = direction ? 'country' : null;
			sortData(sortColumn, direction);
		}
	};

	const onNameSort = (direction: SortType) => {
		if (!loading) {
			const sortColumn = direction ? 'name' : null;
			sortData(sortColumn, direction);
		}
	};

	const onDateTimeSort = (direction: SortType) => {
		if (!loading) {
			const sortColumn = direction ? 'date' : null;
			sortData(sortColumn, direction);
		}
	};

	return (
		<div className="flex gap-x-4 mb-5 ml-2">
			<SortButton
				label={easterEgg?.isOn ? 'SOMEBODY' : 'Country'}
				name="country"
				sortType={sortType}
				sortColumn={sortColumn}
				setSort={setSort}
				onSort={onCountrySort}
				disabled={loading}
			/>
			<SortButton
				label={easterEgg?.isOn ? 'ONCE' : 'Name'}
				name="name"
				sortType={sortType}
				sortColumn={sortColumn}
				setSort={setSort}
				onSort={onNameSort}
				disabled={loading}
			/>
			<SortButton
				label={easterEgg?.isOn ? 'TOLD ME' : 'Date'}
				name="date"
				sortType={sortType}
				sortColumn={sortColumn}
				setSort={setSort}
				onSort={onDateTimeSort}
				disabled={loading}
			/>
		</div>
	);
};
