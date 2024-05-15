import { SortAsc, SortDesc, ListFilter } from 'lucide-react';

import {
	type Sort,
	type SortType,
	type EventFilterSortColumn
} from '@/types/event-data';

import { Button } from '../ui/button';

type SortButtonProps = {
	label: string;
	name: EventFilterSortColumn;
	sortType: SortType;
	sortColumn: EventFilterSortColumn;
	setSort: (sort: Sort) => void;
	onSort: (activeFiler: SortType) => void;
	disabled: boolean;
};

export const SortButton = ({
	label,
	name,
	sortType,
	sortColumn,
	disabled,
	setSort,
	onSort
}: SortButtonProps) => {
	const changeSortState = () => {
		let direction: SortType = 'up';
		if (name === sortColumn) {
			if (sortType === null) {
				direction = 'up';
			} else if (sortType === 'up') {
				direction = 'down';
			} else {
				direction = null;
			}
		} else {
			setSort({ sortColumn: name, sortType });
		}
		setSort({ sortColumn, sortType: direction });
		onSort(direction);
	};

	return (
		<Button
			disabled={disabled}
			onClick={() => changeSortState()}
			className="bg-zinc-900 text-primary hover:bg-zinc-800 disabled:bg-zinc-700 text-sm p-3"
		>
			{label}
			{sortType && name === sortColumn ? (
				sortType === 'up' ? (
					<SortAsc />
				) : (
					<SortDesc />
				)
			) : (
				<ListFilter />
			)}
		</Button>
	);
};
