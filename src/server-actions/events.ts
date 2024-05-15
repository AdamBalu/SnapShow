'use server';

import {
	and,
	asc,
	gte,
	lte,
	count,
	desc,
	eq,
	inArray,
	like,
	ne,
	notLike,
	or
} from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import {
	SortType,
	type Dates,
	type EventFilterSortColumn,
	type UserEventStatus
} from '@/types/event-data';
import { venues } from '@/db/schema/venues';
import { events } from '@/db/schema/events';
import { db } from '@/db';
import { eventsToGenres } from '@/db/schema/eventsToGenres';
import { genres } from '@/db/schema/genres';
import { checkUserIsSigned } from '@/server-actions/user';
import { users } from '@/db/schema/users';
import { usersToEvents } from '@/db/schema/usersToEvents';
import { usersFriends } from '@/db/schema/usersFriends';

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
				and(
					dates.dateFrom
						? gte(events.datetime, `${dates.dateFrom}00:00:00`)
						: undefined,
					dates.dateTo
						? lte(events.datetime, `${dates.dateTo}T23:59:59Z`)
						: undefined
				)
			)
		)
		.orderBy(sortDirection === 'down' ? desc(columnToSort) : asc(columnToSort))
		.limit(pageSize)
		.offset((page - 1) * pageSize);
};

export const getEventFullDetails = async (eventId: string) =>
	await db
		.select({
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
			venueZipCode: venues.zipCode,
			venueLat: venues.latitude,
			venueLng: venues.longitude
		})
		.from(events)
		.innerJoin(eventsToGenres, eq(events.id, eventsToGenres.eventId))
		.innerJoin(genres, eq(genres.id, eventsToGenres.genreId))
		.innerJoin(venues, eq(events.venueId, venues.id))
		.where(and(and(eq(events.id, eventId), eq(events.isDeleted, false))));

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

export const getFriendsActionOnEventCount = async (
	eventId: string,
	action: 'going' | 'interested'
) => {
	const userId = await checkUserIsSigned();

	const userCount = await db
		.select({ count: count() })
		.from(users)
		.innerJoin(
			usersFriends,
			or(eq(users.id, usersFriends.user1Id), eq(users.id, usersFriends.user2Id))
		)
		.innerJoin(
			usersToEvents,
			and(
				or(
					eq(usersFriends.user1Id, usersToEvents.userId),
					eq(usersFriends.user2Id, usersToEvents.userId)
				),
				eq(usersToEvents.userAction, action),
				eq(usersToEvents.eventId, eventId)
			)
		)
		.where(
			and(
				ne(usersToEvents.userId, userId),
				eq(usersFriends.isPending, false),
				eq(usersFriends.isDeleted, false)
			)
		);

	return userCount[0].count;
};

export const getUsersActionOnEventCount = async (
	eventId: string,
	action: 'going' | 'interested'
) => {
	const userCount = await db
		.select({ count: count() })
		.from(users)
		.innerJoin(usersToEvents, eq(users.id, usersToEvents.userId))
		.where(
			and(
				eq(usersToEvents.userAction, action),
				eq(usersToEvents.eventId, eventId)
			)
		);

	return userCount[0].count;
};

export const getUserEventStatus = async (
	eventId: string
): Promise<UserEventStatus> => {
	const userId = await checkUserIsSigned();

	const userEvent = await db.query.usersToEvents.findFirst({
		where: and(
			eq(usersToEvents.userId, userId),
			eq(usersToEvents.eventId, eventId),
			eq(usersToEvents.isDeleted, false)
		)
	});

	if (!userEvent) {
		return 'not-interested';
	}

	return userEvent.userAction ?? 'not-interested';
};

export const updateUserEventStatus = async (
	eventId: string,
	action: 'going' | 'interested' | null
) => {
	const userId = await checkUserIsSigned();

	await db.transaction(async tx => {
		await tx
			.insert(usersToEvents)
			.values({ userId, eventId, userAction: action, isDeleted: false })
			.onConflictDoUpdate({
				target: [usersToEvents.userId, usersToEvents.eventId],
				set: { userAction: action }
			});
	});

	revalidatePath(`/event/${eventId}`);
};

export const getUserEvents = async (userId: string) =>
	db
		.select({ id: events.id, name: events.name })
		.from(events)
		.innerJoin(usersToEvents, eq(events.id, usersToEvents.eventId))
		.where(
			and(eq(usersToEvents.userId, userId), eq(usersToEvents.isDeleted, false))
		)
		.orderBy(desc(events.datetime));
