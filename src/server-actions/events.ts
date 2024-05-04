'use server';

import { eq, like, notLike, and, inArray, between } from 'drizzle-orm';

import { db } from '@/db';
import { events } from '@/db/schema/events';
import { genres } from '@/db/schema/genre';
import { eventsToGenres } from '@/db/schema/eventsToGenres';
import { type Dates } from '@/types/event-data';

export const getEventsWithNameAndGenre = async (
	query: string,
	page: number,
	pageSize: number,
	genreIds: string[],
	dates: Dates
) => {
	console.log(dates.dateFrom);
	console.log(dates.dateTo);

	const eventsRes = db
		.selectDistinct({
			id: events.id,
			name: events.name,
			imageUrl: events.imageUrl,
			description: events.description,
			datetime: events.datetime,
			venueId: events.venueId,
			isDeleted: events.isDeleted
		})
		.from(events)
		.innerJoin(eventsToGenres, eq(events.id, eventsToGenres.eventId))
		.innerJoin(genres, eq(genres.id, eventsToGenres.genreId))
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
		.orderBy(events.datetime)
		.limit(pageSize)
		.offset((page - 1) * pageSize);
	return eventsRes;
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
