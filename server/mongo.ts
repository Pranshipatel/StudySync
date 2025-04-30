import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer: MongoMemoryServer | null = null;

// Use in-memory MongoMemoryServer for development since we're having connection issues
async function connectToMongoDB() {
  try {
    // Use in-memory database for development (this ensures we can proceed without MongoDB issues)
    console.log('Initializing in-memory MongoDB server...');
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();
    await mongoose.connect(uri);
    console.log('Connected to in-memory MongoDB server');
    
    // Seed the database with some initial data if needed
    console.log('MongoDB ready for use');
  } catch (error) {
    console.error('MongoDB memory server error:', error);
    process.exit(1);
  }
}

// Clean up memory server on process exit
process.on('SIGINT', async () => {
  if (mongoMemoryServer) {
    await mongoose.connection.close();
    await mongoMemoryServer.stop();
    console.log('Closed in-memory MongoDB server');
  }
  process.exit(0);
});

// Connect to MongoDB
connectToMongoDB();

// Define schemas for all our models
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "https://randomuser.me/api/portraits/men/32.jpg" },
  xp: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: { type: String, required: true }, // "pdf", "image", "text"
  icon: { type: String, required: true },
  pages: { type: Number, default: 1 },
  uploadedAt: { type: Date, default: Date.now },
  status: { type: String, default: "Processing" }
});

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  source: { type: String, required: true },
  date: { type: Date, default: Date.now },
  content: {
    keyPoints: [{ 
      title: String, 
      description: String 
    }],
    sections: [{ 
      title: String, 
      content: String 
    }]
  }
});

const flashcardDeckSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  icon: { type: String, required: true },
  iconBg: { type: String, required: true },
  iconColor: { type: String, required: true },
  cardCount: { type: Number, default: 0 },
  lastStudied: { type: Date, default: Date.now },
  masteryPercentage: { type: Number, default: 0 },
  statusColor: { type: String, required: true }
});

const flashcardSchema = new mongoose.Schema({
  deckId: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardDeck', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const threadPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
  replyCount: { type: Number, default: 0 },
  isHot: { type: Boolean, default: false },
  isGroupForming: { type: Boolean, default: false },
  author: {
    name: { type: String, required: true },
    avatar: { type: String, required: true }
  }
});

// Create models from schemas
export const User = mongoose.model('User', userSchema);
export const Document = mongoose.model('Document', documentSchema);
export const Note = mongoose.model('Note', noteSchema);
export const FlashcardDeck = mongoose.model('FlashcardDeck', flashcardDeckSchema);
export const Flashcard = mongoose.model('Flashcard', flashcardSchema);
export const ThreadPost = mongoose.model('ThreadPost', threadPostSchema);

export default mongoose;