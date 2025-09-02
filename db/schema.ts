import { pgTable, serial, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';

export const mutilatorTypeEnum = pgEnum('mutilator_type', ['doctor', 'nurse', 'mohel']);

export const mutilators = pgTable('mutilators', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  hospital: text('hospital').notNull(),
  profession: text('profession').notNull(),
  type: mutilatorTypeEnum('type').notNull().default('doctor'),
  description: text('description'),
  imageUrl: text('image_url'),
  createdBy: text('created_by'), // References neon_auth.users_sync.id
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});