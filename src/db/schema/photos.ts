import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { posts } from '@/db/schema/posts';

export const photos = sqliteTable('photo', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	url: text('url').notNull(),
	postId: text('postId')
		.notNull()
		.references(() => posts.id)
});

export type Photo = typeof photos.$inferSelect;

export const photosRelations = relations(photos, ({ one }) => ({
	postId: one(posts, {
		fields: [photos.postId],
		references: [posts.id]
	})
}));
