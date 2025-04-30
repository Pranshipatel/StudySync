import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./mongo-storage";
import { setupAuth } from "./auth";
import { setupChatRoutes } from "./chat";
import "./mongo"; // Initialize MongoDB connection

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  
  // Setup AI chat routes
  setupChatRoutes(app);
  
  // API endpoints for documents
  app.get("/api/documents", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    try {
      const userId = String(req.user!.id);
      const documents = await storage.getDocuments(userId);
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });
  
  // API endpoints for notes
  app.get("/api/notes", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    try {
      const userId = String(req.user!.id);
      const notes = await storage.getNotes(userId);
      res.json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  });
  
  // API endpoints for flashcard decks
  app.get("/api/flashcard-decks", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    try {
      const userId = String(req.user!.id);
      const decks = await storage.getFlashcardDecks(userId);
      res.json(decks);
    } catch (error) {
      console.error("Error fetching flashcard decks:", error);
      res.status(500).json({ error: "Failed to fetch flashcard decks" });
    }
  });
  
  // API endpoints for flashcards
  app.get("/api/flashcards/:deckId", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    try {
      const deckId = req.params.deckId;
      if (!deckId) {
        return res.status(400).json({ error: "Invalid deck ID" });
      }
      
      const flashcards = await storage.getFlashcards(deckId);
      res.json(flashcards);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      res.status(500).json({ error: "Failed to fetch flashcards" });
    }
  });
  
  // API endpoints for community threads
  app.get("/api/threads", async (req, res) => {
    try {
      const threads = await storage.getThreadPosts();
      res.json(threads);
    } catch (error) {
      console.error("Error fetching thread posts:", error);
      res.status(500).json({ error: "Failed to fetch thread posts" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
