'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { venues } from '@/db/schema/venue';

export const getVenue = async (venueId: string) =>
	db.query.venues.findFirst({ where: eq(venues.id, venueId) });
