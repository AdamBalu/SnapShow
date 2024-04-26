import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { events } from '@/db/schema/events';

export const venues = sqliteTable('venues', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	address: text('address').notNull(),
	zipCode: text('zipCode').notNull(),
	country: text('country').notNull(),
	isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
});

export type Venue = typeof venues.$inferSelect;

export const venuesRelations = relations(venues, ({ many }) => ({
	events: many(events)
}));