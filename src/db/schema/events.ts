import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { venues } from '@/db/schema/venues';
import { usersToEvents } from '@/db/schema/usersToEvents';
import { eventsToGenres } from '@/db/schema/eventsToGenres';
import { interpretersToEvents } from '@/db/schema/interpretersToEvents';

export const events = sqliteTable('event', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	imageUrl: text('imageUrl'),
	description: text('description'),
	datetime: text('datetime').notNull(),
	venueId: text('venueId')
		.notNull()
		.references(() => venues.id),
	isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
});

export type Event = typeof events.$inferSelect;

export const eventsRelations = relations(events, ({ one, many }) => ({
	venueId: one(venues, {
		fields: [events.venueId],
		references: [venues.id]
	}),
	usersToEvents: many(usersToEvents),
	eventsToGenres: many(eventsToGenres),
	interpretersToEvents: many(interpretersToEvents)
}));
