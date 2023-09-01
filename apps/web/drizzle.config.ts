import type { Config } from 'drizzle-kit';
import { env } from './src/env.mjs';

export default {
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: env.SQLITE_URL,
  },
} satisfies Config;
