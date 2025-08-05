
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

// Since no data storage is required, we'll create a minimal placeholder table
// This is just to satisfy the database schema requirement
export const placeholderTable = pgTable('placeholder', {
  id: serial('id').primaryKey(),
  name: text('name')
});

// TypeScript types for the table schema
export type Placeholder = typeof placeholderTable.$inferSelect;
export type NewPlaceholder = typeof placeholderTable.$inferInsert;

// Export all tables for proper query building
export const tables = { placeholder: placeholderTable };
