import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export default function StudyAI() {
  const initialMessage = {
    role: "system" as const,
    content: "Welcome to StudySync AI Assistant! Ask me anything about your studies. Try questions about study techniques, specific subjects, or how to use StudySync.",
    timestamp: new Date()
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  // Function to clear chat history
  const clearChat = () => {
    setMessages([{...initialMessage, timestamp: new Date()}]);
    toast({
      title: "Chat cleared",
      description: "Your conversation has been reset.",
      duration: 3000,
    });
  };
  
  // Example questions to help users
  const exampleQuestions = [
    "How can I improve my focus while studying?",
    "What are effective study techniques?",
    "Explain photosynthesis",
    "Help me with quadratic equations",
    "What is the Pomodoro technique?",
    "How do I take better notes?",
    "How can StudySync help with science subjects?"
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleExampleClick = (question: string) => {
    setInput(question);
    chatInputRef.current?.focus();
  };

  // Fast local response function
  const getLocalResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    // Fast keyword matching for common topics
    if (lowerMsg.includes("study technique") || lowerMsg.includes("study method")) {
      return "Effective study techniques include:\n1. Spaced repetition - spreading out study sessions over time\n2. Active recall - testing yourself on material\n3. The Pomodoro Technique - studying in focused 25-minute intervals\n4. Creating mind maps to visualize connections\n5. Teaching concepts to others to reinforce understanding";
    }
    
    if (lowerMsg.includes("focus") || lowerMsg.includes("concentrate")) {
      return "To improve focus while studying:\n1. Eliminate distractions (silence notifications, use apps like Forest)\n2. Take regular short breaks\n3. Stay hydrated and maintain proper nutrition\n4. Exercise regularly to improve concentration\n5. Use background music without lyrics if it helps you concentrate";
    }
    
    if (lowerMsg.includes("memorize") || lowerMsg.includes("remember")) {
      return "To memorize information effectively:\n1. Use mnemonic devices or acronyms\n2. Create visual associations\n3. Practice spaced repetition\n4. Break information into chunks\n5. Create stories or narratives from facts";
    }
    
    if (lowerMsg.includes("motivation") || lowerMsg.includes("motivated")) {
      return "To stay motivated while studying:\n1. Set clear, achievable goals\n2. Create a dedicated study environment\n3. Use the Pomodoro Technique (25 min work, 5 min break)\n4. Reward yourself after completing tasks\n5. Connect your studies to your long-term goals";
    }
    
    if (lowerMsg.includes("note") || lowerMsg.includes("taking notes")) {
      return "Effective note-taking methods include:\n1. Cornell Method - dividing paper into sections for notes, cues, and summary\n2. Mind mapping - creating visual diagrams of concepts\n3. Outline method - organizing information hierarchically\n4. Charting method - using tables for comparison\n5. Sentence method - writing complete thoughts in numbered sentences";
    }
    
    if (lowerMsg.includes("exam") || lowerMsg.includes("test prep")) {
      return "To prepare for exams:\n1. Create a study schedule working backward from the exam date\n2. Focus on practice problems and past exams\n3. Implement active recall and self-testing\n4. Form study groups to discuss concepts\n5. Get adequate sleep before the exam";
    }
    
    // Default response
    return "I'm StudySync's AI assistant. I can help with study techniques, subject explanations, motivation tips, and information about using StudySync. Try asking about specific subjects or study methods!";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    const savedInput = input; // Save input before clearing
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Use fast local response for immediate feedback
    const aiResponse = getLocalResponse(savedInput);
    
    // Super fast response with minimal delay
    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 200);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat bubble button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? (
          <i className="fas fa-times text-xl"></i>
        ) : (
          <i className="fas fa-robot text-xl"></i>
        )}
      </button>
      
      {/* Close/remove button - larger and more visible */}
      {isOpen && (
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute bottom-20 right-4 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
          aria-label="Close chat"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      )}
      
      {/* Chat panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-300 flex flex-col max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white px-5 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-3 text-xl bg-white text-black rounded-full w-10 h-10 flex items-center justify-center">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg">StudySync AI</h3>
                <p className="text-xs text-gray-300">Your Study Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Clear Chat button */}
              <button 
                onClick={clearChat} 
                className="bg-black text-white hover:bg-gray-800 rounded-full px-3 py-1 flex items-center text-sm font-medium shadow-sm"
                aria-label="Clear chat"
                title="Clear chat history"
              >
                <i className="fas fa-trash-alt mr-1"></i>
                <span className="hidden sm:inline">Clear</span>
              </button>
              
              {/* Close button */}
              <button 
                onClick={() => setIsOpen(false)} 
                className="bg-black text-white hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                aria-label="Close chat"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto max-h-96 flex flex-col gap-4">
            {/* Example questions */}
            <div className="pb-3 mb-3 border-b border-gray-200">
              <p className="text-sm text-gray-700 font-medium mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {exampleQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="text-xs bg-black hover:bg-gray-800 text-white px-3 py-1.5 rounded-full transition-colors shadow-sm"
                  >
                    {question.length > 25 ? question.substring(0, 22) + "..." : question}
                  </button>
                ))}
              </div>
            </div>
            
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                    message.role === "user" 
                      ? "bg-black text-white rounded-tr-none" 
                      : message.role === "system"
                        ? "bg-gray-800 text-white border border-gray-700"
                        : "bg-gray-800 text-white rounded-tl-none"
                  }`}
                >
                  {message.content.split('\n').map((line, i) => (
                    <span key={i} className="leading-relaxed">
                      {line}
                      {i < message.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                  <div className={`text-xs mt-1.5 ${message.role === "user" ? "text-gray-300" : "text-gray-300"}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-white px-4 py-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-500 animate-bounce"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-100">
            <div className="flex shadow-md rounded-full overflow-hidden">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your studies..."
                className="flex-1 border-0 px-4 py-3 focus:outline-none focus:ring-0"
                disabled={isLoading}
                ref={chatInputRef}
              />
              <button 
                type="submit" 
                className="bg-black text-white px-5 hover:bg-gray-800 disabled:opacity-70"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-paper-plane"></i>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}