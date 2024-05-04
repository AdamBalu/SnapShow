export type TicketMasterEvent = {
	name: string;
	type: string;
	id: string;
	test: boolean;
	url: string;
	locale: string;
	images: Image[];
	sales: Sales;
	dates: Dates;
	classifications: Eventlassification[];
	promoter: Promoter;
	promoters: Promoter[];
	priceRanges: PriceRange[];
	seatmap: Seatmap;
	_links: Links;
	_embedded: Embedded;
};

export type Image = {
	ratio?: string;
	url: string;
	width: number;
	height: number;
	fallback: boolean;
};

export type Sales = {
	public: Public;
};

export type Public = {
	startDateTime: string;
	startTBD: boolean;
	startTBA: boolean;
	endDateTime: string;
};

export type Dates = {
	start: Start;
	timezone: string;
	status: Status;
	spanMultipleDays: boolean;
	access?: Access;
};

export type Status = {
	code: string;
};

export type Access = {
	startDateTime: string;
	startApproximate: boolean;
	endApproximate: boolean;
};

export type Eventlassification = {
	primary: boolean;
	segment: Segment;
	genre: Genre;
	subGenre: SubGenre;
	family: boolean;
};

export type Segment = {
	id: string;
	name: string;
};

export type Genre = {
	id: string;
	name: string;
};

export type SubGenre = {
	id: string;
	name: string;
};

export type Promoter = {
	id: string;
	name: string;
};

export type Start = {
	localDate: string;
	localTime: string;
	dateTime: string;
	dateTBD: boolean;
	dateTBA: boolean;
	timeTBA: boolean;
	noSpecificTime: boolean;
};

export type PriceRange = {
	type: string;
	currency: string;
	min: number;
	max: number;
};

export type Seatmap = {
	staticUrl: string;
	id?: string;
};

export type Links = {
	self: Link;
	attractions: Link[];
	venues: Link[];
};

export type Link = {
	href: string;
};

export type Embedded = {
	venues: EventVenue[];
	attractions: Attraction[];
};

export type EventVenue = {
	name: string;
	type: string;
	id: string;
	test: boolean;
	url: string;
	locale: string;
	postalCode: string;
	timezone: string;
	city: City;
	country: Country;
	address: Address;
	location: Location;
	upcomingEvents: VenueUpcomingEvents;
	_links: LinksSelf[];
	images?: Image[];
};

export type LinksSelf = {
	self: Link;
};

export type City = {
	name: string;
};

export type Country = {
	name: string;
	countryCode: string;
};

export type Address = {
	line1: string;
};

export type Location = {
	longitude: string;
	latitude: string;
};

export type Attraction = {
	name: string;
	type: string;
	id: string;
	test: boolean;
	url: string;
	locale: string;
	images: Image[];
	classifications: AttractionClassification[];
	upcomingEvents: AttractionUpcomingEvents;
	_links: LinksSelf;
	externalLinks?: ExternalLinks;
	aliases?: string[];
};

export type ExternalLinks = {
	youtube?: Url[];
	twitter?: Url[];
	itunes?: Url[];
	facebook: Url[];
	spotify?: Url[];
	instagram: Url[];
	musicbrainz?: Url[];
	homepage?: Url[];
	lastfm?: Url[];
	wiki?: Url[];
};

export type Url = {
	url: string;
};

export type AttractionClassification = {
	primary: boolean;
	segment: Segment;
	genre: Genre;
	subGenre: Genre;
	type: Genre;
	subType: Genre;
	family: boolean;
};

export type AttractionUpcomingEvents = {
	'mfx-cz'?: number;
	'mfx-at'?: number;
	'ticketmaster'?: number;
	'mfx-pl'?: number;
	'_total': number;
	'_filtered': number;
	'mfx-dk'?: number;
	'mfx-nl'?: number;
	'mfx-no'?: number;
	'tmr'?: number;
	'ticketweb'?: number;
	'mfx-it'?: number;
	'ticketnet'?: number;
	'mfx-es'?: number;
	'mfx-ch'?: number;
	'moshtix'?: number;
	'mfx-de'?: number;
	'mfx-se'?: number;
	'mfx-be'?: number;
	'mfx-fi'?: number;
};

export type VenueUpcomingEvents = {
	'mfx-cz'?: number;
	'mfx-at'?: number;
	'mfx-pl'?: number;
	'_total': number;
	'_filtered': number;
	'mfx-dk'?: number;
	'mfx-nl'?: number;
	'mfx-no'?: number;
	'mfx-it'?: number;
	'mfx-es'?: number;
	'mfx-ch'?: number;
	'mfx-de'?: number;
	'mfx-se'?: number;
	'mfx-be'?: number;
	'mfx-fi'?: number;
};
