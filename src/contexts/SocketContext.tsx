'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { 
  Message, 
  Conversation, 
  User, 
  Notification, 
  TypingIndicator,
  SocketMessage 
} from '@/types/messaging';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  conversations: Conversation[];
  messages: Message[];
  notifications: Notification[];
  typingUsers: TypingIndicator[];
  currentUser: User | null;
  unreadCount: number;
  
  // Actions
  sendMessage: (conversationId: string, content: string, type?: string, attachments?: any[]) => void;
  markAsRead: (conversationId: string, messageId: string) => void;
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
  joinConversation: (conversationId: string) => void;
  leaveConversation: (conversationId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  searchMessages: (query: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const typingTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    // Initialize socket connection (demo mode)
    const initializeSocket = () => {
      // For demo purposes, we'll simulate socket connection
      // In production, this would connect to your actual Socket.io server
      console.log('Initializing Socket.io connection (demo mode)...');
      
      // Simulate connection
      setTimeout(() => {
        setIsConnected(true);
        console.log('Socket.io connected (demo mode)');
      }, 1000);

      // Set current user (demo)
      setCurrentUser({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@company.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: 'employee',
        department: 'Engineering',
        isOnline: true,
        lastSeen: new Date().toISOString()
      });
    };

    initializeSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  // Simulate real-time message updates
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      // Simulate receiving new messages occasionally
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        const mockMessage: Message = {
          id: `msg-${Date.now()}`,
          conversationId: 'conv-1',
          senderId: 'user-2',
          content: 'This is a simulated real-time message!',
          timestamp: new Date().toISOString(),
          type: 'text',
          isRead: false
        };

        setMessages(prev => [...prev, mockMessage]);
        
        // Update conversation
        setConversations(prev => prev.map(conv => 
          conv.id === 'conv-1' 
            ? { ...conv, lastMessage: mockMessage, unreadCount: conv.unreadCount + 1 }
            : conv
        ));

        // Add notification
        const notification: Notification = {
          id: `notif-${Date.now()}`,
          userId: currentUser?.id || 'user-1',
          type: 'message',
          title: 'New Message',
          message: mockMessage.content,
          isRead: false,
          timestamp: new Date().toISOString(),
          conversationId: 'conv-1',
          messageId: mockMessage.id
        };

        setNotifications(prev => [...prev, notification]);
        setUnreadCount(prev => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isConnected, currentUser]);

  const sendMessage = (conversationId: string, content: string, type: string = 'text', attachments: any[] = []) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser?.id || 'user-1',
      content,
      timestamp: new Date().toISOString(),
      type: type as any,
      attachments,
      isRead: false
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Update conversation
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, lastMessage: newMessage, updatedAt: new Date().toISOString() }
        : conv
    ));

    // Simulate sending to other participants
    console.log('Sending message:', newMessage);
  };

  const markAsRead = (conversationId: string, messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));

    // Update conversation unread count
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unreadCount: Math.max(0, conv.unreadCount - 1) }
        : conv
    ));
  };

  const startTyping = (conversationId: string) => {
    const typingIndicator: TypingIndicator = {
      conversationId,
      userId: currentUser?.id || 'user-1',
      isTyping: true
    };

    setTypingUsers(prev => {
      const filtered = prev.filter(t => !(t.conversationId === conversationId && t.userId === currentUser?.id));
      return [...filtered, typingIndicator];
    });

    // Clear existing timeout
    if (typingTimeoutRef.current[conversationId]) {
      clearTimeout(typingTimeoutRef.current[conversationId]);
    }

    // Set timeout to stop typing
    typingTimeoutRef.current[conversationId] = setTimeout(() => {
      stopTyping(conversationId);
    }, 3000);
  };

  const stopTyping = (conversationId: string) => {
    setTypingUsers(prev => prev.filter(t => 
      !(t.conversationId === conversationId && t.userId === currentUser?.id)
    ));

    if (typingTimeoutRef.current[conversationId]) {
      clearTimeout(typingTimeoutRef.current[conversationId]);
      delete typingTimeoutRef.current[conversationId];
    }
  };

  const joinConversation = (conversationId: string) => {
    console.log('Joining conversation:', conversationId);
    // In real implementation, this would emit a socket event
  };

  const leaveConversation = (conversationId: string) => {
    console.log('Leaving conversation:', conversationId);
    // In real implementation, this would emit a socket event
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const searchMessages = (query: string) => {
    console.log('Searching messages:', query);
    // In real implementation, this would emit a socket event
  };

  const value: SocketContextType = {
    socket,
    isConnected,
    conversations,
    messages,
    notifications,
    typingUsers,
    currentUser,
    unreadCount,
    sendMessage,
    markAsRead,
    startTyping,
    stopTyping,
    joinConversation,
    leaveConversation,
    markNotificationAsRead,
    searchMessages
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
