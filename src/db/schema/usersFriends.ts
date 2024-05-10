import {
	integer,
	primaryKey,
	sqliteTable,
	text,
	unique
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from '@/db/schema/users';

export const usersFriends = sqliteTable(
	'usersFriends',
	{
		user1Id: text('user1Id')
			.notNull()
			.references(() => users.id),
		user2Id: text('user2Id')
			.notNull()
			.references(() => users.id),
		initiatedBy: text('initiatedBy')
			.notNull()
			.references(() => users.id),
		isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false),
		isPending: integer('isPending', { mode: 'boolean' }).default(false)
	},
	t => ({
		pk: primaryKey({ columns: [t.user1Id, t.user2Id] }),
		unq: unique().on(t.user2Id, t.user1Id)
	})
);

export const usersFriendsRelations = relations(usersFriends, ({ one }) => ({
	user1: one(users, {
		fields: [usersFriends.user1Id],
		references: [users.id]
	}),
	user2: one(users, {
		fields: [usersFriends.user2Id],
		references: [users.id]
	}),
	initiatedBy: one(users, {
		fields: [usersFriends.initiatedBy],
		references: [users.id]
	})
}));

export type UsersFriends = typeof usersFriends.$inferSelect;
