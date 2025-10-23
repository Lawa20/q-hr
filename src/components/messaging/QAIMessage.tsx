'use client';

import React from 'react';
import { QAIMessage as QAIMessageType } from '@/lib/qAIService';

interface QAIMessageProps {
  message: QAIMessageType;
  onSuggestionClick?: (suggestion: string) => void;
}

export default function QAIMessage({ message, onSuggestionClick }: QAIMessageProps) {
  return (
    <div className="flex flex-col space-y-3">
      {/* AI Message Content */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">Q</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Q AI</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {message.type === 'suggestion' && (
        <div className="ml-11">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick actions:</div>
          <div className="flex flex-wrap gap-2">
            {['How do I request time off?', 'What are my benefits?', 'How do I check my attendance?', 'How do I view my payroll?'].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
