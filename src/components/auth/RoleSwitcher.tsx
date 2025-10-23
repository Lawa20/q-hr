'use client';

import React, { useState } from 'react';
import {
  ChevronDownIcon,
  UserIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  EyeIcon,
  CurrencyDollarIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, getRoleDisplayName, getRoleColor } from '@/lib/auth';

const roleIcons: Record<UserRole, any> = {
  admin: ShieldCheckIcon,
  hr: UserGroupIcon,
  manager: UserGroupIcon,
  supervisor: EyeIcon,
  finance: CurrencyDollarIcon,
  employee: BriefcaseIcon
};

const roleDescriptions: Record<UserRole, string> = {
  admin: 'Full system access and management',
  hr: 'Human resources management',
  manager: 'Team management and oversight',
  supervisor: 'Team supervision and coordination',
  finance: 'Financial management and reporting',
  employee: 'Personal workspace and self-service'
};

export default function RoleSwitcher() {
  const { user, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const CurrentRoleIcon = roleIcons[user.role];
  const availableRoles: UserRole[] = ['admin', 'hr', 'manager', 'supervisor', 'finance', 'employee'];

  const handleRoleChange = (newRole: UserRole) => {
    switchRole(newRole);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50" data-role-switcher style={{ position: 'relative', zIndex: 50 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${getRoleColor(user.role).split(' ')[0]} ${getRoleColor(user.role).split(' ')[1]}`}>
            {React.createElement(CurrentRoleIcon, { className: "h-4 w-4" })}
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">
              {getRoleDisplayName(user.role)}
            </p>
            <p className="text-xs text-gray-500">
              {roleDescriptions[user.role]}
            </p>
          </div>
        </div>
        <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-[999999]"
          style={{ 
            zIndex: 999999,
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.5rem'
          }}
        >
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-3 py-2 border-b border-gray-100">
                Switch Role (Demo)
              </div>
              {availableRoles.map((role) => {
                const Icon = roleIcons[role];
                const isCurrentRole = role === user.role;
                
                return (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    disabled={isCurrentRole}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      isCurrentRole
                        ? 'bg-blue-50 text-blue-700 cursor-not-allowed'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${getRoleColor(role).split(' ')[0]} ${getRoleColor(role).split(' ')[1]}`}>
                      {React.createElement(Icon, { className: "h-4 w-4" })}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {getRoleDisplayName(role)}
                        {isCurrentRole && ' (Current)'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {roleDescriptions[role]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
}
