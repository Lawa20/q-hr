'use client';

import React, { useState } from 'react';
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
  ChatBubbleLeftIcon,
  CurrencyDollarIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSidebarItems } from '@/lib/auth';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();

  const navigation = getSidebarItems(user?.role || 'EMPLOYEE', t);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              const IconComponent = navigationIcons[item.icon];
              const Icon = IconComponent || HomeIcon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
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
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex flex-col">
                      <span className="font-medium truncate">{item.name}</span>
                      <span className="text-xs text-gray-500 truncate">{item.description}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500">Q HR System</p>
              <p className="text-xs text-gray-400">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
