import { type PropsWithChildren, createContext, useState } from 'react';

type DropdownValue = {
	isExpanded: boolean;
	toggleEvent: () => void;
};

export const DropdownContext = createContext<DropdownValue | null>(null);

export const DropdownContextProvider = ({ children }: PropsWithChildren) => {
	const [expanded, setExpanded] = useState(false);

	const ToggleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<DropdownContext.Provider
			value={{ isExpanded: expanded, toggleEvent: ToggleExpand }}
		>
			{children}
		</DropdownContext.Provider>
	);
};
