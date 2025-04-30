import { Document, FlashcardDeck, LeaderboardUser, RecentActivity, StudyPlan, StudyResource, StudySession, ThreadPost, TopContributor, UploadedDocument } from "../types";

// Mock user data
export const currentUser = {
  id: 1,
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  xp: 425
};

// Study plans data
export const studyPlans: StudyPlan[] = [
  {
    id: 1,
    subject: "Physics",
    topic: "Quantum Mechanics",
    progress: 35,
    progressColor: "bg-red-500"
  },
  {
    id: 2,
    subject: "Biology",
    topic: "Cell Structure",
    progress: 65,
    progressColor: "bg-yellow-500"
  },
  {
    id: 3,
    subject: "Math",
    topic: "Calculus II",
    progress: 85,
    progressColor: "bg-green-500"
  }
];

// Recent activities data
export const recentActivities: RecentActivity[] = [
  {
    id: 1,
    title: "Created 15 flashcards",
    description: "Organic Chemistry - 2 hours ago",
    icon: "book",
    bgColor: "bg-primary-500"
  },
  {
    id: 2,
    title: "Answered 3 community questions",
    description: "Physics Forum - 5 hours ago",
    icon: "users",
    bgColor: "bg-accent-500"
  },
  {
    id: 3,
    title: "Generated study notes",
    description: "World History - Yesterday",
    icon: "robot",
    bgColor: "bg-secondary-500"
  }
];

// Leaderboard data
export const leaderboardUsers: LeaderboardUser[] = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    xp: 950,
    rank: 1
  },
  {
    id: 2,
    name: "Marcus Williams",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    xp: 780,
    rank: 2
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    xp: 645,
    rank: 3
  },
  {
    id: 4,
    name: "You",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    xp: 425,
    rank: 7,
    isCurrentUser: true
  }
];

// Recently uploaded documents
export const uploadedDocuments: UploadedDocument[] = [
  {
    id: 1,
    title: "Organic Chemistry Textbook",
    type: "pdf",
    icon: "file-pdf",
    uploadedAt: "2 days ago",
    pages: 245,
    status: "Processed"
  },
  {
    id: 2,
    title: "Physics Lecture Slides",
    type: "image",
    icon: "file-image",
    uploadedAt: "5 days ago",
    pages: 42,
    status: "Processed"
  },
  {
    id: 3,
    title: "History Research Paper",
    type: "text",
    icon: "file-alt",
    uploadedAt: "1 week ago",
    pages: 15,
    status: "Processed"
  }
];

// Study resources
export const studyResources: StudyResource[] = [
  {
    id: 1,
    title: "Join Study Groups",
    description: "Connect with peers studying the same subjects",
    buttonText: "Explore Groups",
    buttonColor: "text-primary-600",
    bgGradient: "bg-gradient-to-r from-primary-500 to-primary-600",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Resource Library",
    description: "Access shared notes and materials from top students",
    buttonText: "Browse Library",
    buttonColor: "text-secondary-600",
    bgGradient: "bg-gradient-to-r from-secondary-500 to-secondary-600",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "AI Tutor Sessions",
    description: "Get personalized help with difficult concepts",
    buttonText: "Start Session",
    buttonColor: "text-accent-600",
    bgGradient: "bg-gradient-to-r from-accent-500 to-accent-600",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

// Generated notes from documents
export const generatedNotes: Document[] = [
  {
    id: 1,
    title: "Organic Chemistry: Functional Groups",
    source: "Organic Chemistry Textbook",
    date: "3 days ago",
    content: {
      keyPoints: [
        { title: "Alcohols (-OH):", description: "React with carboxylic acids to form esters" },
        { title: "Aldehydes (-CHO):", description: "Easily oxidized to carboxylic acids" },
        { title: "Ketones (C=O):", description: "Cannot be easily oxidized further" },
        { title: "Carboxylic Acids (-COOH):", description: "Acidic compounds that form esters with alcohols" }
      ],
      sections: [
        {
          title: "Reaction Patterns",
          content: "Nucleophilic addition reactions are common for aldehydes and ketones. The carbonyl group (C=O) is polarized, making the carbon electrophilic and susceptible to attack by nucleophiles."
        }
      ]
    }
  },
  {
    id: 2,
    title: "Physics: Quantum Mechanics Fundamentals",
    source: "Physics Lecture Slides",
    date: "5 days ago",
    content: {
      keyPoints: [
        { title: "Wave-Particle Duality:", description: "Light and matter exhibit properties of both waves and particles" },
        { title: "Uncertainty Principle:", description: "Cannot simultaneously know exact position and momentum" },
        { title: "Schrödinger Equation:", description: "Describes how quantum state changes over time" },
        { title: "Quantum Superposition:", description: "Particles exist in multiple states simultaneously until measured" }
      ],
      sections: [
        {
          title: "Mathematical Formulations",
          content: "The time-independent Schrödinger equation is written as HΨ = EΨ, where H is the Hamiltonian operator, Ψ is the wave function, and E is the energy of the system."
        }
      ]
    }
  }
];

// Flashcard decks
export const flashcardDecks: FlashcardDeck[] = [
  {
    id: 1,
    title: "Organic Chemistry",
    icon: "layer-group",
    iconBg: "bg-primary-100",
    iconColor: "text-primary-600",
    cardCount: 32,
    lastStudied: "2 days ago",
    masteryPercentage: 75,
    statusColor: "bg-green-100 text-green-800"
  },
  {
    id: 2,
    title: "Quantum Physics",
    icon: "atom",
    iconBg: "bg-secondary-100",
    iconColor: "text-secondary-600",
    cardCount: 45,
    lastStudied: "today",
    masteryPercentage: 35,
    statusColor: "bg-yellow-100 text-yellow-800",
    cards: [
      {
        id: 1,
        question: "What is Heisenberg's Uncertainty Principle?",
        answer: "Heisenberg's Uncertainty Principle states that it is impossible to simultaneously know both the exact position and momentum of a particle. The more precisely one property is measured, the less precisely the other can be known.\n\nMathematically expressed as: ΔxΔp ≥ ħ/2\n\nWhere Δx is the uncertainty in position, Δp is the uncertainty in momentum, and ħ is the reduced Planck constant."
      },
      {
        id: 2,
        question: "What is quantum entanglement?",
        answer: "Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle of the group cannot be described independently of the state of the others, including when the particles are separated by a large distance."
      },
      {
        id: 3,
        question: "What is wave-particle duality?",
        answer: "Wave-particle duality is the concept that every particle or quantum entity may be described as either a particle or a wave. It expresses the inability of the classical concepts 'particle' or 'wave' to fully describe the behavior of quantum-scale objects."
      }
    ]
  },
  {
    id: 3,
    title: "Calculus II",
    icon: "calculator",
    iconBg: "bg-accent-100",
    iconColor: "text-accent-600",
    cardCount: 28,
    lastStudied: "3 days ago",
    masteryPercentage: 85,
    statusColor: "bg-green-100 text-green-800"
  },
  {
    id: 4,
    title: "Cell Biology",
    icon: "dna",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    cardCount: 52,
    lastStudied: "1 week ago",
    masteryPercentage: 65,
    statusColor: "bg-yellow-100 text-yellow-800"
  }
];

// Community discussions
export const communityThreads: ThreadPost[] = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    category: "Physics",
    subcategory: "Quantum Mechanics",
    title: "Can someone explain the double-slit experiment in simple terms?",
    content: "I'm having trouble understanding the implications of the double-slit experiment in quantum mechanics. The textbook explanation is confusing me...",
    postedAt: "2 hours ago",
    replyCount: 14,
    isHot: true
  },
  {
    id: 2,
    author: {
      name: "Marcus Williams",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    category: "Chemistry",
    subcategory: "Organic Chemistry",
    title: "Need help with SN1 vs SN2 reaction mechanisms",
    content: "I'm confused about when a reaction follows SN1 vs SN2 pathway. What are the key factors that determine the mechanism? I've been trying to solve these practice problems...",
    postedAt: "5 hours ago",
    replyCount: 8
  },
  {
    id: 3,
    author: {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    category: "Mathematics",
    subcategory: "Calculus",
    title: "Looking for study partners for Calculus II final exam",
    content: "Is anyone studying for the Calculus II final next week? I'm looking to form a study group to review integration techniques, series, and parametric equations...",
    postedAt: "yesterday",
    replyCount: 21,
    isGroupForming: true
  }
];

// Top contributors
export const topContributors: TopContributor[] = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    expertise: "Physics Expert",
    xp: 950,
    badge: {
      text: "PhD Student",
      bgColor: "bg-primary-100",
      textColor: "text-primary-800"
    }
  },
  {
    id: 2,
    name: "Marcus Williams",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    expertise: "Chemistry Expert",
    xp: 780,
    badge: {
      text: "TA",
      bgColor: "bg-secondary-100",
      textColor: "text-secondary-800"
    }
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    expertise: "Math Expert",
    xp: 645,
    badge: {
      text: "Senior",
      bgColor: "bg-accent-100",
      textColor: "text-accent-800"
    }
  }
];

// Study sessions
export const studySessions: StudySession[] = [
  {
    id: 1,
    title: "Physics Problem Solving",
    time: "Today, 7:00 PM",
    participants: 8,
    borderColor: "border-primary-400",
    actionColor: "text-primary-600 hover:text-primary-700"
  },
  {
    id: 2,
    title: "Organic Chemistry Review",
    time: "Tomorrow, 6:30 PM",
    participants: 5,
    borderColor: "border-secondary-400",
    actionColor: "text-secondary-600 hover:text-secondary-700"
  },
  {
    id: 3,
    title: "Calculus II Final Prep",
    time: "Saturday, 4:00 PM",
    participants: 12,
    borderColor: "border-accent-400",
    actionColor: "text-accent-600 hover:text-accent-700"
  }
];

// Mock AI processing function
export const processDocument = async (file: File): Promise<UploadedDocument> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Create a new document based on the uploaded file
  const fileType = file.type.includes('pdf') ? 'pdf' : 
                  file.type.includes('image') ? 'image' : 'text';
  
  const fileIcon = fileType === 'pdf' ? 'file-pdf' :
                  fileType === 'image' ? 'file-image' : 'file-alt';
  
  return {
    id: Math.floor(Math.random() * 1000),
    title: file.name,
    type: fileType,
    icon: fileIcon,
    uploadedAt: "Just now",
    pages: Math.floor(Math.random() * 50) + 5,
    status: "Processing"
  };
};

// Mock AI generated notes
export const generateNotes = async (documentId: number): Promise<Document> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Find the document
  const document = uploadedDocuments.find(doc => doc.id === documentId);
  
  if (!document) {
    throw new Error("Document not found");
  }
  
  // Create a new note based on the document
  return {
    id: Math.floor(Math.random() * 1000),
    title: document.title.includes(':') ? document.title : `${document.title}: Key Concepts`,
    source: document.title,
    date: "Just now",
    content: {
      keyPoints: [
        { title: "Key Point 1:", description: "Generated description of key point 1" },
        { title: "Key Point 2:", description: "Generated description of key point 2" },
        { title: "Key Point 3:", description: "Generated description of key point 3" },
        { title: "Key Point 4:", description: "Generated description of key point 4" }
      ],
      sections: [
        {
          title: "Summary",
          content: "This is an AI-generated summary of the key concepts in this document."
        }
      ]
    }
  };
};
