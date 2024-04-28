import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import {
	accounts,
	sessions,
	users,
	usersRelations,
	verificationTokens
} from '@/db/schema/users';
import { posts, postsRelations } from '@/db/schema/posts';
import { genres, genresRelations } from '@/db/schema/genre';
import { comments, commentsRelations } from '@/db/schema/comments';
import { interpreters, interpretersRelations } from '@/db/schema/interpreters';
import { reactions, reactionsRelations } from '@/db/schema/reactions';
import { venues, venuesRelations } from '@/db/schema/venue';
import { events, eventsRelations } from '@/db/schema/events';
import {
	eventsToGenres,
	eventsToGenresRelations
} from '@/db/schema/eventsToGenres';
import {
	interpretersToEvents,
	interpretersToEventsRelations
} from '@/db/schema/interpretersToEvents';
import { usersFriends, usersFriendsRelations } from '@/db/schema/usersFriends';
import {
	usersToEvents,
	usersToEventsRelations
} from '@/db/schema/usersToEvents';
import {
	usersToGenres,
	usersToGenresRelations
} from '@/db/schema/usersToGenres';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: {
		users,
		posts,
		genres,
		comments,
		interpreters,
		reactions,
		venues,
		events,
		accounts,
		sessions,
		verificationTokens,

		// many to many
		eventsToGenres,
		interpretersToEvents,
		usersFriends,
		usersToEvents,
		usersToGenres,

		// relations
		usersRelations,
		postsRelations,
		genresRelations,
		commentsRelations,
		interpretersRelations,
		reactionsRelations,
		venuesRelations,
		eventsRelations,
		eventsToGenresRelations,
		interpretersToEventsRelations,
		usersFriendsRelations,
		usersToEventsRelations,
		usersToGenresRelations
	}
});
