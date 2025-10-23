'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  PaperClipIcon, 
  DocumentIcon, 
  PhotoIcon,
  CheckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Message, Attachment } from '@/types/messaging';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  showTimestamp?: boolean;
  onAttachmentClick?: (attachment: Attachment) => void;
}

export default function MessageBubble({ 
  message, 
  isOwn, 
  showAvatar = false, 
  showTimestamp = true,
  onAttachmentClick 
}: MessageBubbleProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <PhotoIcon className="h-4 w-4" />;
      case 'pdf':
        return <DocumentIcon className="h-4 w-4" />;
      default:
        return <PaperClipIcon className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {showAvatar && !isOwn && (
          <div className="flex-shrink-0 mr-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {message.senderId.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
          {/* Message Bubble */}
          <div
            className={`px-4 py-3 rounded-2xl ${
              isOwn
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            } ${message.type === 'system' ? 'bg-yellow-50 border border-yellow-200' : ''}`}
          >
            {/* System Message */}
            {message.type === 'system' && (
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-yellow-700">System Message</span>
              </div>
            )}

            {/* Message Text */}
            <p className={`text-sm ${message.type === 'system' ? 'text-yellow-800' : ''}`}>
              {message.content}
            </p>

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.attachments.map((attachment) => (
                  <motion.div
                    key={attachment.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onAttachmentClick?.(attachment)}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      isOwn 
                        ? 'bg-blue-500 hover:bg-blue-400' 
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`mr-3 ${isOwn ? 'text-white' : 'text-gray-500'}`}>
                      {getAttachmentIcon(attachment.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        isOwn ? 'text-white' : 'text-gray-900'
                      }`}>
                        {attachment.name}
                      </p>
                      <p className={`text-xs ${
                        isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatFileSize(attachment.size)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Message Status */}
            {isOwn && (
              <div className="flex items-center justify-end mt-2">
                {message.isRead ? (
                  <CheckCircleIcon className="h-4 w-4 text-blue-200" />
                ) : (
                  <CheckIcon className="h-4 w-4 text-blue-200" />
                )}
              </div>
            )}
          </div>

          {/* Timestamp */}
          {showTimestamp && (
            <div className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
              {formatTime(message.timestamp)}
              {message.isEdited && (
                <span className="ml-1 italic">(edited)</span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
