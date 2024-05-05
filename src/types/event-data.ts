export type Dates = {
	dateFrom: string;
	dateTo: string;
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

export type EventFilterSortColumn = 'country' | 'name' | 'date' | null;
