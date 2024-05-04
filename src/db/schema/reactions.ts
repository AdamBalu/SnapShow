import { text, sqliteTable, unique } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from '@/db/schema/users';
import { posts } from '@/db/schema/posts';

export const reactions = sqliteTable(
	'reaction',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		postId: text('postId')
			.notNull()
			.references(() => posts.id),
		userId: text('userId')
			.notNull()
			.references(() => users.id)
	},
	t => ({
		// Unique constraint for postId and userId combination
		postUserUnique: unique('postUserUnique').on(t.postId, t.userId)
	})
);

export type Reaction = typeof reactions.$inferSelect;

export const reactionsRelations = relations(reactions, ({ one }) => ({
	userId: one(users, {
		fields: [reactions.userId],
		references: [users.id]
	}),
	postId: one(posts, {
		fields: [reactions.postId],
		references: [posts.id]
	})
}));
