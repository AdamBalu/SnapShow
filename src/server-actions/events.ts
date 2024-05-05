'use server';

import {
	and,
	asc,
	between,
	desc,
	eq,
	inArray,
	like,
	notLike
} from 'drizzle-orm';

import { type Dates, type EventFilterSortColumn } from '@/types/event-data';
import { type SortType } from '@/components/event/sort-button';
import { venues } from '@/db/schema/venue';
import { events } from '@/db/schema/events';
import { db } from '@/db';
import { eventsToGenres } from '@/db/schema/eventsToGenres';
import { genres } from '@/db/schema/genre';

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

export const getEventsWithNameAndGenre = async (
	query: string,
	page: number,
	pageSize: number,
	genreIds: string[],
	dates: Dates,
	sortColumn: EventFilterSortColumn,
	sortDirection: SortType
) => {
	const columnToSort =
		sortColumn === 'country'
			? venues.country
			: sortColumn === 'name'
				? events.name
				: events.datetime;
	return db
		.selectDistinct({
			eventId: events.id,
			eventName: events.name,
			eventImageUrl: events.imageUrl,
			eventDescription: events.description,
			eventDateTime: events.datetime,
			eventIsDeleted: events.isDeleted,
			venueId: events.venueId,
			venueName: venues.name,
			venueAddress: venues.address,
			venueCountry: venues.country,
			venueZipCode: venues.zipCode
		})
		.from(events)
		.innerJoin(eventsToGenres, eq(events.id, eventsToGenres.eventId))
		.innerJoin(genres, eq(genres.id, eventsToGenres.genreId))
		.innerJoin(venues, eq(events.venueId, venues.id))
		.where(
			and(
				and(
					and(
						like(events.name, `%${query}%`),
						notLike(events.name, '%Parking%')
					),
					genreIds.length > 0 ? inArray(genres.id, genreIds) : undefined
				),
				between(events.datetime, dates.dateFrom, dates.dateTo)
			)
		)
		.orderBy(sortDirection === 'down' ? desc(columnToSort) : asc(columnToSort))
		.limit(pageSize)
		.offset((page - 1) * pageSize);
};

export const getEventsWithName = async (
	query: string,
	page: number,
	pageSize: number
) =>
	db
		.select()
		.from(events)
		.where(
			and(like(events.name, `%${query}%`), notLike(events.name, '%Parking%'))
		)
		.orderBy(events.datetime)
		.limit(pageSize)
		.offset((page - 1) * pageSize);

export const getEvent = async (eventId: string) =>
	db.query.events.findFirst({
		where: and(eq(events.id, eventId), eq(events.isDeleted, false))
	});
