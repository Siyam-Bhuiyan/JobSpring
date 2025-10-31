interface InterviewQuestion {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  company?: string;
  position?: string;
  topics: string[];
  description: string;
  answer?: string;
  sampleAnswer?: string;
  relatedTopics?: string[];
  resources?: { title: string; url: string }[];
  likes: number;
  answers: number;
  views: number;
}

export const interviewQuestions: InterviewQuestion[] = [
  // Therap BD Questions
  {
    id: 'therap-1',
    title: 'Implement a thread-safe Singleton pattern in Java',
    category: 'Java',
    difficulty: 'Medium',
    company: 'Therap BD',
    position: 'Software Engineer',
    topics: ['Java', 'Design Patterns', 'Thread Safety'],
    description: 'Design and implement a thread-safe Singleton pattern in Java. Explain different approaches and their trade-offs.',
    sampleAnswer: 'Double-checked locking implementation with volatile keyword...',
    relatedTopics: ['Multithreading', 'Synchronization', 'Memory Model'],
    resources: [
      { title: 'Java Memory Model', url: 'https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html' }
    ],
    likes: 150,
    answers: 25,
    views: 1200
  },
  {
    id: 'therap-2',
    title: 'Design a scalable notification system',
    category: 'System Design',
    difficulty: 'Hard',
    company: 'Therap BD',
    position: 'Senior Software Engineer',
    topics: ['System Design', 'Scalability', 'Message Queue'],
    description: 'Design a notification system that can handle millions of users and multiple notification types.',
    likes: 120,
    answers: 18,
    views: 980
  },

  // Walton Questions
  {
    id: 'walton-1',
    title: 'Implement an efficient inventory management system',
    category: 'System Design',
    difficulty: 'Medium',
    company: 'Walton',
    position: 'Software Engineer',
    topics: ['Database Design', 'REST API', 'Caching'],
    description: 'Design and implement an inventory management system with real-time updates and optimized database queries.',
    likes: 85,
    answers: 15,
    views: 750
  },
  {
    id: 'walton-2',
    title: 'Optimize React component rendering',
    category: 'Frontend',
    difficulty: 'Medium',
    company: 'Walton',
    position: 'Frontend Engineer',
    topics: ['React', 'Performance', 'Optimization'],
    description: 'Discuss and implement various techniques to optimize React component rendering and prevent unnecessary re-renders.',
    likes: 95,
    answers: 20,
    views: 890
  },

  // Robi Questions
  {
    id: 'robi-1',
    title: 'Design a fault-tolerant billing system',
    category: 'System Design',
    difficulty: 'Hard',
    company: 'Robi Axiata',
    position: 'Senior Developer',
    topics: ['Distributed Systems', 'Fault Tolerance', 'Database'],
    description: 'Design a billing system that can handle network failures and ensure data consistency.',
    likes: 110,
    answers: 16,
    views: 920
  },
  {
    id: 'robi-2',
    title: 'Implement real-time data analytics pipeline',
    category: 'Backend',
    difficulty: 'Hard',
    company: 'Robi Axiata',
    position: 'Data Engineer',
    topics: ['Data Engineering', 'Stream Processing', 'Analytics'],
    description: 'Design and implement a real-time data analytics pipeline for processing telecom data.',
    likes: 75,
    answers: 12,
    views: 680
  },

  // bKash Questions
  {
    id: 'bkash-1',
    title: 'Implement secure payment gateway integration',
    category: 'Security',
    difficulty: 'Hard',
    company: 'bKash',
    position: 'Software Engineer',
    topics: ['Security', 'Payment Gateway', 'API Integration'],
    description: 'Implement a secure payment gateway integration with proper error handling and security measures.',
    likes: 130,
    answers: 22,
    views: 1100
  },
  {
    id: 'bkash-2',
    title: 'Design high-throughput transaction processing system',
    category: 'System Design',
    difficulty: 'Hard',
    company: 'bKash',
    position: 'Senior Software Engineer',
    topics: ['Distributed Systems', 'High Throughput', 'Scalability'],
    description: 'Design a system that can handle thousands of financial transactions per second with proper consistency guarantees.',
    likes: 140,
    answers: 24,
    views: 1150
  },

  // Brain Station 23 Questions
  {
    id: 'bs23-1',
    title: 'Implement microservices communication patterns',
    category: 'Microservices',
    difficulty: 'Medium',
    company: 'Brain Station 23',
    position: 'Software Engineer',
    topics: ['Microservices', 'API Gateway', 'Message Queue'],
    description: 'Implement different communication patterns between microservices and discuss their trade-offs.',
    likes: 105,
    answers: 19,
    views: 950
  },
  {
    id: 'bs23-2',
    title: 'Design a collaborative document editing system',
    category: 'System Design',
    difficulty: 'Hard',
    company: 'Brain Station 23',
    position: 'Senior Developer',
    topics: ['Real-time Systems', 'Collaboration', 'WebSocket'],
    description: 'Design a system that allows multiple users to edit documents simultaneously with conflict resolution.',
    likes: 115,
    answers: 21,
    views: 980
  }
];

// Categories for filtering
export const categories = [
  'Java',
  'System Design',
  'Frontend',
  'Backend',
  'Security',
  'Microservices',
  'Data Engineering',
  'DevOps'
];

// Companies for filtering
export const companies = [
  'Therap BD',
  'Walton',
  'Robi Axiata',
  'bKash',
  'Brain Station 23',
  'Samsung R&D',
  'Craftsmen',
  'NewsCred'
];

// Topics for filtering
export const topics = [
  'Java',
  'Design Patterns',
  'System Design',
  'Microservices',
  'React',
  'Node.js',
  'Database',
  'Security',
  'DevOps',
  'Data Engineering',
  'Frontend',
  'Backend',
  'API Design',
  'Performance',
  'Scalability'
];

export const difficultyLevels = ['Easy', 'Medium', 'Hard'] as const;