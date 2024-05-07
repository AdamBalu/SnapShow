'use server';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import { displayableDateTime } from '@/utils/date-time-converter';

TimeAgo.addDefaultLocale(en);

type TimeBadgeProps = {
	timestamp: Date;
};

export const TimeBadge = async (props: TimeBadgeProps) => {
	const timeAgo = new TimeAgo('en-US');
	return props.timestamp ? (
		<div
			className="tooltip tooltip-bottom"
			data-tip={displayableDateTime(props.timestamp)}
		>
			<span>{timeAgo.format(props.timestamp)}</span>
		</div>
	) : (
		<div>unknown time</div>
	);
};
