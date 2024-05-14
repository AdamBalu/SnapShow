import { useContext } from 'react';

import { type EventFilterSortColumn } from '@/types/event-data';
import { EasterEggContext } from '@/hooks/easter-egg-context';

import { SortButton, type SortType } from './sort-button';

type EventSortProps = {
	sortType: SortType;
	activeFilter: EventFilterSortColumn;
	setActiveFilter: (column: EventFilterSortColumn) => void;
	setSortType: (sortType: SortType) => void;
	sortData: (sortColumn: EventFilterSortColumn, direction: SortType) => void;
	loading: boolean;
};

export const EventSort = ({
	sortType,
	activeFilter,
	setActiveFilter,
	setSortType,
	sortData,
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
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				setSortType={setSortType}
				onSort={onCountrySort}
				disabled={loading}
			/>
			<SortButton
				label={easterEgg?.isOn ? 'ONCE' : 'Name'}
				name="name"
				sortType={sortType}
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				setSortType={setSortType}
				onSort={onNameSort}
				disabled={loading}
			/>
			<SortButton
				label={easterEgg?.isOn ? 'TOLD ME' : 'Date'}
				name="date"
				sortType={sortType}
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				setSortType={setSortType}
				onSort={onDateTimeSort}
				disabled={loading}
			/>
		</div>
	);
};
