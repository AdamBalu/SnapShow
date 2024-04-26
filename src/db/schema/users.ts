import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { posts } from '@/db/schema/posts';
import { comments } from '@/db/schema/comments';
import { reactions } from '@/db/schema/reactions';
import { usersToEvents } from '@/db/schema/usersToEvents';
import { usersToGenres } from '@/db/schema/usersToGenres';
import { usersFriends } from '@/db/schema/usersFriends';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	username: text('username').unique().notNull(),
	email: text('email').unique().notNull(),
	profilePicture: text('email'),
	bio: text('bio'),
	isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
});

export type User = typeof users.$inferSelect;

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
	comments: many(comments),
	reactions: many(reactions),
	usersToEvents: many(usersToEvents),
	usersToGenres: many(usersToGenres),
	usersFriends: many(usersFriends)
}));
