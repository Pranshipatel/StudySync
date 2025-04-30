import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  avatar: text("avatar").default("https://randomuser.me/api/portraits/men/32.jpg"),
  xp: integer("xp").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  documents: many(documents),
  notes: many(notes),
  flashcardDecks: many(flashcardDecks),
  threadPosts: many(threadPosts),
}));

// Documents table for uploaded content
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  type: text("type").notNull(), // "pdf", "image", "text"
  icon: text("icon").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  pages: integer("pages").default(0),
  status: text("status").default("Processing"), // "Processing", "Processed"
});

export const documentsRelations = relations(documents, ({ one, many }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
  notes: many(notes),
}));

// Notes table for AI-generated notes
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  documentId: integer("document_id").references(() => documents.id),
  title: text("title").notNull(),
  source: text("source").notNull(),
  date: timestamp("date").defaultNow(),
  content: json("content").notNull(),
});

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
  document: one(documents, {
    fields: [notes.documentId],
    references: [documents.id],
  }),
}));

// Flashcards table for studying
export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  deckId: integer("deck_id").notNull().references(() => flashcardDecks.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
});

// Flashcard decks table
export const flashcardDecks = pgTable("flashcard_decks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  icon: text("icon").default("book"),
  iconBg: text("icon_bg").default("#6366f1"),
  iconColor: text("icon_color").default("#ffffff"),
  lastStudied: timestamp("last_studied"),
  masteryPercentage: integer("mastery_percentage").default(0),
  statusColor: text("status_color").default("#6366f1"),
});

export const flashcardDecksRelations = relations(flashcardDecks, ({ one, many }) => ({
  user: one(users, {
    fields: [flashcardDecks.userId],
    references: [users.id],
  }),
  cards: many(flashcards),
}));

export const flashcardsRelations = relations(flashcards, ({ one }) => ({
  deck: one(flashcardDecks, {
    fields: [flashcards.deckId],
    references: [flashcardDecks.id],
  }),
}));

// Community thread posts
export const threadPosts = pgTable("thread_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  postedAt: timestamp("posted_at").defaultNow(),
  replyCount: integer("reply_count").default(0),
  isHot: boolean("is_hot").default(false),
  isGroupForming: boolean("is_group_forming").default(false),
});

export const threadPostsRelations = relations(threadPosts, ({ one }) => ({
  user: one(users, {
    fields: [threadPosts.userId],
    references: [users.id],
  }),
}));

// User insert schema
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  avatar: true,
});

// Document insert schema
export const insertDocumentSchema = createInsertSchema(documents).pick({
  userId: true,
  title: true,
  type: true,
  icon: true,
  pages: true,
});

// Note insert schema
export const insertNoteSchema = createInsertSchema(notes).pick({
  userId: true,
  documentId: true,
  title: true,
  source: true,
  content: true,
});

// Flashcard deck insert schema
export const insertFlashcardDeckSchema = createInsertSchema(flashcardDecks).pick({
  userId: true,
  title: true,
  icon: true,
  iconBg: true,
  iconColor: true,
});

// Flashcard insert schema
export const insertFlashcardSchema = createInsertSchema(flashcards).pick({
  deckId: true,
  question: true,
  answer: true,
});

// Thread post insert schema
export const insertThreadPostSchema = createInsertSchema(threadPosts).pick({
  userId: true,
  category: true,
  subcategory: true,
  title: true,
  content: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Note = typeof notes.$inferSelect;

export type InsertFlashcardDeck = z.infer<typeof insertFlashcardDeckSchema>;
export type FlashcardDeck = typeof flashcardDecks.$inferSelect;

export type InsertFlashcard = z.infer<typeof insertFlashcardSchema>;
export type Flashcard = typeof flashcards.$inferSelect;

export type InsertThreadPost = z.infer<typeof insertThreadPostSchema>;
export type ThreadPost = typeof threadPosts.$inferSelect;
