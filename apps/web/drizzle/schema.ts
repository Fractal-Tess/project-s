import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  id: int('id').primaryKey({ autoIncrement: true }),
  email: text('email', { length: 256 }).unique(),
  username: text('username', { length: 256 }),
  password: text('password', { length: 256 }),
  created_at: text('createdAt').default(sql`CURRENT_TIME`),
  confirm_url: text('confirmURL').unique(),
  email_confirmed: int('emailConfirmed', { mode: 'boolean' }).default(false),
});
