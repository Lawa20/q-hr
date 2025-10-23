'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  UserIcon,
  UserGroupIcon,
  Squares2X2Icon,
  CalendarDaysIcon, 
  ClockIcon,
  ChatBubbleLeftIcon,
  CurrencyDollarIcon,
  EllipsisHorizontalIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import Logo from './Logo';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'self-service', label: 'Self-Service', icon: UserIcon },
  { id: 'employees', label: 'Employees', icon: UserGroupIcon },
  { id: 'departments', label: 'Departments', icon: Squares2X2Icon },
  { id: 'leave-tracker', label: 'Leave Tracker', icon: CalendarDaysIcon },
  { id: 'attendance', label: 'Attendance', icon: ClockIcon },
  { id: 'inbox', label: 'Inbox', icon: ChatBubbleLeftIcon },
  { id: 'payroll', label: 'Payroll', icon: CurrencyDollarIcon },
  { id: 'more', label: 'More', icon: EllipsisHorizontalIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  onToggle, 
  activeSection, 
  onSectionChange 
}) => {
  return (
    <motion.div
      initial={false}
      animate={{
        width: isCollapsed ? 80 : 256,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className="bg-white border-r border-gray-200 flex flex-col h-screen shadow-lg"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <Logo size="sm" />
            </div>
          )}
          
          {isCollapsed && (
            <div>
              <Logo size="sm" className="justify-center" />
            </div>
          )}
          
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  
                  {!isCollapsed && (
                    <span className="font-medium text-sm">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className={`text-xs text-gray-500 ${isCollapsed ? 'text-center' : ''}`}>
          {!isCollapsed ? (
            <div>Q HR v1.0.0</div>
          ) : (
            <div>v1.0</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
