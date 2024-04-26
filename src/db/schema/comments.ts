import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

import { users } from '@/db/schema/users';
import { posts } from '@/db/schema/posts';

export const comments = sqliteTable('comments', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	text: text('text'),
	userId: integer('userId').notNull().references(() => users.id),
	postId: integer('postId').notNull().references(() => posts.id),
	timestamp: text('timestamp').default(sql`(CURRENT_TIMESTAMP)`),
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
