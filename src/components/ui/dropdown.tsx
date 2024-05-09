'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { LucideChevronDown } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import Loading from '@/app/(layout)/edit-details/loading';

export type DropdownItem = {
	label: string;
	iconSrc: string;
	action?: () => Promise<void>;
};

type DropdownProps = {
	items: DropdownItem[];
};

export const Dropdown = ({ items }: DropdownProps) => {
	const [selectedItem, setSelectedItem] = useState<DropdownItem>(
		getSelectedItem(items)
	);

	const [loading, setLoading] = useState(false);

	const handleItemClick = (item: DropdownItem) => {
		setLoading(true);
		setSelectedItem(item);
		if (item.action) {
			item
				.action()
				.then(_ => setLoading(false))
				.catch(error => {
					toast.error(error);
				});
		} else {
			setLoading(false);
		}
	};

	const handleFormSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		item: DropdownItem
	) => {
		e.preventDefault(); // Prevent form submission
		handleItemClick(item);
	};

	return (
		<div>
			<div className="dropdown">
				<Button
					// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
					tabIndex={0}
					role="presentation"
					className="btn uppercase px-2 sm:px-6 text-xs sm:text-xl btn-ghost bg-zinc-900 text-primary hover:bg-zinc-800 h-8 sm:h-16"
				>
					<div className="flex gap-4 items-center">
						{loading ? (
							<Loading />
						) : (
							<Image
								width={24}
								height={24}
								alt={selectedItem.label}
								src={selectedItem.iconSrc}
							/>
						)}
						{selectedItem.label}
						<LucideChevronDown />
					</div>
				</Button>

				<ul
					// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
					tabIndex={0}
					role="presentation"
					className={`menu menu-sm w-full
					 dropdown-content bg-zinc-900 mt-3 z-[1] p-2 shadow rounded-box`}
				>
					{items.map((item: DropdownItem) => (
						<li key={item.label}>
							<form
								className="btn btn-ghost flex flex-col w-full p-0"
								onSubmit={e => handleFormSubmit(e, item)}
							>
								<button className="uppercase w-full h-full px-2 font-extrabold text-xs sm:text-xl">
									<div className="flex items-center justify-between">
										<Image
											src={item.iconSrc}
											alt={item.label}
											width={24}
											height={24}
										/>
										{item.label}
									</div>
								</button>
							</form>
						</li>
					))}
				</ul>
			</div>
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
