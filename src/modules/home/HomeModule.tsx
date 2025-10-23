'use client';

import React from 'react';
import RoleBasedDashboard from '@/components/dashboard/RoleBasedDashboard';
import RoleSwitcher from '@/components/auth/RoleSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomeModule() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6" style={{ overflow: 'visible' }}>
      {/* Role Switcher for Testing */}
      <div 
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-4"
        style={{ overflow: 'visible', position: 'relative', zIndex: 1 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t.dashboard}</h3>
            <p className="text-sm text-gray-500">Switch between different user roles to test access control</p>
          </div>
          <RoleSwitcher />
        </div>
      </div>

      {/* Role-based Dashboard */}
      <div>
        <RoleBasedDashboard />
      </div>
    </div>
  );
}