import * as schema from './schema';
export * from './schema';

import { env } from '@/env.mjs';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const con = new Database(env.SQLITE_URL);

export const db = drizzle(con, { schema });
