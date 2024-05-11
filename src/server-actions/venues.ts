'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { venues } from '@/db/schema/venues';

export const getVenue = async (venueId: string) =>
	db.query.venues.findFirst({ where: eq(venues.id, venueId) });
