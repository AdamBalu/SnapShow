import { SortAsc, SortDesc, ListFilter } from 'lucide-react';

import { type EventFilterSortColumn } from '@/types/event-data';

import { Button } from '../ui/button';

type SortButtonProps = {
	label: string;
	name: EventFilterSortColumn;
	sortType: SortType;
	activeFilter: EventFilterSortColumn;
	setActiveFilter: (activeFiler: EventFilterSortColumn) => void;
	setSortType: (state: SortType) => void;
	onSort: (activeFiler: SortType) => void;
	disabled: boolean;
};

export type SortType = 'up' | 'down' | null;

export const SortButton = ({
	label,
	name,
	sortType,
	activeFilter,
	disabled,
	setSortType,
	setActiveFilter,
	onSort
}: SortButtonProps) => {
	const changeSortState = () => {
		let direction: SortType = 'up';
		if (name === activeFilter) {
			if (sortType === null) {
				direction = 'up';
			} else if (sortType === 'up') {
				direction = 'down';
			} else {
				direction = null;
			}
		} else {
			setActiveFilter(name);
		}
		setSortType(direction);
		onSort(direction);
	};

	return (
		<Button
			disabled={disabled}
			onClick={() => changeSortState()}
			className="bg-zinc-900 text-primary hover:bg-zinc-800 disabled:bg-zinc-700"
		>
			{label}
			{sortType && name === activeFilter ? (
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
