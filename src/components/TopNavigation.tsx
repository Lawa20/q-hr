'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BellIcon, 
  MagnifyingGlassIcon, 
  UserCircleIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

interface TopNavigationProps {
  section: string;
  onMobileMenuToggle?: () => void;
}

const sectionConfig = {
  home: {
    title: 'Dashboard',
    subtitle: 'Welcome back! Here\'s what\'s happening today.',
    showSearch: true,
  },
  'self-service': {
    title: 'Self-Service',
    subtitle: 'Manage your personal information and requests.',
    showSearch: false,
  },
  'leave-tracker': {
    title: 'Leave Tracker',
    subtitle: 'Track and manage your leave requests.',
    showSearch: true,
  },
  attendance: {
    title: 'Attendance',
    subtitle: 'Monitor your attendance and time tracking.',
    showSearch: true,
  },
  more: {
    title: 'More',
    subtitle: 'Additional tools and resources.',
    showSearch: false,
  },
};

const TopNavigation: React.FC<TopNavigationProps> = ({ 
  section, 
  onMobileMenuToggle 
}) => {
  const config = sectionConfig[section as keyof typeof sectionConfig] || sectionConfig.home;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu and title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Bars3Icon className="w-6 h-6 text-gray-600" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
            <p className="text-sm text-gray-600">{config.subtitle}</p>
          </div>
        </div>

        {/* Right side - Search, notifications, profile */}
        <div className="flex items-center space-x-4">
          {config.showSearch && (
            <div className="hidden md:block relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          )}
          
          <button className="p-2 rounded-md hover:bg-gray-100 transition-colors relative">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <UserCircleIcon className="w-8 h-8 text-gray-600" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">HR Manager</p>
            </div>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default TopNavigation;
