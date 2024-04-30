import {
	integer,
	primaryKey,
	sqliteTable,
	text
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { events } from '@/db/schema/events';
import { interpreters } from '@/db/schema/interpreters';

export const interpretersToEvents = sqliteTable(
	'interpretersToEvents',
	{
		interpreterId: text('interpreterId')
			.notNull()
			.references(() => interpreters.id),
		eventId: text('eventId')
			.notNull()
			.references(() => events.id),
		isDeleted: integer('isDeleted', { mode: 'boolean' }).default(false)
	},
	t => ({
		pk: primaryKey({ columns: [t.interpreterId, t.eventId] })
	})
);

export const interpretersToEventsRelations = relations(
	interpretersToEvents,
	({ one }) => ({
		event: one(events, {
			fields: [interpretersToEvents.eventId],
			references: [events.id]
		}),
		interpreter: one(interpreters, {
			fields: [interpretersToEvents.interpreterId],
			references: [interpreters.id]
		})
	})
);
