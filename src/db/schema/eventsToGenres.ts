import {
	integer,
	primaryKey,
	sqliteTable,
	text
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { events } from '@/db/schema/events';
import { genres } from '@/db/schema/genre';

export const eventsToGenres = sqliteTable(
	'eventsToGenres',
	{
		eventId: text('eventId')
			.notNull()
			.references(() => events.id),
		genreId: text('genreId')
			.notNull()
			.references(() => genres.id),
		isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
	},
	t => ({
		pk: primaryKey({ columns: [t.eventId, t.genreId] })
	})
);

export type EventToGenre = typeof eventsToGenres.$inferSelect;

export const eventsToGenresRelations = relations(eventsToGenres, ({ one }) => ({
	genre: one(genres, {
		fields: [eventsToGenres.genreId],
		references: [genres.id]
	}),
	event: one(events, {
		fields: [eventsToGenres.eventId],
		references: [events.id]
	})
}));
