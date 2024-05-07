import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

type TimeBadgeProps = {
	timestamp: number;
};

export const TimeBadge = (props: TimeBadgeProps) => {
	const timeAgo = new TimeAgo('en-US');
	console.log(props.timestamp);
	const date = new Date(props.timestamp * 1000); // why is JS like this :((((((
	const formattedDate = date.toLocaleString('en-US');
	console.log(date);
	console.log(timeAgo.format(date));
	return (
		<div className="tooltip tooltip-bottom" data-tip={formattedDate}>
			<span>{timeAgo.format(date)}</span>
		</div>
	);
};
