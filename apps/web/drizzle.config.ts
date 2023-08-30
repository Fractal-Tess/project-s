import type { Config } from 'drizzle-kit';
import { env } from './src/env.mjs';

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: env.SQLITE_URL,
  },
} satisfies Config;
