import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { events } from '@/db/schema/events';
import { genres } from '@/db/schema/genre';

export const eventsToGenres = sqliteTable(
	'eventsToGenres',
	{
		eventId: integer('eventId')
			.notNull()
			.references(() => events.id),
		genreId: integer('genreId')
			.notNull()
			.references(() => genres.id)
	},
	t => ({
		pk: primaryKey({ columns: [t.eventId, t.genreId] })
	})
);

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
