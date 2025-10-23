'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Notification } from '@/types/messaging';
import { mockNotifications } from '@/lib/mockMessagingData';

interface NotificationBellProps {
  unreadCount: number;
  onNotificationClick?: (notification: Notification) => void;
}

export default function NotificationBell({ unreadCount, onNotificationClick }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const router = useRouter();

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);

    if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return '💬';
      case 'mention':
        return '👤';
      case 'reaction':
        return '❤️';
      case 'system':
        return '🔔';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'bg-blue-100 text-blue-800';
      case 'mention':
        return 'bg-green-100 text-green-800';
      case 'reaction':
        return 'bg-pink-100 text-pink-800';
      case 'system':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Close the dropdown
    setIsOpen(false);
    
    // Call the optional callback first
    onNotificationClick?.(notification);
    
    // Navigate based on notification type and data
    switch (notification.type) {
      case 'message':
        // Navigate to inbox and highlight the specific conversation
        if (notification.conversationId) {
          router.push(`/inbox?conversation=${notification.conversationId}`);
        } else {
          router.push('/inbox');
        }
        break;
      case 'mention':
        // Navigate to inbox and highlight the specific message
        if (notification.conversationId) {
          router.push(`/inbox?conversation=${notification.conversationId}&message=${notification.messageId}`);
        } else {
          router.push('/inbox');
        }
        break;
      case 'reaction':
        // Navigate to inbox and highlight the specific message
        if (notification.conversationId) {
          router.push(`/inbox?conversation=${notification.conversationId}&message=${notification.messageId}`);
        } else {
          router.push('/inbox');
        }
        break;
      case 'system':
        // Navigate based on actionUrl or default to relevant section
        if (notification.actionUrl) {
          router.push(notification.actionUrl);
        } else {
          // Default system notifications to home or relevant section
          router.push('/');
        }
        break;
      default:
        // Default fallback
        router.push('/');
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <BellIcon className="h-6 w-6" />
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-[99999]">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <BellIcon className="h-8 w-8 mx-auto mb-2" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <span className="text-lg">
                            {getNotificationIcon(notification.type)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getNotificationColor(notification.type)}`}>
                              {notification.type}
                            </span>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all notifications
                </button>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
