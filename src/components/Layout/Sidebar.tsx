'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserIcon,
  UserGroupIcon,
  BriefcaseIcon,
  Squares2X2Icon,
  CalendarDaysIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChatBubbleLeftIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Logo from '@/assets/logo/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSidebarItems } from '@/lib/auth';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigationIcons: Record<string, any> = {
  'HomeIcon': HomeIcon,
  'UserIcon': UserIcon,
  'UserGroupIcon': UserGroupIcon,
  'BriefcaseIcon': BriefcaseIcon,
  'Squares2X2Icon': Squares2X2Icon,
  'CalendarDaysIcon': CalendarDaysIcon,
  'ClockIcon': ClockIcon,
  'ChatBubbleLeftIcon': ChatBubbleLeftIcon,
  'CurrencyDollarIcon': CurrencyDollarIcon,
  'EllipsisHorizontalIcon': EllipsisHorizontalIcon
};

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();
  
  // Memoize navigation items to prevent unnecessary re-renders
  const navigation = useMemo(() => {
    if (isLoading) {
      return [
        { name: t.home, href: '/login', icon: 'UserIcon', description: 'Loading...' }
      ];
    }
    if (user) {
      return getSidebarItems(user.role).map(item => ({
        ...item,
        name: t[item.name.toLowerCase().replace(/\s+/g, '') as keyof typeof t] || item.name,
        description: item.description
      }));
    } else {
      return [
        { name: t.home, href: '/login', icon: 'UserIcon', description: 'Sign in to continue' }
      ];
    }
  }, [user, t, isLoading]);

  return (
    <aside
      className="bg-white shadow-xl border-r border-gray-200 flex flex-col h-full overflow-hidden sidebar-container transition-all duration-200 w-full lg:w-auto"
      style={{ width: isCollapsed ? '80px' : '280px' }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size={isCollapsed ? "sm" : "md"} showText={!isCollapsed} />
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 sidebar-toggle"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <div>
              {isCollapsed ? (
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto sidebar-nav">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href;
          // Ensure we get the correct icon component
          const IconComponent = navigationIcons[item.icon];
          const Icon = IconComponent || HomeIcon;
          
          // Debug: log if icon is not found
          if (!IconComponent) {
            console.warn(`Icon not found for: ${item.icon}, using HomeIcon as fallback`);
          }
          
          return (
            <div
              key={item.name}
              className="relative"
            >
              <Link
                href={item.href}
                className={`group flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Icon className={`h-6 w-6 ${
                    isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                  }`} />
                </div>
                
                {/* Text Content */}
                {!isCollapsed && (
                  <div className="ml-3 flex-1 min-w-0 sidebar-content">
                    <div className="flex flex-col">
                      <span className="font-medium truncate">{item.name}</span>
                      <span className="text-xs text-gray-500 truncate">{item.description}</span>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        {!isCollapsed && (
          <div className="text-center transition-opacity duration-200">
            <p className="text-xs text-gray-500">Q HR v1.0.0</p>
          </div>
        )}
      </div>
    </aside>
  );
}