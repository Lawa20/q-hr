import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="url(#gradient)"
            stroke="#1e40af"
            strokeWidth="2"
          />
          
          {/* Inner circle */}
          <circle
            cx="20"
            cy="20"
            r="12"
            fill="white"
            stroke="#3b82f6"
            strokeWidth="1.5"
          />
          
          {/* Q letter */}
          <path
            d="M14 16C14 14.8954 14.8954 14 16 14H24C25.1046 14 26 14.8954 26 16V24C26 25.1046 25.1046 26 24 26H16C14.8954 26 14 25.1046 14 24V16Z"
            fill="#1e40af"
          />
          <path
            d="M18 18H22V20H20V22H18V18Z"
            fill="white"
          />
          <path
            d="M22 22L26 26"
            stroke="#1e40af"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-xl font-bold text-blue-900">Q HR</span>
    </div>
  );
};

export default Logo;
