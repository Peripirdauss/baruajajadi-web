import { mysqlTable, serial, varchar, text, timestamp, uniqueIndex } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: text('password').notNull(), // This will store the hashed password
  role: varchar('role', { length: 50 }).default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
}, (table) => {
  return {
    emailIndex: uniqueIndex('email_idx').on(table.email),
  }
});

export const siteConfig = mysqlTable('site_config', {
  id: varchar('id', { length: 255 }).primaryKey(), // e.g., 'hero', 'tools', 'blog', 'assets', 'global'
  data: text('data'), // Using text for better compatibility across MySQL versions
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});
