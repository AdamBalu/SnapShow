import { type PropsWithChildren, createContext, useState } from 'react';

type EasterEggValue = {
	isOn: boolean;
	toggleEvent: () => void;
};

export const EasterEggContext = createContext<EasterEggValue | null>(null);

export const EasterEggContextProvider = ({ children }: PropsWithChildren) => {
	const [started, setStarted] = useState(false);

	const ToggleStart = () => {
		setStarted(!started);
	};

	return (
		<EasterEggContext.Provider
			value={{ isOn: started, toggleEvent: ToggleStart }}
		>
			{children}
		</EasterEggContext.Provider>
	);
};
