'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftIcon, 
  UserGroupIcon, 
  MapPinIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { Conversation, User } from '@/types/messaging';
import { getUserById } from '@/lib/mockMessagingData';

interface ConversationListProps {
  conversations: Conversation[];
  currentUserId: string;
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
}

export default function ConversationList({
  conversations,
  currentUserId,
  onSelectConversation,
  selectedConversationId
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'pinned'>('all');

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.type === 'direct') {
      const otherParticipant = conversation.participants.find(id => id !== currentUserId);
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
      const otherParticipant = conversation.participants.find(id => id !== currentUserId);
      const user = getUserById(otherParticipant || '');
      return user?.avatar;
    }
    
    return `https://via.placeholder.com/40x40/6366F1/FFFFFF?text=${conversation.name.charAt(0)}`;
  };

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    switch (filterType) {
      case 'unread':
        matchesFilter = conversation.unreadCount > 0;
        break;
      case 'pinned':
        matchesFilter = conversation.isPinned;
        break;
      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter && !conversation.isArchived;
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArchiveBoxIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('unread')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filterType === 'unread'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilterType('pinned')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filterType === 'pinned'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Pinned
          </button>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <ChatBubbleLeftIcon className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">No conversations found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectConversation(conversation)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                  selectedConversationId === conversation.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:shadow-sm'
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0 mr-3">
                  <img
                    src={getConversationAvatar(conversation)}
                    alt={getConversationName(conversation)}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.type === 'group' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <UserGroupIcon className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {getConversationName(conversation)}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {conversation.isPinned && (
                        <MapPinIcon className="h-3 w-3 text-yellow-500" />
                      )}
                      {conversation.lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage?.content || 'No messages yet'}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <div className="flex-shrink-0 ml-2">
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
