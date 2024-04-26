import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { events } from '@/db/schema/events';
import { interpreters } from '@/db/schema/interpreters';

export const interpretersToEvents = sqliteTable(
	'interpretersToEvents',
	{
		interpreterId: integer('interpreterId')
			.notNull()
			.references(() => interpreters.id),
		eventId: integer('eventId')
			.notNull()
			.references(() => events.id)
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
