import {
	text,
	integer,
	sqliteTable,
	primaryKey
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { type AdapterAccount } from '@auth/core/adapters';

import { posts } from '@/db/schema/posts';
import { comments } from '@/db/schema/comments';
import { reactions } from '@/db/schema/reactions';
import { usersToEvents } from '@/db/schema/usersToEvents';
import { usersToGenres } from '@/db/schema/usersToGenres';
import { usersFriends } from '@/db/schema/usersFriends';

export const users = sqliteTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image'),
	username: text('username').unique(),
	bio: text('bio'),
	isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
});

export const accounts = sqliteTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	account => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		})
	})
);

export const sessions = sqliteTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
});

export const verificationTokens = sqliteTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
	},
	vt => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
	})
);

export type User = typeof users.$inferSelect;

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
	comments: many(comments),
	reactions: many(reactions),
	usersToEvents: many(usersToEvents),
	usersToGenres: many(usersToGenres),
	usersFriends: many(usersFriends)
}));
