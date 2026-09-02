import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const savedDeals = sqliteTable(
  'saved_deals',
  {
    userId: text('user_id').notNull(),
    dealId: text('deal_id').notNull(),
    createdAt: integer('created_at').notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.userId, table.dealId] })],
);

export const dealAlerts = sqliteTable('deal_alerts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id'),
  email: text('email').notNull(),
  keyword: text('keyword').notNull(),
  category: text('category'),
  minimumDiscount: integer('minimum_discount').notNull().default(15),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at').notNull().default(0),
});

