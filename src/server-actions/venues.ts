'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { venues } from '@/db/schema/venue';

export const getVenue = async (venueId: string) =>
	db.select().from(venues).where(eq(venues.id, venueId));
