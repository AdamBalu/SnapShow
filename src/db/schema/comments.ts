import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

import { users } from '@/db/schema/users';
import { posts } from '@/db/schema/posts';

export const comments = sqliteTable('comment', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	text: text('text'),
	userId: text('userId')
		.notNull()
		.references(() => users.id),
	postId: text('postId')
		.notNull()
		.references(() => posts.id),
	timestamp: integer('timestamp', { mode: 'timestamp' }).default(
		sql`(CURRENT_TIMESTAMP)`
	),
	isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
});

export type Comment = typeof comments.$inferSelect;

export const commentsRelations = relations(comments, ({ one }) => ({
	userId: one(users, {
		fields: [comments.userId],
		references: [users.id]
	}),
	postId: one(posts, {
		fields: [comments.postId],
		references: [posts.id]
	})
}));
