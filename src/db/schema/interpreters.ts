import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { interpretersToEvents } from '@/db/schema/interpretersToEvents';

export const interpreters = sqliteTable('interpreter', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	description: text('description'),
	isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
});

export type Interpreter = typeof interpreters.$inferSelect;

export const interpretersRelations = relations(interpreters, ({ many }) => ({
	interpretersToEvents: many(interpretersToEvents)
}));
