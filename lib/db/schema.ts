import { mysqlTable, serial, varchar, text, timestamp, uniqueIndex, decimal, int } from 'drizzle-orm/mysql-core';

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

// Purchases: tracks tool transactions from buy.baruajajadi.com
export const purchases = mysqlTable('purchases', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),       // email or user id from buyer
  toolSlug: varchar('tool_slug', { length: 255 }).notNull(),
  amount: int('amount').notNull(),                               // in IDR (Rupiah)
  currency: varchar('currency', { length: 10 }).default('IDR'),
  status: varchar('status', { length: 50 }).default('pending'), // pending | paid | failed | refunded
  midtransOrderId: varchar('midtrans_order_id', { length: 255 }),
  midtransToken: text('midtrans_token'),                        // Snap token for client
  midtransPaymentType: varchar('midtrans_payment_type', { length: 100 }),
  buyerName: varchar('buyer_name', { length: 255 }),
  buyerEmail: varchar('buyer_email', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// API Keys: per-domain keys for the public cross-domain API
export const apiKeys = mysqlTable('api_keys', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),             // e.g., 'buy-site', 'community-site'
  keyHash: varchar('key_hash', { length: 255 }).notNull(),      // hashed API key (SHA-256)
  allowedOrigin: varchar('allowed_origin', { length: 255 }).notNull(),
  isActive: varchar('is_active', { length: 5 }).default('true'),
  createdAt: timestamp('created_at').defaultNow(),
});
