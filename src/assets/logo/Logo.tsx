import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 hover:rotate-2 transition-transform`}
      >
        <div
          className="text-white font-bold"
          style={{ fontSize: size === 'sm' ? '14px' : size === 'md' ? '18px' : '24px' }}
        >
          Q
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-900 ${textSizes[size]}`}>
            Q HR
          </span>
          <span className="text-xs text-gray-500 font-medium">
            Human Resources
          </span>
        </div>
      )}
    </div>
  );
}
