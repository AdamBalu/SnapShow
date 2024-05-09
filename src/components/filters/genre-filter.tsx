import React from 'react';

import { Dropdown } from '@/components/ui/dropdown';

export const GenreFilter = () => (
	<Dropdown
		items={[
			{
				label: 'DURUMDURUM',
				iconSrc: '/static/easter-egg.gif'
				// action: signOutAction // for example
			},
			{
				label: 'TUDUDUDTU',
				iconSrc: '/static/easter-egg.gif'
			},
			{
				label: 'cant stop',
				iconSrc: '/static/easter-egg.gif'
			}
		]}
	/>
);
