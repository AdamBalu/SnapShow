import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { usersToGenres } from '@/db/schema/usersToGenres';
import { eventsToGenres } from '@/db/schema/eventsToGenres';

export const genres = sqliteTable('genre', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	icon: text('icon').notNull(),
	isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
});

export type Genres = typeof genres.$inferSelect;

export const genresRelations = relations(genres, ({ many }) => ({
	usersToGenres: many(usersToGenres),
	eventsToGenres: many(eventsToGenres)
}));
