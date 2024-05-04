export const formatDate = (date: Date) => {
	let month = String(date.getMonth() + 1);
	let day = String(date.getDate());
	const year = String(date.getFullYear());

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;

	return `${year}-${month}-${day}`;
};

export const displayableDateTime = (date: Date) => {
	let month = String(date.getMonth() + 1);
	let day = String(date.getDate());
	let hours = String(date.getHours());
	let minutes = String(date.getMinutes());
	const year = String(date.getFullYear());

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;
	if (hours.length < 2) hours = `0${hours}`;
	if (minutes.length < 2) minutes = `0${minutes}`;

	return `${day}.${month}. ${year} ${hours}:${minutes}`;
};
