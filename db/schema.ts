import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const mutilators = pgTable('mutilators', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  hospital: text('hospital').notNull(),
  profession: text('profession').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});