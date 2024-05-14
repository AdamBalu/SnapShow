import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import { displayableDateTime } from '@/utils/date-time-converter';
import { isValidDate } from '@/utils/date-validity-checker';

TimeAgo.addDefaultLocale(en);

type TimeBadgeProps = {
	datetime: Date;
};

export const TimeBadge = (props: TimeBadgeProps) => {
	const timeAgo = new TimeAgo('en-US');
	return props.datetime ? (
		<div
			className="tooltip tooltip-bottom"
			data-tip={displayableDateTime(props.datetime)}
		>
			{isValidDate(props.datetime) && (
				<span>{timeAgo.format(props.datetime)}</span>
			)}
		</div>
	) : (
		<div>unknown time</div>
	);
};
