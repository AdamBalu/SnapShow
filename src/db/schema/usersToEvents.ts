import {
	integer,
	primaryKey,
	sqliteTable,
	text
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

import { users } from '@/db/schema/users';
import { events } from '@/db/schema/events';

const userActionSchema = z.enum(['going', 'interested']);

export const usersToEvents = sqliteTable(
	'usersToEvents',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id),
		eventId: text('eventId')
			.notNull()
			.references(() => events.id),
		userAction: text('userAction', { enum: userActionSchema.options }),
		isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
	},
	t => ({
		pk: primaryKey({ columns: [t.userId, t.eventId] })
	})
);

export const usersToEventsRelations = relations(usersToEvents, ({ one }) => ({
	event: one(events, {
		fields: [usersToEvents.eventId],
		references: [events.id]
	}),
	user: one(users, {
		fields: [usersToEvents.userId],
		references: [users.id]
	})
}));
