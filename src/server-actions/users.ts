'use server';

import { ne } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema/users';

export const getUsers = async (userId: string) =>
	await db.select().from(users).where(ne(users.id, userId));
