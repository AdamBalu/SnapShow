import { and, eq } from 'drizzle-orm';
import { type SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core/table';

import { db } from '@/db';
import { type Event, events } from '@/db/schema/events';
import { type Genre, genres } from '@/db/schema/genre';
import { type Interpreter, interpreters } from '@/db/schema/interpreters';
import { type Venue, venues } from '@/db/schema/venue';
import {
	type InterpreterToEvent,
	interpretersToEvents
} from '@/db/schema/interpretersToEvents';
import { type EventToGenre, eventsToGenres } from '@/db/schema/eventsToGenres';
import {
	type Attraction,
	type Image,
	type TicketMasterEvent,
	type EventVenue
} from '@/types/ticket-master-data';

const baseUrl = 'https://app.ticketmaster.com';
const apiKey = process.env.TICKETMASTER_API_KEY;

type AttractionData = {
	interpreter: Interpreter;
	genre: Genre;
};

export const getTicketmasterEvents = async () => {
	const result = await fetch(
		`${baseUrl}/discovery/v2/events.json?countryCode=CZ&apikey=${apiKey}`,
		{
			cache: 'no-store'
		}
	);

	let data = await result.json();
	let items = data._embedded.events;

	let pageNumber = 0;
	const maxPageNumber = data.page.totalPages - 1;

	while (pageNumber !== maxPageNumber) {
		pageNumber++;
		console.log(`CURRENT PAGE: ${pageNumber}`);
		console.log(`MAX PAGE: ${maxPageNumber}`);

		const result = await fetch(
			`${baseUrl}/discovery/v2/events.json?page=${pageNumber}&countryCode=CZ&apikey=${apiKey}`,
			{
				cache: 'no-store'
			}
		);

		data = await result.json();
		items = data._embedded.events;

		await loadData(items);
	}

	return Response.json(data);
};

const loadData = async (eventsJson: TicketMasterEvent[]) => {
	for (let i = 0; i < eventsJson.length; i++) {
		const eventJson = eventsJson[i];
		const attractionData: AttractionData[] = [];

		if (eventJson === undefined) {
			continue;
		}

		const eventVenue = eventJson._embedded.venues[0];
		const eventAttractions = eventJson._embedded.attractions;
		for (let j = 0; j < eventAttractions.length; j++) {
			const { interpreter, genre } = getAttractionData(eventAttractions[j]);

			console.log(eventAttractions[j].name);

			// append 'Music' genres with correstonping interprets
			if (interpreter !== null && genre !== null) {
				attractionData.push({ interpreter, genre });
			}
		}

		const venue = getVenueData(eventVenue);

		// check if there are any genres related to 'Music' type
		if (venue !== null && attractionData.length !== 0) {
			const images = eventJson.images.filter(
				(image: Image) => image.width === 1024 && image.height === 683
			);

			const event: Event = {
				id: eventJson.id,
				name: eventJson.name,
				description: '',
				datetime: eventJson.dates.start.dateTime ?? '1970-01-01T00:00:01Z',
				venueId: venue.id,
				imageUrl: images && images.length > 0 ? images[0].url : null,
				isDeleted: false
			};

			await updateDbData(venues, venue);
			await updateDbData(events, event);
			attractionData.forEach(async attraction => {
				await updateDbData(interpreters, attraction.interpreter);
				await updateDbData(genres, attraction.genre);
				await updateInterpretToEvent(event, attraction.interpreter);
				await updateGenreToEvent(event, attraction.genre);
			});
		}
		await new Promise(resolve => setTimeout(resolve, 500));
	}
};

const updateInterpretToEvent = async (
	event: Event,
	interpreter: Interpreter
) => {
	const interpreterToEvent: InterpreterToEvent = {
		eventId: event.id,
		interpreterId: interpreter.id,
		isDeleted: false
	};

	const res = await db
		.select()
		.from(interpretersToEvents)
		.where(
			and(
				eq(interpretersToEvents.eventId, event.id),
				eq(interpretersToEvents.interpreterId, interpreter.id)
			)
		);

	if (res.length === 0) {
		await db.insert(interpretersToEvents).values(interpreterToEvent);
	}
};

const updateGenreToEvent = async (event: Event, genre: Genre) => {
	const eventToGenre: EventToGenre = {
		eventId: event.id,
		genreId: genre.id,
		isDeleted: false
	};

	const res = await db
		.select()
		.from(eventsToGenres)
		.where(
			and(
				eq(eventsToGenres.eventId, event.id),
				eq(eventsToGenres.genreId, genre.id)
			)
		);

	if (res.length === 0) {
		await db.insert(eventsToGenres).values(eventToGenre);
	}
};

const updateDbData = async (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	table: SQLiteTableWithColumns<any>,
	data: Event | Venue | Interpreter | Genre
) => {
	const res = await db.select().from(table).where(eq(table.id, data.id));
	const updateData = res.length === 0;

	if (updateData) {
		await db.insert(table).values(data);
	}

	return updateData;
};

const getVenueData = (eventVenue: EventVenue) => {
	const venue = {
		id: eventVenue.id,
		name: eventVenue.name,
		address: eventVenue.address ? eventVenue.address.line1 : '',
		zipCode: eventVenue.postalCode,
		country: eventVenue.country ? eventVenue.country.name : '',
		isDeleted: false
	};

	return venue;
};

const getAttractionData = (attraction: Attraction) => {
	let interpreter: Interpreter | null = null;
	let genre: Genre | null = null;

	// ignore genres that are not 'Music'
	if (
		attraction.classifications !== undefined &&
		attraction !== null &&
		attraction.classifications.length > 0 &&
		attraction.classifications[0].segment.name === 'Music'
	) {
		//console.log(data.images);
		const images = attraction.images.filter(
			(image: Image) => image.width === 1024 && image.height === 683
		);

		interpreter = {
			id: attraction.id,
			name: attraction.name,
			description: '',
			imageUrl: images && images.length > 0 ? images[0].url : null,
			isDeleted: false
		};

		const genreData = attraction.classifications[0].genre;
		genre = {
			id: genreData.id,
			name: genreData.name,
			isDeleted: false,
			icon: ''
		};
	}
	return { interpreter, genre };
};
