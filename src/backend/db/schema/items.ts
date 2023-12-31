import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { scale: 4 }).notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertItemsSchema = createInsertSchema(items, {
  price: z
    .string()
    .regex(/^[0-9]+(\.[0-9]+)?$/, "Must only contain positive numbers"),
}).omit({
  id: true,
  createdAt: true,
});

export const selectItemsSchema = createSelectSchema(items);
export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
