// View types
export type View = "dashboard" | "notes" | "flashcards" | "community";

// User data types
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  xp: number;
}

// Study plan types
export interface StudyPlan {
  id: number;
  subject: string;
  topic: string;
  progress: number;
  progressColor: string;
}

// Recent activity types
export interface RecentActivity {
  id: number;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
}

// Leaderboard user types
export interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  xp: number;
  rank: number;
  isCurrentUser?: boolean;
}

// Document types
export interface UploadedDocument {
  id: number;
  title: string;
  type: "pdf" | "image" | "text";
  icon: string;
  uploadedAt: string;
  pages: number;
  status: "Processing" | "Processed";
}

export interface KeyPoint {
  title: string;
  description: string;
}

export interface Section {
  title: string;
  content: string;
}

export interface DocumentContent {
  keyPoints: KeyPoint[];
  sections: Section[];
}

export interface Document {
  id: number;
  title: string;
  source: string;
  date: string;
  content: DocumentContent;
}

// Study resource types
export interface StudyResource {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonColor: string;
  bgGradient: string;
  image: string;
}

// Flashcard types
export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export interface FlashcardDeck {
  id: number;
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  cardCount: number;
  lastStudied: string;
  masteryPercentage: number;
  statusColor: string;
  cards?: Flashcard[];
}

// Community types
export interface ThreadAuthor {
  name: string;
  avatar: string;
}

export interface ThreadPost {
  id: number;
  author: ThreadAuthor;
  category: string;
  subcategory: string;
  title: string;
  content: string;
  postedAt: string;
  replyCount: number;
  isHot?: boolean;
  isGroupForming?: boolean;
}

export interface Badge {
  text: string;
  bgColor: string;
  textColor: string;
}

export interface TopContributor {
  id: number;
  name: string;
  avatar: string;
  expertise: string;
  xp: number;
  badge: Badge;
}

export interface StudySession {
  id: number;
  title: string;
  time: string;
  participants: number;
  borderColor: string;
  actionColor: string;
}
