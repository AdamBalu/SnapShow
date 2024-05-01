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

const baseUrl = 'https://app.ticketmaster.com';
const apiKey = process.env.TICKETMASTER_API_KEY;

type AttractionData = {
	interpreter: Interpreter;
	genre: Genre;
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
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

const loadData = async (eventsJson: any) => {
	for (let i = 0; i < eventsJson.length; i++) {
		const eventJson = eventsJson[i];
		const attractionData: AttractionData[] = [];

		if (eventJson === undefined) {
			continue;
		}

		for (let j = 0; j < eventJson._links.attractions.length; j++) {
			const { interpreter, genre } = await getAttractionData(
				`${baseUrl}${eventJson._links.attractions[j].href}&apikey=${apiKey}`
			);

			console.log(
				`${baseUrl}${eventJson._links.attractions[j].href}&apikey=${apiKey}`
			);

			// append 'Music' genres with correstonping interprets
			if (interpreter !== null && genre !== null) {
				attractionData.push({ interpreter, genre });
			}

			await new Promise(resolve => setTimeout(resolve, 2000));
		}

		const venue = await getVenueData(
			`${baseUrl}${eventJson._links.venues[0].href}&apikey=${apiKey}`
		);

		// check if there are any genres related to 'Music' type
		if (venue !== null && attractionData.length !== 0) {
			const images = eventJson.images.filter(
				(image: any) => image.width === 1024 && image.height === 683
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
		await new Promise(resolve => setTimeout(resolve, 2000));
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

const getVenueData = async (venueURL: string) => {
	const result = await fetch(venueURL, {
		cache: 'no-store'
	});
	const data = await result.json();

	let venue: Venue | null = null;
	venue = {
		id: data.id,
		name: data.name,
		address: data.address ? data.address.line1 : '',
		zipCode: data.postalCode,
		country: data.country ? data.country.name : '',
		isDeleted: false
	};

	return venue;
};

const getAttractionData = async (attractionURL: string) => {
	const result = await fetch(attractionURL, {
		cache: 'no-store'
	});
	const data = await result.json();
	let interpreter: Interpreter | null = null;
	let genre: Genre | null = null;

	// ignore genres that are not 'Music'
	if (
		data.classifications !== undefined &&
		data.length !== null &&
		data.classifications.length > 0 &&
		data.classifications[0].segment.name === 'Music'
	) {
		//console.log(data.images);
		const images = data.images.filter(
			(image: any) => image.width === 1024 && image.height === 683
		);

		interpreter = {
			id: data.id,
			name: data.name,
			description: '',
			imageUrl: images && images.length > 0 ? images[0].url : null,
			isDeleted: false
		};

		const genreData = data.classifications[0].genre;
		genre = {
			id: genreData.id,
			name: genreData.name,
			isDeleted: false,
			icon: ''
		};
	}
	return { interpreter, genre };
};
