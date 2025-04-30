import { User, Document, Note, FlashcardDeck, Flashcard, ThreadPost } from "./mongo";
import session from "express-session";
import MongoStore from "connect-mongo";
import type { Store } from "express-session";
import memorystore from "memorystore";

const MemoryStore = memorystore(session);

// Types for our storage interface
export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  xp: number;
  createdAt: Date;
}

export interface IDocument {
  id: string;
  userId: string;
  title: string;
  type: string;
  icon: string;
  pages: number;
  uploadedAt: Date;
  status: string;
}

export interface INote {
  id: string;
  userId: string;
  title: string;
  source: string;
  date: Date;
  content: {
    keyPoints: Array<{ title: string; description: string }>;
    sections: Array<{ title: string; content: string }>;
  };
}

export interface IFlashcardDeck {
  id: string;
  userId: string;
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  cardCount: number;
  lastStudied: Date;
  masteryPercentage: number;
  statusColor: string;
}

export interface IFlashcard {
  id: string;
  deckId: string;
  question: string;
  answer: string;
}

export interface IThreadPost {
  id: string;
  userId: string;
  category: string;
  subcategory: string;
  title: string;
  content: string;
  postedAt: Date;
  replyCount: number;
  isHot: boolean;
  isGroupForming: boolean;
  author: {
    name: string;
    avatar: string;
  };
}

// Type definitions for inserting data
export type InsertUser = Omit<IUser, "id" | "createdAt"> & { createdAt?: Date };
export type InsertDocument = Omit<IDocument, "id" | "uploadedAt" | "pages" | "status"> & { 
  uploadedAt?: Date;
  pages?: number;
  status?: string;
};
export type InsertNote = Omit<INote, "id" | "date"> & { date?: Date };
export type InsertFlashcardDeck = Omit<IFlashcardDeck, "id" | "cardCount" | "lastStudied" | "masteryPercentage"> & {
  cardCount?: number;
  lastStudied?: Date;
  masteryPercentage?: number;
};
export type InsertFlashcard = Omit<IFlashcard, "id">;
export type InsertThreadPost = Omit<IThreadPost, "id" | "postedAt" | "replyCount" | "isHot" | "isGroupForming"> & {
  postedAt?: Date;
  replyCount?: number;
  isHot?: boolean;
  isGroupForming?: boolean;
};

export interface IStorage {
  // User methods
  getUser(id: string): Promise<IUser | undefined>;
  getUserByUsername(username: string): Promise<IUser | undefined>;
  createUser(user: InsertUser): Promise<IUser>;
  updateUserXP(userId: string, xp: number): Promise<IUser>;
  
  // Document methods
  getDocuments(userId: string): Promise<IDocument[]>;
  getDocument(id: string): Promise<IDocument | undefined>;
  createDocument(document: InsertDocument): Promise<IDocument>;
  updateDocumentStatus(id: string, status: string): Promise<IDocument>;
  
  // Notes methods
  getNotes(userId: string): Promise<INote[]>;
  getNote(id: string): Promise<INote | undefined>;
  createNote(note: InsertNote): Promise<INote>;
  
  // Flashcard deck methods
  getFlashcardDecks(userId: string): Promise<IFlashcardDeck[]>;
  getFlashcardDeck(id: string): Promise<IFlashcardDeck | undefined>;
  createFlashcardDeck(deck: InsertFlashcardDeck): Promise<IFlashcardDeck>;
  updateFlashcardDeckMastery(id: string, masteryPercentage: number): Promise<IFlashcardDeck>;
  
  // Flashcard methods
  getFlashcards(deckId: string): Promise<IFlashcard[]>;
  getFlashcard(id: string): Promise<IFlashcard | undefined>;
  createFlashcard(flashcard: InsertFlashcard): Promise<IFlashcard>;
  
  // Community thread methods
  getThreadPosts(): Promise<IThreadPost[]>;
  getThreadPost(id: string): Promise<IThreadPost | undefined>;
  createThreadPost(post: InsertThreadPost): Promise<IThreadPost>;
  updateThreadReplyCount(id: string, count: number): Promise<IThreadPost>;
  
  // Session store
  sessionStore: Store;
}

export class MongoStorage implements IStorage {
  sessionStore: Store;
  
  constructor() {
    // For development, we just use in-memory session store
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // Prune expired entries every 24h
    });
    console.log('Using memory session store');
  }
  
  // Helper function to convert MongoDB document to our interface format
  private documentToUser(doc: any): IUser {
    if (!doc) throw new Error("User document is undefined");
    return {
      id: doc._id.toString(),
      username: doc.username,
      email: doc.email,
      password: doc.password,
      avatar: doc.avatar,
      xp: doc.xp,
      createdAt: doc.createdAt
    };
  }
  
  private documentToDocument(doc: any): IDocument {
    if (!doc) throw new Error("Document is undefined");
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      title: doc.title,
      type: doc.type,
      icon: doc.icon,
      pages: doc.pages,
      uploadedAt: doc.uploadedAt,
      status: doc.status
    };
  }
  
  private documentToNote(doc: any): INote {
    if (!doc) throw new Error("Note is undefined");
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      title: doc.title,
      source: doc.source,
      date: doc.date,
      content: doc.content
    };
  }
  
  private documentToFlashcardDeck(doc: any): IFlashcardDeck {
    if (!doc) throw new Error("FlashcardDeck is undefined");
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      title: doc.title,
      icon: doc.icon,
      iconBg: doc.iconBg,
      iconColor: doc.iconColor,
      cardCount: doc.cardCount,
      lastStudied: doc.lastStudied,
      masteryPercentage: doc.masteryPercentage,
      statusColor: doc.statusColor
    };
  }
  
  private documentToFlashcard(doc: any): IFlashcard {
    if (!doc) throw new Error("Flashcard is undefined");
    return {
      id: doc._id.toString(),
      deckId: doc.deckId.toString(),
      question: doc.question,
      answer: doc.answer
    };
  }
  
  private documentToThreadPost(doc: any): IThreadPost {
    if (!doc) throw new Error("ThreadPost is undefined");
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      category: doc.category,
      subcategory: doc.subcategory,
      title: doc.title,
      content: doc.content,
      postedAt: doc.postedAt,
      replyCount: doc.replyCount,
      isHot: doc.isHot,
      isGroupForming: doc.isGroupForming,
      author: doc.author
    };
  }
  
  // User methods
  async getUser(id: string): Promise<IUser | undefined> {
    try {
      const user = await User.findById(id);
      if (!user) return undefined;
      return this.documentToUser(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
  }
  
  async getUserByUsername(username: string): Promise<IUser | undefined> {
    try {
      const user = await User.findOne({ username });
      if (!user) return undefined;
      return this.documentToUser(user);
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
  }
  
  async createUser(user: InsertUser): Promise<IUser> {
    try {
      const newUser = new User(user);
      await newUser.save();
      return this.documentToUser(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  async updateUserXP(userId: string, xp: number): Promise<IUser> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { xp },
        { new: true }
      );
      if (!user) throw new Error("User not found");
      return this.documentToUser(user);
    } catch (error) {
      console.error('Error updating user XP:', error);
      throw error;
    }
  }
  
  // Document methods
  async getDocuments(userId: string): Promise<IDocument[]> {
    try {
      const documents = await Document.find({ userId }).sort({ uploadedAt: 1 });
      return documents.map(doc => this.documentToDocument(doc));
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  }
  
  async getDocument(id: string): Promise<IDocument | undefined> {
    try {
      const document = await Document.findById(id);
      if (!document) return undefined;
      return this.documentToDocument(document);
    } catch (error) {
      console.error('Error fetching document:', error);
      return undefined;
    }
  }
  
  async createDocument(document: InsertDocument): Promise<IDocument> {
    try {
      const newDocument = new Document(document);
      await newDocument.save();
      return this.documentToDocument(newDocument);
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }
  
  async updateDocumentStatus(id: string, status: string): Promise<IDocument> {
    try {
      const document = await Document.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!document) throw new Error("Document not found");
      return this.documentToDocument(document);
    } catch (error) {
      console.error('Error updating document status:', error);
      throw error;
    }
  }
  
  // Notes methods
  async getNotes(userId: string): Promise<INote[]> {
    try {
      const notes = await Note.find({ userId }).sort({ date: 1 });
      return notes.map(note => this.documentToNote(note));
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
  }
  
  async getNote(id: string): Promise<INote | undefined> {
    try {
      const note = await Note.findById(id);
      if (!note) return undefined;
      return this.documentToNote(note);
    } catch (error) {
      console.error('Error fetching note:', error);
      return undefined;
    }
  }
  
  async createNote(note: InsertNote): Promise<INote> {
    try {
      const newNote = new Note(note);
      await newNote.save();
      return this.documentToNote(newNote);
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  }
  
  // Flashcard deck methods
  async getFlashcardDecks(userId: string): Promise<IFlashcardDeck[]> {
    try {
      const decks = await FlashcardDeck.find({ userId });
      return decks.map(deck => this.documentToFlashcardDeck(deck));
    } catch (error) {
      console.error('Error fetching flashcard decks:', error);
      return [];
    }
  }
  
  async getFlashcardDeck(id: string): Promise<IFlashcardDeck | undefined> {
    try {
      const deck = await FlashcardDeck.findById(id);
      if (!deck) return undefined;
      return this.documentToFlashcardDeck(deck);
    } catch (error) {
      console.error('Error fetching flashcard deck:', error);
      return undefined;
    }
  }
  
  async createFlashcardDeck(deck: InsertFlashcardDeck): Promise<IFlashcardDeck> {
    try {
      const newDeck = new FlashcardDeck(deck);
      await newDeck.save();
      return this.documentToFlashcardDeck(newDeck);
    } catch (error) {
      console.error('Error creating flashcard deck:', error);
      throw error;
    }
  }
  
  async updateFlashcardDeckMastery(id: string, masteryPercentage: number): Promise<IFlashcardDeck> {
    try {
      const now = new Date();
      const deck = await FlashcardDeck.findByIdAndUpdate(
        id,
        { 
          masteryPercentage,
          lastStudied: now
        },
        { new: true }
      );
      if (!deck) throw new Error("Flashcard deck not found");
      return this.documentToFlashcardDeck(deck);
    } catch (error) {
      console.error('Error updating flashcard deck mastery:', error);
      throw error;
    }
  }
  
  // Flashcard methods
  async getFlashcards(deckId: string): Promise<IFlashcard[]> {
    try {
      const flashcards = await Flashcard.find({ deckId });
      return flashcards.map(card => this.documentToFlashcard(card));
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      return [];
    }
  }
  
  async getFlashcard(id: string): Promise<IFlashcard | undefined> {
    try {
      const flashcard = await Flashcard.findById(id);
      if (!flashcard) return undefined;
      return this.documentToFlashcard(flashcard);
    } catch (error) {
      console.error('Error fetching flashcard:', error);
      return undefined;
    }
  }
  
  async createFlashcard(flashcard: InsertFlashcard): Promise<IFlashcard> {
    try {
      const newFlashcard = new Flashcard(flashcard);
      await newFlashcard.save();
      
      // Update card count in the deck
      const deckId = flashcard.deckId;
      const count = await Flashcard.countDocuments({ deckId });
      await FlashcardDeck.findByIdAndUpdate(
        deckId,
        { cardCount: count }
      );
      
      return this.documentToFlashcard(newFlashcard);
    } catch (error) {
      console.error('Error creating flashcard:', error);
      throw error;
    }
  }
  
  // Community thread methods
  async getThreadPosts(): Promise<IThreadPost[]> {
    try {
      const threads = await ThreadPost.find().sort({ postedAt: 1 });
      return threads.map(thread => this.documentToThreadPost(thread));
    } catch (error) {
      console.error('Error fetching thread posts:', error);
      return [];
    }
  }
  
  async getThreadPost(id: string): Promise<IThreadPost | undefined> {
    try {
      const post = await ThreadPost.findById(id);
      if (!post) return undefined;
      return this.documentToThreadPost(post);
    } catch (error) {
      console.error('Error fetching thread post:', error);
      return undefined;
    }
  }
  
  async createThreadPost(post: InsertThreadPost): Promise<IThreadPost> {
    try {
      const newPost = new ThreadPost(post);
      await newPost.save();
      return this.documentToThreadPost(newPost);
    } catch (error) {
      console.error('Error creating thread post:', error);
      throw error;
    }
  }
  
  async updateThreadReplyCount(id: string, count: number): Promise<IThreadPost> {
    try {
      const post = await ThreadPost.findByIdAndUpdate(
        id,
        { replyCount: count },
        { new: true }
      );
      if (!post) throw new Error("Thread post not found");
      return this.documentToThreadPost(post);
    } catch (error) {
      console.error('Error updating thread reply count:', error);
      throw error;
    }
  }
}

export const storage = new MongoStorage();