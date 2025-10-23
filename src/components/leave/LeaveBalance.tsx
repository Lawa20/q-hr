'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  HeartIcon, 
  UserIcon, 
  UserGroupIcon, 
  ExclamationTriangleIcon,
  BookOpenIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { LeaveBalanceData } from '@/lib/mockLeaveData';

interface LeaveBalanceProps {
  balance: LeaveBalanceData;
}

const leaveTypes = [
  {
    key: 'annualLeave' as keyof LeaveBalanceData,
    label: 'Annual Leave',
    icon: CalendarDaysIcon,
    color: 'bg-blue-100 text-blue-800',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    key: 'sickLeave' as keyof LeaveBalanceData,
    label: 'Sick Leave',
    icon: HeartIcon,
    color: 'bg-red-100 text-red-800',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    key: 'personalLeave' as keyof LeaveBalanceData,
    label: 'Personal Leave',
    icon: UserIcon,
    color: 'bg-purple-100 text-purple-800',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    key: 'maternityLeave' as keyof LeaveBalanceData,
    label: 'Maternity Leave',
    icon: UserGroupIcon,
    color: 'bg-pink-100 text-pink-800',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  {
    key: 'paternityLeave' as keyof LeaveBalanceData,
    label: 'Paternity Leave',
    icon: UserGroupIcon,
    color: 'bg-cyan-100 text-cyan-800',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  },
  {
    key: 'emergencyLeave' as keyof LeaveBalanceData,
    label: 'Emergency Leave',
    icon: ExclamationTriangleIcon,
    color: 'bg-orange-100 text-orange-800',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    key: 'studyLeave' as keyof LeaveBalanceData,
    label: 'Study Leave',
    icon: BookOpenIcon,
    color: 'bg-green-100 text-green-800',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  }
];

export default function LeaveBalance({ balance }: LeaveBalanceProps) {
  const getLeaveTypeInfo = (key: keyof LeaveBalanceData) => {
    return leaveTypes.find(type => type.key === key) || leaveTypes[0];
  };

  const getTotalLeaveDays = () => {
    return Object.values(balance).reduce((total, days) => total + days, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <CalendarDaysIcon className="h-6 w-6 mr-2 text-blue-600" />
          Leave Balance
        </h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{getTotalLeaveDays()}</p>
          <p className="text-sm text-gray-500">Total Days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leaveTypes.map((type, index) => {
          const IconComponent = type.icon;
          const days = balance[type.key] as number;
          
          return (
            <motion.div
              key={type.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 ${type.borderColor} ${type.bgColor}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <IconComponent className={`h-5 w-5 mr-2 ${type.color.split(' ')[1]}`} />
                  <span className="font-medium text-gray-900">{type.label}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm font-bold ${type.color}`}>
                  {days}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${type.color.split(' ')[0]}`}
                  style={{ width: `${Math.min((days / 30) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {days} day{days !== 1 ? 's' : ''} available
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">Leave Summary</h4>
            <p className="text-sm text-gray-600">
              You have {getTotalLeaveDays()} total leave days available across all categories
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-blue-600">
              {Object.values(balance).filter(days => days > 0).length}
            </p>
            <p className="text-xs text-gray-500">Active Categories</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
