import { 
  User, 
  Conversation, 
  Message, 
  Notification, 
  Attachment 
} from '@/types/messaging';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@company.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'employee',
    department: 'Engineering',
    isOnline: true,
    lastSeen: new Date().toISOString()
  },
  {
    id: 'user-2',
    name: 'Sarah Wilson',
    email: 'sarah@company.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    role: 'hr',
    department: 'Human Resources',
    isOnline: true,
    lastSeen: new Date().toISOString()
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    role: 'manager',
    department: 'Engineering',
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily@company.com',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    role: 'supervisor',
    department: 'Operations',
    isOnline: true,
    lastSeen: new Date().toISOString()
  },
  {
    id: 'q-ai',
    name: 'Q AI',
    email: 'qai@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Q+AI&background=6366f1&color=fff&size=200',
    role: 'ai',
    department: 'AI Assistant',
    isOnline: true,
    lastSeen: new Date().toISOString()
  },
  {
    id: 'user-5',
    name: 'David Brown',
    email: 'david@company.com',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    role: 'employee',
    department: 'Marketing',
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 minutes ago
  }
];

// Mock Attachments
export const mockAttachments: Attachment[] = [
  {
    id: 'att-1',
    name: 'project-proposal.pdf',
    type: 'pdf',
    size: 1024000,
    url: '/attachments/project-proposal.pdf',
    thumbnail: '/thumbnails/project-proposal.png'
  },
  {
    id: 'att-2',
    name: 'team-photo.jpg',
    type: 'image',
    size: 512000,
    url: '/attachments/team-photo.jpg',
    thumbnail: '/thumbnails/team-photo-thumb.jpg'
  },
  {
    id: 'att-3',
    name: 'budget-report.xlsx',
    type: 'document',
    size: 256000,
    url: '/attachments/budget-report.xlsx'
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'user-2',
    content: 'Hi John! I wanted to follow up on your leave request. Can we schedule a quick meeting?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: 'text',
    isRead: true
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'user-1',
    content: 'Sure Sarah! I\'m available tomorrow at 2 PM. Does that work for you?',
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    type: 'text',
    isRead: true
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'user-2',
    content: 'Perfect! I\'ll send you a calendar invite. Also, here\'s the updated policy document.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    type: 'text',
    isRead: true,
    attachments: [mockAttachments[0]]
  },
  {
    id: 'msg-4',
    conversationId: 'conv-2',
    senderId: 'user-3',
    content: 'Great work on the Q4 project! The client was very impressed with the results.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    type: 'text',
    isRead: true
  },
  {
    id: 'msg-5',
    conversationId: 'conv-2',
    senderId: 'user-1',
    content: 'Thank you Mike! It was a team effort. Looking forward to the next challenge.',
    timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    type: 'text',
    isRead: true
  },
  {
    id: 'msg-6',
    conversationId: 'conv-2',
    senderId: 'user-3',
    content: 'Here\'s the team photo from our last meeting. Everyone looks great!',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    type: 'text',
    isRead: false,
    attachments: [mockAttachments[1]]
  },
  {
    id: 'msg-7',
    conversationId: 'conv-3',
    senderId: 'user-4',
    content: 'The quarterly budget report is ready for review. Please take a look when you have a chance.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    type: 'text',
    isRead: true,
    attachments: [mockAttachments[2]]
  },
  {
    id: 'msg-8',
    conversationId: 'conv-3',
    senderId: 'user-1',
    content: 'Thanks Emily! I\'ll review it this afternoon and get back to you with any questions.',
    timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
    type: 'text',
    isRead: true
  },
  {
    id: 'msg-9',
    conversationId: 'conv-4',
    senderId: 'user-5',
    content: 'Hey John! How\'s the new project going? Need any help with the marketing materials?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    type: 'text',
    isRead: false
  },
  {
    id: 'msg-10',
    conversationId: 'conv-5',
    senderId: 'user-2',
    content: 'Reminder: All employees must complete the annual training by the end of this month.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    type: 'system',
    isRead: false
  }
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-q-ai',
    name: 'Q AI',
    type: 'direct',
    participants: ['user-1', 'q-ai'],
    lastMessage: {
      id: 'msg-q-ai-welcome',
      conversationId: 'conv-q-ai',
      senderId: 'q-ai',
      content: '👋 Hello! I\'m Q AI, your intelligent HR assistant. I\'m here to help you with any questions about leave, benefits, payroll, attendance, and more. How can I assist you today?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      type: 'text',
      isRead: false
    },
    unreadCount: 1,
    isArchived: false,
    isPinned: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=Q+AI&background=6366f1&color=fff&size=200'
  },
  {
    id: 'conv-1',
    name: 'Sarah Wilson',
    type: 'direct',
    participants: ['user-1', 'user-2'],
    lastMessage: mockMessages[2],
    unreadCount: 0,
    isArchived: false,
    isPinned: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 'conv-2',
    name: 'Mike Johnson',
    type: 'direct',
    participants: ['user-1', 'user-3'],
    lastMessage: mockMessages[5],
    unreadCount: 1,
    isArchived: false,
    isPinned: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 'conv-3',
    name: 'Emily Davis',
    type: 'direct',
    participants: ['user-1', 'user-4'],
    lastMessage: mockMessages[7],
    unreadCount: 0,
    isArchived: false,
    isPinned: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: 'conv-4',
    name: 'David Brown',
    type: 'direct',
    participants: ['user-1', 'user-5'],
    lastMessage: mockMessages[8],
    unreadCount: 1,
    isArchived: false,
    isPinned: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    id: 'conv-5',
    name: 'HR Announcements',
    type: 'group',
    participants: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    lastMessage: mockMessages[9],
    unreadCount: 1,
    isArchived: false,
    isPinned: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    avatar: 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=HR',
    description: 'Official HR communications and announcements'
  },
  {
    id: 'conv-6',
    name: 'Engineering Team',
    type: 'group',
    participants: ['user-1', 'user-3'],
    lastMessage: undefined,
    unreadCount: 0,
    isArchived: false,
    isPinned: false,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=ENG',
    description: 'Engineering team discussions and updates'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'message',
    title: 'New message from Mike Johnson',
    message: 'Here\'s the team photo from our last meeting. Everyone looks great!',
    isRead: false,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    conversationId: 'conv-2',
    messageId: 'msg-6'
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'message',
    title: 'New message from David Brown',
    message: 'Hey John! How\'s the new project going? Need any help with the marketing materials?',
    isRead: false,
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    conversationId: 'conv-4',
    messageId: 'msg-9'
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    type: 'system',
    title: 'HR Announcement',
    message: 'Reminder: All employees must complete the annual training by the end of this month.',
    isRead: false,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/more'
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    type: 'mention',
    title: 'You were mentioned in Engineering Team',
    message: 'John, can you review the latest code changes?',
    isRead: true,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    conversationId: 'conv-6',
    messageId: 'msg-11'
  },
  {
    id: 'notif-5',
    userId: 'user-1',
    type: 'reaction',
    title: 'Sarah reacted to your message',
    message: 'Sarah liked your message in HR Updates',
    isRead: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    conversationId: 'conv-5',
    messageId: 'msg-8'
  },
  {
    id: 'notif-6',
    userId: 'user-1',
    type: 'system',
    title: 'Leave Request Approved',
    message: 'Your leave request for Dec 15-20 has been approved by your supervisor.',
    isRead: false,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/leave-tracker'
  }
];

// Helper functions
export const getConversationById = (id: string): Conversation | undefined => {
  return mockConversations.find(conv => conv.id === id);
};

export const getMessagesByConversationId = (conversationId: string): Message[] => {
  return mockMessages.filter(msg => msg.conversationId === conversationId);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUnreadCount = (): number => {
  return mockConversations.reduce((total, conv) => total + conv.unreadCount, 0);
};

export const getNotificationsByUserId = (userId: string): Notification[] => {
  return mockNotifications.filter(notif => notif.userId === userId);
};
