import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { posts } from '@/db/schema/posts';
import { users } from '@/db/schema/users';

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
