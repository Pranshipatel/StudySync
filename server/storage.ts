import { users, documents, notes, flashcardDecks, flashcards, threadPosts } from "@shared/schema";
import type { 
  User, InsertUser, 
  Document, InsertDocument,
  Note, InsertNote,
  FlashcardDeck, InsertFlashcardDeck,
  Flashcard, InsertFlashcard,
  ThreadPost, InsertThreadPost
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserXP(userId: number, xp: number): Promise<User>;
  
  // Document methods
  getDocuments(userId: number): Promise<Document[]>;
  getDocument(id: number): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocumentStatus(id: number, status: string): Promise<Document>;
  
  // Notes methods
  getNotes(userId: number): Promise<Note[]>;
  getNote(id: number): Promise<Note | undefined>;
  createNote(note: InsertNote): Promise<Note>;
  
  // Flashcard deck methods
  getFlashcardDecks(userId: number): Promise<FlashcardDeck[]>;
  getFlashcardDeck(id: number): Promise<FlashcardDeck | undefined>;
  createFlashcardDeck(deck: InsertFlashcardDeck): Promise<FlashcardDeck>;
  updateFlashcardDeckMastery(id: number, masteryPercentage: number): Promise<FlashcardDeck>;
  
  // Flashcard methods
  getFlashcards(deckId: number): Promise<Flashcard[]>;
  getFlashcard(id: number): Promise<Flashcard | undefined>;
  createFlashcard(flashcard: InsertFlashcard): Promise<Flashcard>;
  
  // Community thread methods
  getThreadPosts(): Promise<ThreadPost[]>;
  getThreadPost(id: number): Promise<ThreadPost | undefined>;
  createThreadPost(post: InsertThreadPost): Promise<ThreadPost>;
  updateThreadReplyCount(id: number, count: number): Promise<ThreadPost>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateUserXP(userId: number, xp: number): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ xp })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }
  
  // Document methods
  async getDocuments(userId: number): Promise<Document[]> {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.userId, userId))
      .orderBy(documents.uploadedAt);
  }
  
  async getDocument(id: number): Promise<Document | undefined> {
    const [document] = await db.select().from(documents).where(eq(documents.id, id));
    return document;
  }
  
  async createDocument(document: InsertDocument): Promise<Document> {
    const [newDocument] = await db.insert(documents).values(document).returning();
    return newDocument;
  }
  
  async updateDocumentStatus(id: number, status: string): Promise<Document> {
    const [document] = await db
      .update(documents)
      .set({ status })
      .where(eq(documents.id, id))
      .returning();
    return document;
  }
  
  // Notes methods
  async getNotes(userId: number): Promise<Note[]> {
    return await db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId))
      .orderBy(notes.date);
  }
  
  async getNote(id: number): Promise<Note | undefined> {
    const [note] = await db.select().from(notes).where(eq(notes.id, id));
    return note;
  }
  
  async createNote(note: InsertNote): Promise<Note> {
    const [newNote] = await db.insert(notes).values(note).returning();
    return newNote;
  }
  
  // Flashcard deck methods
  async getFlashcardDecks(userId: number): Promise<FlashcardDeck[]> {
    return await db
      .select()
      .from(flashcardDecks)
      .where(eq(flashcardDecks.userId, userId));
  }
  
  async getFlashcardDeck(id: number): Promise<FlashcardDeck | undefined> {
    const [deck] = await db.select().from(flashcardDecks).where(eq(flashcardDecks.id, id));
    return deck;
  }
  
  async createFlashcardDeck(deck: InsertFlashcardDeck): Promise<FlashcardDeck> {
    const [newDeck] = await db.insert(flashcardDecks).values(deck).returning();
    return newDeck;
  }
  
  async updateFlashcardDeckMastery(id: number, masteryPercentage: number): Promise<FlashcardDeck> {
    const now = new Date();
    const [deck] = await db
      .update(flashcardDecks)
      .set({ 
        masteryPercentage,
        lastStudied: now
      })
      .where(eq(flashcardDecks.id, id))
      .returning();
    return deck;
  }
  
  // Flashcard methods
  async getFlashcards(deckId: number): Promise<Flashcard[]> {
    return await db
      .select()
      .from(flashcards)
      .where(eq(flashcards.deckId, deckId));
  }
  
  async getFlashcard(id: number): Promise<Flashcard | undefined> {
    const [flashcard] = await db.select().from(flashcards).where(eq(flashcards.id, id));
    return flashcard;
  }
  
  async createFlashcard(flashcard: InsertFlashcard): Promise<Flashcard> {
    const [newFlashcard] = await db.insert(flashcards).values(flashcard).returning();
    return newFlashcard;
  }
  
  // Community thread methods
  async getThreadPosts(): Promise<ThreadPost[]> {
    return await db
      .select()
      .from(threadPosts)
      .orderBy(threadPosts.postedAt);
  }
  
  async getThreadPost(id: number): Promise<ThreadPost | undefined> {
    const [post] = await db.select().from(threadPosts).where(eq(threadPosts.id, id));
    return post;
  }
  
  async createThreadPost(post: InsertThreadPost): Promise<ThreadPost> {
    const [newPost] = await db.insert(threadPosts).values(post).returning();
    return newPost;
  }
  
  async updateThreadReplyCount(id: number, count: number): Promise<ThreadPost> {
    const [post] = await db
      .update(threadPosts)
      .set({ replyCount: count })
      .where(eq(threadPosts.id, id))
      .returning();
    return post;
  }
}

export const storage = new DatabaseStorage();
