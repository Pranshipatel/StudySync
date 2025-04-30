import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { currentUser, flashcardDecks, generatedNotes, uploadedDocuments } from "../lib/data";
import { Document, FlashcardDeck, UploadedDocument, View, User } from "../types";

interface AppContextType {
  activeView: View;
  setActiveView: (view: View) => void;
  user: User | null;
  documents: UploadedDocument[];
  setDocuments: (docs: UploadedDocument[]) => void;
  addDocument: (doc: UploadedDocument) => void;
  notes: Document[];
  setNotes: (notes: Document[]) => void;
  addNote: (note: Document) => void;
  decks: FlashcardDeck[];
  setDecks: (decks: FlashcardDeck[]) => void;
  addDeck: (deck: FlashcardDeck) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (isOpen: boolean) => void;
  isFlashcardStudyOpen: boolean;
  setIsFlashcardStudyOpen: (isOpen: boolean) => void;
  selectedDeck: FlashcardDeck | null;
  setSelectedDeck: (deck: FlashcardDeck | null) => void;
  currentFlashcardIndex: number;
  setCurrentFlashcardIndex: (index: number) => void;
  isCardFlipped: boolean;
  setIsCardFlipped: (isFlipped: boolean) => void;
  initializeLocalStorage: () => void;
  // Auth functions
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock users for frontend-only implementation
interface StoredUser {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
  xp: number;
}

const mockUsers: StoredUser[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@studysync.com",
    password: "password",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    xp: 1450
  }
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // View state
  const [activeView, setActiveView] = useState<View>("dashboard");
  
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Data state
  const [documents, setDocuments] = useState<UploadedDocument[]>(uploadedDocuments);
  const [notes, setNotes] = useState<Document[]>(generatedNotes);
  const [decks, setDecks] = useState<FlashcardDeck[]>(flashcardDecks);
  const [storedUsers, setStoredUsers] = useState<StoredUser[]>(mockUsers);
  
  // UI state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isFlashcardStudyOpen, setIsFlashcardStudyOpen] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('studysync_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
    
    const storedUsers = localStorage.getItem('studysync_stored_users');
    if (storedUsers) {
      setStoredUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with mock users
      localStorage.setItem('studysync_stored_users', JSON.stringify(mockUsers));
    }
  }, []);
  
  // Authentication functions
  const login = useCallback(async (username: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('studysync_stored_users') || JSON.stringify(mockUsers));
        const foundUser = users.find((u: StoredUser) => 
          u.username === username && u.password === password);
          
        if (foundUser) {
          const userObj: User = {
            id: foundUser.id,
            name: foundUser.username,
            email: foundUser.email,
            avatar: foundUser.avatar,
            xp: foundUser.xp
          };
          
          setUser(userObj);
          setIsAuthenticated(true);
          localStorage.setItem('studysync_user', JSON.stringify(userObj));
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  }, []);
  
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('studysync_user');
  }, []);
  
  const register = useCallback(async (username: string, email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('studysync_stored_users') || JSON.stringify(mockUsers));
        
        if (users.some((u: StoredUser) => u.username === username)) {
          reject(new Error("Username already exists"));
          return;
        }
        
        const newId = users.length > 0 ? Math.max(...users.map((u: StoredUser) => u.id)) + 1 : 1;
        
        const newUser: StoredUser = {
          id: newId,
          username,
          email,
          password,
          avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg`,
          xp: 0
        };
        
        const newUserObj: User = {
          id: newUser.id,
          name: newUser.username,
          email: newUser.email,
          avatar: newUser.avatar,
          xp: newUser.xp
        };
        
        const updatedUsers = [...users, newUser];
        setStoredUsers(updatedUsers);
        localStorage.setItem('studysync_stored_users', JSON.stringify(updatedUsers));
        
        setUser(newUserObj);
        setIsAuthenticated(true);
        localStorage.setItem('studysync_user', JSON.stringify(newUserObj));
        
        resolve();
      }, 800);
    });
  }, []);

  // Add document helper
  const addDocument = useCallback((doc: UploadedDocument) => {
    setDocuments(prev => [doc, ...prev]);
  }, []);

  // Add note helper
  const addNote = useCallback((note: Document) => {
    setNotes(prev => [note, ...prev]);
  }, []);

  // Add deck helper
  const addDeck = useCallback((deck: FlashcardDeck) => {
    setDecks(prev => [deck, ...prev]);
  }, []);

  // Initialize local storage
  const initializeLocalStorage = useCallback(() => {
    // Load data from localStorage if available
    const storedDocuments = localStorage.getItem('studysync_documents');
    const storedNotes = localStorage.getItem('studysync_notes');
    const storedDecks = localStorage.getItem('studysync_decks');
    
    if (storedDocuments) {
      setDocuments(JSON.parse(storedDocuments));
    }
    
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
    
    if (storedDecks) {
      setDecks(JSON.parse(storedDecks));
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('studysync_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('studysync_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('studysync_decks', JSON.stringify(decks));
  }, [decks]);

  useEffect(() => {
    localStorage.setItem('studysync_stored_users', JSON.stringify(storedUsers));
  }, [storedUsers]);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        user,
        documents,
        setDocuments,
        addDocument,
        notes,
        setNotes,
        addNote,
        decks,
        setDecks,
        addDeck,
        isUploadModalOpen,
        setIsUploadModalOpen,
        isFlashcardStudyOpen,
        setIsFlashcardStudyOpen,
        selectedDeck,
        setSelectedDeck,
        currentFlashcardIndex,
        setCurrentFlashcardIndex,
        isCardFlipped,
        setIsCardFlipped,
        initializeLocalStorage,
        isAuthenticated,
        login,
        logout,
        register
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
