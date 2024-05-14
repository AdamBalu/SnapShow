import { LucideChevronDown } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { toast } from 'sonner';

import Loading from '@/app/(layout)/edit-details/loading';
import { Button } from '@/components/ui/button';
import { DropdownContext } from '@/hooks/dropdown-context';

export type DropdownItem = {
	label: string;
	iconSrc: string;
	action?: () => Promise<void>;
	callback?: (text: string) => void;
};

type DropdownProps = {
	items: DropdownItem[];
};

export const Dropdown = ({ items }: DropdownProps) => {
	const [selectedItem, setSelectedItem] = useState<DropdownItem>(
		getSelectedItem(items)
	);

	const dropdown = useContext(DropdownContext);

	const [loading, setLoading] = useState(false);

	const handleItemClick = (item: DropdownItem) => {
		setLoading(true);
		setSelectedItem(item);

		// If an action is defined, execute it synchronously
		if (item.action) {
			item
				.action()
				.then(() => setLoading(false))
				.catch(error => {
					toast.error(error);
					setLoading(false);
				});
		}
		// If a callback is defined, call it synchronously
		else if (item.callback) {
			item.callback(item.label);
			setLoading(false);
		}
		// If neither action nor callback is defined, just set loading to false
		else {
			setLoading(false);
		}
	};

	const handleFormSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		item: DropdownItem
	) => {
		e.preventDefault();
		handleItemClick(item);
		dropdown?.toggleEvent();
	};

	console.log(dropdown);

	return (
		<div className="flex flex-col items-end justify-end">
			<Button
				onClick={() => dropdown?.toggleEvent()}
				className="btn uppercase px-2 sm:px-6 text-xs sm:text-xl btn-ghost bg-zinc-900 text-primary hover:bg-zinc-800 h-8 sm:h-16"
			>
				<div className="flex gap-4 items-center">
					{loading ? (
						<Loading />
					) : selectedItem.iconSrc !== '' ? (
						<Image
							width={24}
							height={24}
							alt={selectedItem.label}
							src={selectedItem.iconSrc}
						/>
					) : null}
					{selectedItem.label}
					<LucideChevronDown />
				</div>
			</Button>

			<ul
				className={`menu menu-sm w-full h-64 overflow-y-scroll z-50
					 dropdown-content bg-zinc-900 mt-3 p-2 shadow rounded-box grid grid-cols-1 ${dropdown?.isExpanded ? 'block' : 'hidden'}`}
			>
				{items.map((item: DropdownItem) => (
					<li key={item.label}>
						<form
							className="btn btn-ghost flex flex-row p-0"
							onSubmit={e => handleFormSubmit(e, item)}
						>
							<button className="uppercase w-full h-full px-2 font-extrabold text-xs sm:text-lg">
								<div className="flex items-center justify-between">
									{item.iconSrc !== '' ? (
										<Image
											src={item.iconSrc}
											alt={item.label}
											width={24}
											height={24}
										/>
									) : (
										<div />
									)}
									{item.label}
								</div>
							</button>
						</form>
					</li>
				))}
			</ul>
		</div>
	);
};

const getSelectedItem = (items: DropdownItem[]): DropdownItem =>
	items.length > 0
		? items[0]
		: {
				label: 'Select',
				iconSrc: '/static/home.svg'
			};
