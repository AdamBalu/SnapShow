import {
	LucideAlertCircle,
	LucideAlertTriangle,
	LucideCircleHelp
} from 'lucide-react';
import { type ReactNode } from 'react';

type InfoBoxProps = {
	type?: 'warning' | 'error';
	children: ReactNode;
};

const InfoBox = ({ type, children }: InfoBoxProps) => {
	let icon;
	let borderColor;
	switch (type) {
		case 'warning':
			icon = <LucideAlertTriangle className="w-6 h-6 text-yellow-500" />;
			borderColor = 'border-yellow-500';
			break;
		case 'error':
			icon = <LucideAlertCircle className="w-6 h-6 text-red-500" />;
			borderColor = 'border-red-500';
			break;
		default:
			icon = <LucideCircleHelp className="w-6 h-6 text-primary" />;
			borderColor = 'border-primary';
	}

	return (
		<div
			className={`border-2 ${borderColor} py-4 px-2 my-4 rounded-md flex items-center`}
		>
			<div className="mr-4">{icon}</div>
			<div>
				<p className="text-sm font-medium">{children}</p>
			</div>
		</div>
	);
};

export default InfoBox;
