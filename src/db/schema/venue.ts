import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { events } from '@/db/schema/events';

export const venues = sqliteTable('venue', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	address: text('address').notNull(),
	zipCode: text('zipCode').notNull(),
	country: text('country').notNull(),
	longitude: text('longitude').notNull().default('16.612233'),
	latitude: text('latitude').notNull().default('49.190910'),
	isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
});

export type Venue = typeof venues.$inferSelect;

export const venuesRelations = relations(venues, ({ many }) => ({
	events: many(events)
}));
