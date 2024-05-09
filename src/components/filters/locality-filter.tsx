'use server';
import React from 'react';

import { Dropdown } from '@/components/ui/dropdown';

export const LocalityFilter = () => (
	<Dropdown
		items={[
			{
				label: 'local',
				iconSrc: '/static/home.svg'
				// action: signOutAction // for example
			},
			{
				label: 'World',
				iconSrc: '/static/genres/world.svg'
			},
			{
				label: 'Globe or idk',
				iconSrc: '/static/genres/alternative.svg'
			}
		]}
	/>
);
