'use server';

import Image from 'next/image';
import React from 'react';
import { DropdownItem } from './dropdown';

type DropdownFormProps = {
	item: DropdownItem;
	action: any;
	setItem: (item: DropdownItem) => void;
};

export const DropdownForm = async ({
	item,
	action,
	setItem
}: DropdownFormProps) => (
	<form className="btn btn-ghost flex flex-col" action={action}>
		<div className="flex w-full items-center justify-between">
			<Image src={item.iconSrc} alt={item.label} width={24} height={24} />
			<button className="uppercase font-extrabold text-xl">{item.label}</button>
		</div>
	</form>
);
