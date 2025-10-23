'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChatBubbleLeftIcon, 
  UserGroupIcon,
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import { Conversation, Message, User } from '@/types/messaging';
import { useSocket } from '@/contexts/SocketContext';
import { 
  mockConversations, 
  mockMessages, 
  mockUsers,
  getMessagesByConversationId,
  getUserById 
} from '@/lib/mockMessagingData';
import ConversationList from '@/components/messaging/ConversationList';
import MessageBubble from '@/components/messaging/MessageBubble';
import MessageInput from '@/components/messaging/MessageInput';
import QAIMessage from '@/components/messaging/QAIMessage';
import { QAIService, QAIMessage as QAIMessageType } from '@/lib/qAIService';

export default function InboxModule() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [qaiMessages, setQaiMessages] = useState<QAIMessageType[]>([]);
  const [isQAIResponding, setIsQAIResponding] = useState(false);
  
  const { 
    conversations, 
    sendMessage, 
    markAsRead, 
    startTyping, 
    stopTyping,
    currentUser 
  } = useSocket();

  // Initialize with mock data
  useEffect(() => {
    if (conversations.length === 0) {
      // In a real app, this would be loaded from the server
      console.log('Loading mock conversation data...');
    }
  }, [conversations]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    const messages = getMessagesByConversationId(conversation.id);
    setConversationMessages(messages);
    
    // Mark messages as read
    messages.forEach(message => {
      if (!message.isRead && message.senderId !== currentUser?.id) {
        markAsRead(conversation.id, message.id);
      }
    });
  };

  const handleSendMessage = async (content: string, type: string = 'text', attachments: any[] = []) => {
    if (!selectedConversation) return;
    
    sendMessage(selectedConversation.id, content, type, attachments);
    
    // Add to local messages immediately for demo
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: currentUser?.id || 'user-1',
      content,
      timestamp: new Date().toISOString(),
      type: type as any,
      attachments,
      isRead: true
    };
    
    setConversationMessages(prev => [...prev, newMessage]);

    // Handle Q AI responses
    if (selectedConversation.id === 'conv-q-ai') {
      setIsQAIResponding(true);
      
      try {
        const aiResponse = await QAIService.getResponse(content);
        
        // Add user message to Q AI messages
        const userMessage: QAIMessageType = {
          id: `qai-msg-${Date.now()}`,
          content,
          timestamp: new Date().toISOString(),
          isFromAI: false,
          type: 'text'
        };
        
        // Add AI response
        const aiMessage: QAIMessageType = {
          id: `qai-msg-${Date.now() + 1}`,
          content: aiResponse.message,
          timestamp: new Date().toISOString(),
          isFromAI: true,
          type: aiResponse.suggestions ? 'suggestion' : 'text'
        };
        
        setQaiMessages(prev => [...prev, userMessage, aiMessage]);
        
        // Also add AI response to regular messages for consistency
        const aiResponseMessage: Message = {
          id: `msg-ai-${Date.now()}`,
          conversationId: selectedConversation.id,
          senderId: 'q-ai',
          content: aiResponse.message,
          timestamp: new Date().toISOString(),
          type: 'text',
          isRead: true
        };
        
        setConversationMessages(prev => [...prev, aiResponseMessage]);
        
      } catch (error) {
        console.error('Error getting AI response:', error);
      } finally {
        setIsQAIResponding(false);
      }
    }
  };

  const handleTyping = (isTyping: boolean) => {
    if (!selectedConversation) return;
    
    if (isTyping) {
      startTyping(selectedConversation.id);
    } else {
      stopTyping(selectedConversation.id);
    }
  };

  const handleAttachmentClick = (attachment: any) => {
    console.log('Opening attachment:', attachment);
    // In a real app, this would open the attachment
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (selectedConversation?.id === 'conv-q-ai') {
      handleSendMessage(suggestion);
    }
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.type === 'direct') {
      const otherParticipant = conversation.participants.find(id => id !== currentUser?.id);
      const user = getUserById(otherParticipant || '');
      return user?.name || conversation.name;
    }
    return conversation.name;
  };

  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.avatar) {
      return conversation.avatar;
    }
    
    if (conversation.type === 'direct') {
      const otherParticipant = conversation.participants.find(id => id !== currentUser?.id);
      const user = getUserById(otherParticipant || '');
      return user?.avatar;
    }
    
    return `https://via.placeholder.com/40x40/6366F1/FFFFFF?text=${conversation.name.charAt(0)}`;
  };

  const filteredConversations = mockConversations.filter(conv => 
    !conv.isArchived && conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex bg-gray-50">
      {/* Sidebar - Conversation List */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <ConversationList
          conversations={filteredConversations}
          currentUserId={currentUser?.id || 'user-1'}
          onSelectConversation={handleSelectConversation}
          selectedConversationId={selectedConversation?.id}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={getConversationAvatar(selectedConversation)}
                    alt={getConversationName(selectedConversation)}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getConversationName(selectedConversation)}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {selectedConversation.type === 'group' && (
                        <UserGroupIcon className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="text-sm text-gray-500">
                        {selectedConversation.participants.length} participants
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <BellIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation?.id === 'conv-q-ai' ? (
                <div className="space-y-4">
                  {/* Q AI Welcome Message */}
                  <div className="text-center py-8">
                    <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">Q</span>
                      </div>
                      <span className="font-semibold">Q AI Assistant</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      Your intelligent HR assistant is ready to help!
                    </p>
                  </div>

                  {/* Q AI Messages */}
                  {qaiMessages.map((message) => (
                    <QAIMessage
                      key={message.id}
                      message={message}
                      onSuggestionClick={handleSuggestionClick}
                    />
                  ))}

                  {/* Regular Messages */}
                  {conversationMessages.map((message, index) => {
                    const isOwn = message.senderId === currentUser?.id;
                    const showAvatar = index === 0 || 
                      conversationMessages[index - 1]?.senderId !== message.senderId;
                    
                    return (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        isOwn={isOwn}
                        showAvatar={showAvatar}
                        onAttachmentClick={handleAttachmentClick}
                      />
                    );
                  })}

                  {/* AI Responding Indicator */}
                  {isQAIResponding && (
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm">Q AI is thinking...</span>
                    </div>
                  )}
                </div>
              ) : conversationMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <ChatBubbleLeftIcon className="h-12 w-12 mb-4" />
                  <p className="text-lg font-medium">No messages yet</p>
                  <p className="text-sm">Start a conversation!</p>
                </div>
              ) : (
                conversationMessages.map((message, index) => {
                  const isOwn = message.senderId === currentUser?.id;
                  const showAvatar = index === 0 || 
                    conversationMessages[index - 1]?.senderId !== message.senderId;
                  
                  return (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isOwn={isOwn}
                      showAvatar={showAvatar}
                      onAttachmentClick={handleAttachmentClick}
                    />
                  );
                })
              )}
            </div>

            {/* Message Input */}
            <MessageInput
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              placeholder={`Message ${getConversationName(selectedConversation)}...`}
            />
          </>
        ) : (
          /* No Conversation Selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <ChatBubbleLeftIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to Q HR Messages
              </h3>
              <p className="text-gray-600 mb-6">
                Select a conversation to start messaging with your colleagues
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Real-time messaging
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  File attachments
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Group chats
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
