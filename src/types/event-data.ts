export type Dates = {
	dateFrom: string | null;
	dateTo: string | null;
};

export type EventsListData = {
	eventId: string;
	eventName: string;
	eventImageUrl: string | null;
	eventDescription: string | null;
	eventDateTime: string;
	eventIsDeleted: boolean | null;
	venueId: string;
	venueName: string;
	venueAddress: string;
	venueCountry: string;
	venueZipCode: string;
};

export type SortType = 'up' | 'down' | null;

export type Sort = {
	sortType: SortType;
	sortColumn: EventFilterSortColumn;
};

export type EventFilterSortColumn = 'country' | 'name' | 'date' | null;

export type UserEventStatus = 'interested' | 'going' | 'not-interested';

export type UserEvent = {
	id: string;
	name: string;
};
