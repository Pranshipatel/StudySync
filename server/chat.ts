import { Express, Request, Response } from "express";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Simple rule-based study assistant
class StudyAssistant {
  private responses: Record<string, string> = {
    // Study techniques
    "study techniques": "Effective study techniques include:\n1. Spaced repetition - spreading out study sessions over time\n2. Active recall - testing yourself on material\n3. The Pomodoro Technique - studying in focused 25-minute intervals\n4. Creating mind maps to visualize connections\n5. Teaching concepts to others to reinforce understanding",
    
    "memorize": "To memorize information effectively:\n1. Use mnemonic devices or acronyms\n2. Create visual associations\n3. Practice spaced repetition\n4. Break information into chunks\n5. Create stories or narratives from facts",
    
    "exam preparation": "To prepare for exams:\n1. Create a study schedule working backward from the exam date\n2. Focus on practice problems and past exams\n3. Implement active recall and self-testing\n4. Form study groups to discuss concepts\n5. Get adequate sleep before the exam",
    
    "procrastination": "To overcome procrastination:\n1. Break tasks into smaller, manageable steps\n2. Use the 5-minute rule - commit to just 5 minutes of work\n3. Remove distractions from your environment\n4. Set specific goals with deadlines\n5. Reward yourself after completing tasks",
    
    "note taking": "Effective note-taking methods include:\n1. Cornell Method - dividing paper into sections for notes, cues, and summary\n2. Mind mapping - creating visual diagrams of concepts\n3. Outline method - organizing information hierarchically\n4. Charting method - using tables for comparison\n5. Sentence method - writing complete thoughts in numbered sentences",
    
    // Subjects
    "photosynthesis": "Photosynthesis is the process by which plants convert light energy into chemical energy. The basic equation is:\n6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂\n\nThis occurs in chloroplasts and involves two main stages: light-dependent reactions and the Calvin cycle.",
    
    "mitosis": "Mitosis is cell division resulting in two identical daughter cells. The stages are:\n1. Prophase - chromosomes condense\n2. Metaphase - chromosomes align at the metaphase plate\n3. Anaphase - chromatids separate and move to opposite poles\n4. Telophase - nuclear membranes form\n5. Cytokinesis - cytoplasm divides",
    
    "world war 2": "World War II (1939-1945) was a global conflict with key causes including:\n1. Treaty of Versailles' harsh terms on Germany\n2. Global economic depression\n3. Rise of fascism and militarism\n4. Failure of appeasement policies\n5. German invasion of Poland in 1939",
    
    "quadratic equation": "The quadratic formula solves ax² + bx + c = 0:\nx = (-b ± √(b² - 4ac)) / 2a\n\nSteps to solve:\n1. Identify a, b, and c\n2. Calculate the discriminant (b² - 4ac)\n3. Substitute values into the formula\n4. Solve for x",
    
    // Motivation
    "motivation": "To stay motivated while studying:\n1. Set clear, achievable goals\n2. Create a dedicated study environment\n3. Use the Pomodoro Technique (25 min work, 5 min break)\n4. Reward yourself after completing tasks\n5. Connect your studies to your long-term goals",
    
    "focus": "To improve focus while studying:\n1. Eliminate distractions (silence notifications, use apps like Forest)\n2. Take regular short breaks\n3. Stay hydrated and maintain proper nutrition\n4. Exercise regularly to improve concentration\n5. Use background music without lyrics if it helps you concentrate",
    
    // General fallback
    "default": "I'm StudySync's AI assistant. I can help with study techniques, subject-specific questions, motivation tips, and more. Please ask me something related to your studies!"
  };
  
  generateResponse(message: string): string {
    const lowercaseMsg = message.toLowerCase();
    
    // Check for keyword matches
    for (const keyword in this.responses) {
      if (lowercaseMsg.includes(keyword)) {
        return this.responses[keyword];
      }
    }
    
    // Questions about the app itself
    if (lowercaseMsg.includes("studysync") || lowercaseMsg.includes("this app")) {
      return "StudySync is a comprehensive learning platform designed to enhance your study experience. It includes features like Smart Notes Generator, Personalized Study Assistant, Flashcards, and a Peer Learning Community. You can upload documents, create flashcards, track your progress, and connect with other students.";
    }
    
    // Specific subject questions
    if (lowercaseMsg.includes("math") || lowercaseMsg.includes("mathematics")) {
      return "StudySync can help with mathematics through our flashcard feature and AI assistant. Try creating flashcards for formulas and concepts, or ask specific questions about mathematical topics you're studying.";
    }
    
    if (lowercaseMsg.includes("science") || lowercaseMsg.includes("physics") || lowercaseMsg.includes("chemistry") || lowercaseMsg.includes("biology")) {
      return "StudySync is great for science subjects! You can upload textbooks or notes to generate summaries, create flashcards for scientific terms and concepts, and use the community feature to discuss difficult topics with peers.";
    }
    
    if (lowercaseMsg.includes("language") || lowercaseMsg.includes("english") || lowercaseMsg.includes("writing")) {
      return "For language learning and writing, StudySync offers tools to create vocabulary flashcards, upload and summarize texts, and connect with other language learners in the community section.";
    }
    
    if (lowercaseMsg.includes("help") || lowercaseMsg.includes("can you")) {
      return "I can help you with study techniques, subject explanations, motivation tips, and information about using StudySync. Feel free to ask about specific subjects or study methods!";
    }
    
    // Default response
    return this.responses["default"];
  }
}

const studyAssistant = new StudyAssistant();

export function setupChatRoutes(app: Express) {
  // Chat API endpoint
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }
      
      // Generate a response using our rule-based assistant
      const aiResponse = studyAssistant.generateResponse(message);

      // Send response back to client
      res.json({ response: aiResponse });
    } catch (error) {
      console.error("Error in chat API:", error);
      res.status(500).json({ error: "Failed to process your request" });
    }
  });

  // Status endpoint for the chat service
  app.get("/api/chat/status", (_req: Request, res: Response) => {
    res.json({ 
      available: true,
      message: "Rule-based study assistant is active" 
    });
  });
}