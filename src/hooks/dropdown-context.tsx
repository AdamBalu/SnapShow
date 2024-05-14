import { type PropsWithChildren, createContext, useState } from 'react';

type DropdownValue = {
	isExpanded: boolean;
	toggleExpand: () => void;
};

export const DropdownContext = createContext<DropdownValue | null>(null);

export const DropdownContextProvider = ({ children }: PropsWithChildren) => {
	const [expanded, setExpanded] = useState(false);

	const ToggleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<DropdownContext.Provider
			value={{ isExpanded: expanded, toggleExpand: ToggleExpand }}
		>
			{children}
		</DropdownContext.Provider>
	);
};
