export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'employee' | 'hr' | 'manager' | 'supervisor';
  department: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'system';
  attachments?: Attachment[];
  isRead: boolean;
  isEdited?: boolean;
  editedAt?: string;
  replyTo?: string;
  reactions?: MessageReaction[];
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document' | 'other';
  size: number;
  url: string;
  thumbnail?: string;
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  isArchived: boolean;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  description?: string;
}

export interface ConversationParticipant {
  userId: string;
  role: 'admin' | 'member';
  joinedAt: string;
  lastReadAt?: string;
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'mention' | 'reaction' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  conversationId?: string;
  messageId?: string;
  actionUrl?: string;
}

export interface SocketMessage {
  type: 'message' | 'typing' | 'read' | 'notification';
  data: any;
}

export interface MessageFilters {
  conversationId?: string;
  userId?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  isRead?: boolean;
}

export interface SearchResult {
  messages: Message[];
  conversations: Conversation[];
  users: User[];
}
