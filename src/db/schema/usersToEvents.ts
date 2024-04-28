import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from '@/db/schema/users';
import { events } from '@/db/schema/events';

export const usersToEvents = sqliteTable(
	'usersToEvents',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id),
		eventId: text('eventId')
			.notNull()
			.references(() => events.id)
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
