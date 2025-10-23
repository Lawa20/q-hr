'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  HomeIcon,
  UserIcon,
  UserGroupIcon,
  BriefcaseIcon,
  Squares2X2Icon,
  CalendarDaysIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import NotificationBell from '@/components/messaging/NotificationBell';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface SectionHeaderProps {
  section: 'home' | 'self-service' | 'employees' | 'departments' | 'teams' | 'leave-tracker' | 'attendance' | 'more' | 'inbox';
  title: string;
  subtitle?: string;
}

const sectionConfig = {
  home: {
    icon: HomeIcon,
    color: 'blue',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200'
  },
  'self-service': {
    icon: UserIcon,
    color: 'green',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    borderColor: 'border-green-200'
  },
  'employees': {
    icon: UserGroupIcon,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    borderColor: 'border-indigo-200'
  },
  'departments': {
    icon: Squares2X2Icon,
    color: 'teal',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
    borderColor: 'border-teal-200'
  },
  'teams': {
    icon: UserGroupIcon,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    borderColor: 'border-indigo-200'
  },
  'leave-tracker': {
    icon: CalendarDaysIcon,
    color: 'purple',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200'
  },
  'attendance': {
    icon: ClockIcon,
    color: 'orange',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-200'
  },
  'more': {
    icon: EllipsisHorizontalIcon,
    color: 'gray',
    bgColor: 'bg-gray-50',
    iconColor: 'text-gray-600',
    borderColor: 'border-gray-200'
  },
  'inbox': {
    icon: BellIcon,
    color: 'purple',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200'
  }
};

export default function SectionHeader({ section, title, subtitle }: SectionHeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // Theme context with proper error handling
  const { theme, toggleTheme } = useTheme();

  // Ensure we have a valid section, fallback to 'home' if undefined or invalid
  const validSection = section && sectionConfig[section] ? section : 'home';
  const config = sectionConfig[validSection];
  const IconComponent = config.icon;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/login');
  };

  return (
    <header
      className={`${config.bgColor} ${config.borderColor} border-b-2 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Section info */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <div
              className={`p-2 sm:p-3 rounded-xl ${config.bgColor} ${config.borderColor} border flex-shrink-0`}
            >
              <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 ${config.iconColor}`} />
            </div>
            
            <div className="min-w-0 flex-1">
              <h1
                className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate"
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className="text-xs sm:text-sm text-gray-600 truncate"
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Language Switcher and Theme Toggle */}
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              
              {/* Theme Toggle - Small Icon Button */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-6 h-6 rounded transition-all duration-200"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Notifications */}
            <NotificationBell unreadCount={3} />

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors hover:scale-105 active:scale-95"
              >
                <UserCircleIcon className="h-8 w-8" />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || 'Role'}</p>
                </div>
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[9999]">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                  </div>
                  
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Settings */}
            <button
              onClick={() => router.push('/settings')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors hover:scale-110 active:scale-90"
              title="Settings"
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
