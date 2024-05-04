import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from '@/db/schema/users';
import { comments } from '@/db/schema/comments';
import { reactions } from '@/db/schema/reactions';

export const posts = sqliteTable('post', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	comment: text('comment'),
	userId: text('userId')
		.notNull()
		.references(() => users.id),
	photo: text('photo'),
	isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
});

export type Post = typeof posts.$inferSelect;

export const postsRelations = relations(posts, ({ one, many }) => ({
	userId: one(users, {
		fields: [posts.userId],
		references: [users.id]
	}),
	comments: many(comments),
	reactions: many(reactions)
}));
