import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const searches = pgTable("searches", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  aiResponse: text("ai_response"),
  searchResults: jsonb("search_results"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSearchSchema = createInsertSchema(searches).pick({
  query: true,
});

export type InsertSearch = z.infer<typeof insertSearchSchema>;
export type Search = typeof searches.$inferSelect;

// Types for external API responses
export const tavilyResultSchema = z.object({
  title: z.string(),
  url: z.string(),
  content: z.string(),
  raw_content: z.string().optional(),
  published_date: z.string().optional(),
});

export const tavilyResponseSchema = z.object({
  results: z.array(tavilyResultSchema),
});

export type TavilyResult = z.infer<typeof tavilyResultSchema>;
export type TavilyResponse = z.infer<typeof tavilyResponseSchema>;
