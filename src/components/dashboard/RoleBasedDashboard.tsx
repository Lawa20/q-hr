'use client';

import React from 'react';
import {
  UsersIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  BellIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  EyeIcon,
  BriefcaseIcon,
  StarIcon,
  AcademicCapIcon,
  FolderIcon,
  ChatBubbleLeftIcon,
  ClipboardIcon,
  WrenchScrewdriverIcon,
  CloudIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getUserDashboardData } from '@/lib/mockUsers';
import { getRoleDisplayName, getRoleColor } from '@/lib/auth';
import { mockEmployees, mockAttendanceRecords, mockLeaveRequests, mockPayrollRecords, mockMessages, mockNotifications } from '@/lib/mockData';
import EmployeeDashboard from './EmployeeDashboard';
import SupervisorDashboard from './SupervisorDashboard';
import ManagerDashboard from './ManagerDashboard';

export default function RoleBasedDashboard() {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();

  console.log('RoleBasedDashboard - user:', user);
  console.log('RoleBasedDashboard - t:', t);

  // Show loading state only when actually loading, not when user is null
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please log in to continue</h2>
        </div>
      </div>
    );
  }

  // Render role-specific dashboards
  if (user.role === 'EMPLOYEE') {
    return <EmployeeDashboard />;
  }
  
  if (user.role === 'SUPERVISOR') {
    return <SupervisorDashboard />;
  }
  
  if (user.role === 'MANAGER') {
    return <ManagerDashboard />;
  }

  // Fallback to original dashboard for other roles (ADMIN, HR_MANAGER)
  const dashboardData = getUserDashboardData(user.role);
  
  // Get real-time data from mock data
  const todayAttendance = mockAttendanceRecords.filter(record => 
    new Date(record.timestamp).toDateString() === new Date().toDateString()
  );
  
  const pendingLeaves = mockLeaveRequests.filter(leave => leave.status === 'pending');
  const unreadMessages = mockMessages.filter(msg => !msg.isRead);
  const unreadNotifications = mockNotifications.filter(notif => !notif.isRead);

  const roleIconMap: Record<string, any> = {
    admin: ShieldCheckIcon,
    hr: UserGroupIcon,
    manager: UserGroupIcon,
    supervisor: EyeIcon,
    finance: CurrencyDollarIcon,
    employee: BriefcaseIcon
  };

  const quickActionIconMap: Record<string, any> = {
    UsersIcon,
    ChartBarIcon,
    ClockIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    BellIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    EyeIcon,
    BriefcaseIcon,
    StarIcon,
    AcademicCapIcon,
    FolderIcon,
    ChatBubbleLeftIcon,
    ClipboardIcon,
    WrenchScrewdriverIcon,
    CloudIcon
  };

  const RoleIcon = roleIconMap[user.role] || BriefcaseIcon;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-4 rounded-xl ${getRoleColor(user.role).split(' ')[0]} ${getRoleColor(user.role).split(' ')[1]}`}>
            <RoleIcon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t.dashboard}
            </h1>
            <p className="text-gray-600">{t.welcomeBack}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{t.welcomeBack},</p>
          <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{getRoleDisplayName(user.role)}</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Today's Attendance */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 motion-safe"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.todaysAttendance}</p>
              <p className="text-2xl font-bold text-blue-600">{todayAttendance.length}</p>
              <p className="text-xs text-gray-500">Checked in today</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Pending Leave Requests */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 motion-safe"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.pendingRequests}</p>
              <p className="text-2xl font-bold text-orange-600">{pendingLeaves.length}</p>
              <p className="text-xs text-gray-500">Awaiting approval</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Unread Messages */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 motion-safe"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.messages}</p>
              <p className="text-2xl font-bold text-purple-600">{unreadMessages.length}</p>
              <p className="text-xs text-gray-500">Unread messages</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ChatBubbleLeftIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 motion-safe"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.notifications}</p>
              <p className="text-2xl font-bold text-red-600">{unreadNotifications.length}</p>
              <p className="text-xs text-gray-500">New notifications</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <BellIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 motion-safe"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardData.quickActions.map((action, index) => {
            const Icon = quickActionIconMap[action.icon] || FolderIcon;
            return (
              <button
                key={action.name}
                className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-optimized motion-safe"
              >
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{action.name}</p>
                  <p className="text-sm text-gray-500">{action.href}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 motion-safe"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {dashboardData.recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg motion-safe"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role-specific content */}
      {user.role === 'employee' && (
        <div
          className="bg-blue-50 border border-blue-200 rounded-xl p-6 motion-safe"
        >
          <div className="flex items-center space-x-3">
            <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            <div>
              <h4 className="font-semibold text-blue-900">Employee Portal</h4>
              <p className="text-sm text-blue-700">
                Access your personal information, leave requests, and time tracking.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}