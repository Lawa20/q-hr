'use client';

import React, { useState, useEffect } from 'react';
import {
  ClockIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  UserIcon,
  ClockIcon as TimeIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface WorkHoursData {
  today: number;
  thisWeek: number;
  thisMonth: number;
  totalOvertime: number;
}

interface LeaveData {
  totalAnnualLeave: number;
  usedLeave: number;
  remainingLeave: number;
  pendingRequests: number;
}

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [workHours, setWorkHours] = useState<WorkHoursData>({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    totalOvertime: 0
  });
  
  const [leaveData, setLeaveData] = useState<LeaveData>({
    totalAnnualLeave: 25,
    usedLeave: 5,
    remainingLeave: 20,
    pendingRequests: 2
  });

  const [recentAttendance, setRecentAttendance] = useState<any[]>([]);
  const [upcomingLeaves, setUpcomingLeaves] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching employee data
    // In a real app, this would come from your API
    setWorkHours({
      today: 7.5,
      thisWeek: 37.5,
      thisMonth: 150,
      totalOvertime: 8
    });

    setRecentAttendance([
      { date: '2024-01-15', checkIn: '09:00', checkOut: '17:30', hours: 8.5, status: 'present' },
      { date: '2024-01-14', checkIn: '08:45', checkOut: '17:15', hours: 8.5, status: 'present' },
      { date: '2024-01-13', checkIn: '09:15', checkOut: '18:00', hours: 8.75, status: 'present' },
      { date: '2024-01-12', checkIn: '09:00', checkOut: '17:30', hours: 8.5, status: 'present' },
      { date: '2024-01-11', checkIn: '09:30', checkOut: '17:45', hours: 8.25, status: 'late' }
    ]);

    setUpcomingLeaves([
      { date: '2024-01-20', type: 'Annual Leave', status: 'approved', days: 3 },
      { date: '2024-02-15', type: 'Sick Leave', status: 'pending', days: 1 },
      { date: '2024-03-10', type: 'Annual Leave', status: 'pending', days: 5 }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100';
      case 'late': return 'text-yellow-600 bg-yellow-100';
      case 'absent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircleIcon className="h-4 w-4" />;
      case 'late': return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'absent': return <ExclamationTriangleIcon className="h-4 w-4" />;
      default: return <ClockIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-4 rounded-xl bg-blue-100">
            <UserIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Employee ID</p>
          <p className="text-lg font-semibold text-gray-900">#{user?.id?.slice(-6) || 'EMP001'}</p>
          <p className="text-sm text-gray-500">Active Employee</p>
        </div>
      </div>

      {/* Work Hours Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Hours</p>
              <p className="text-2xl font-bold text-blue-600">{workHours.today}h</p>
              <p className="text-xs text-gray-500">Regular time</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TimeIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-green-600">{workHours.thisWeek}h</p>
              <p className="text-xs text-gray-500">Total hours</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-purple-600">{workHours.thisMonth}h</p>
              <p className="text-xs text-gray-500">Total hours</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overtime</p>
              <p className="text-2xl font-bold text-orange-600">{workHours.totalOvertime}h</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Annual Leave Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Annual Leave</h3>
            <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Days</span>
              <span className="text-sm font-medium text-gray-900">{leaveData.totalAnnualLeave}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Used</span>
              <span className="text-sm font-medium text-red-600">{leaveData.usedLeave}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Remaining</span>
              <span className="text-lg font-bold text-green-600">{leaveData.remainingLeave} days</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(leaveData.remainingLeave / leaveData.totalAnnualLeave) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Attendance</h3>
            <ClockIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            {recentAttendance.slice(0, 3).map((record, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{record.date}</p>
                    <p className="text-xs text-gray-500">{record.checkIn} - {record.checkOut}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{record.hours}h</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Leaves</h3>
            <CalendarIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            {upcomingLeaves.map((leave, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{leave.date}</p>
                  <p className="text-xs text-gray-500">{leave.type} - {leave.days} days</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  leave.status === 'approved' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                }`}>
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ClockIcon className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Check In/Out</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CalendarDaysIcon className="h-6 w-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Request Leave</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ChartBarIcon className="h-6 w-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Reports</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <UserIcon className="h-6 w-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
