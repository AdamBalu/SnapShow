import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from '@/db/schema/users';
import { genres } from '@/db/schema/genre';

export const usersToGenres = sqliteTable(
	'usersToGenres',
	{
		userId: integer('userId')
			.notNull()
			.references(() => users.id),
		genreId: integer('genreId')
			.notNull()
			.references(() => genres.id)
	},
	t => ({
		pk: primaryKey({ columns: [t.userId, t.genreId] })
	})
);

export const usersToGenresRelations = relations(usersToGenres, ({ one }) => ({
	genre: one(genres, {
		fields: [usersToGenres.genreId],
		references: [genres.id]
	}),
	user: one(users, {
		fields: [usersToGenres.userId],
		references: [users.id]
	})
}));
