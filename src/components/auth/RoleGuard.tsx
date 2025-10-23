'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldExclamationIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  userRole?: string;
  fallback?: React.ReactNode;
}

export default function RoleGuard({ 
  children, 
  allowedRoles, 
  userRole = 'employee', // Default to employee role
  fallback 
}: RoleGuardProps) {
  const hasAccess = allowedRoles.includes(userRole);

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-xl"
      >
        <div className="text-center p-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <ShieldExclamationIcon className="h-12 w-12 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          
          <p className="text-gray-600 mb-6 max-w-md">
            You don't have permission to access this section. This area is restricted to HR and Finance personnel only.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <LockClosedIcon className="h-5 w-5 text-yellow-600 mr-2" />
              <p className="text-sm text-yellow-800">
                <strong>Required Role:</strong> HR Manager, Finance Manager, or Admin
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-500">
            <p>• Contact your HR department for access</p>
            <p>• Ensure you're logged in with the correct account</p>
            <p>• Check with your manager about role permissions</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return <>{children}</>;
}

// Hook to check user role
export const useRoleCheck = (userRole: string = 'employee') => {
  const isHR = userRole === 'hr' || userRole === 'hr-manager';
  const isFinance = userRole === 'finance' || userRole === 'finance-manager';
  const isAdmin = userRole === 'admin';
  const isManager = userRole === 'manager' || userRole === 'hr-manager' || userRole === 'finance-manager';
  
  const canAccessPayroll = isHR || isFinance || isAdmin;
  const canAccessHR = isHR || isAdmin;
  const canAccessFinance = isFinance || isAdmin;
  const canManageEmployees = isHR || isAdmin;
  
  return {
    userRole,
    isHR,
    isFinance,
    isAdmin,
    isManager,
    canAccessPayroll,
    canAccessHR,
    canAccessFinance,
    canManageEmployees
  };
};
