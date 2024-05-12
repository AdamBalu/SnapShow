import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { comments } from '@/db/schema/comments';
import { reactions, type Reaction } from '@/db/schema/reactions';
import { users } from '@/db/schema/users';

import { events } from './events';

export const posts = sqliteTable('post', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	comment: text('comment'),
	userId: text('userId')
		.notNull()
		.references(() => users.id),
	eventId: text('eventId')
		.notNull()
		.references(() => events.id),
	photo: text('photo'),
	datetime: text('datetime').default(sql`(CURRENT_TIMESTAMP)`),
	isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
});

export type Post = typeof posts.$inferSelect;
export type PostWithReactions = Post & {
	reactions: Reaction[];
};

export const postsRelations = relations(posts, ({ one, many }) => ({
	userId: one(users, {
		fields: [posts.userId],
		references: [users.id]
	}),
	comments: many(comments),
	reactions: many(reactions)
}));
