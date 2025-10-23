'use client';

import React, { useState, useEffect } from 'react';
import {
  ClockIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  UserGroupIcon,
  EyeIcon,
  ClockIcon as TimeIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface TeamData {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  pendingApprovals: number;
}

interface WorkHoursData {
  today: number;
  thisWeek: number;
  thisMonth: number;
  teamAverage: number;
}

interface LeaveData {
  totalAnnualLeave: number;
  usedLeave: number;
  remainingLeave: number;
  pendingRequests: number;
}

export default function SupervisorDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [teamData, setTeamData] = useState<TeamData>({
    totalEmployees: 8,
    presentToday: 6,
    onLeave: 2,
    pendingApprovals: 3
  });
  
  const [workHours, setWorkHours] = useState<WorkHoursData>({
    today: 7.5,
    thisWeek: 37.5,
    thisMonth: 150,
    teamAverage: 7.2
  });
  
  const [leaveData, setLeaveData] = useState<LeaveData>({
    totalAnnualLeave: 25,
    usedLeave: 5,
    remainingLeave: 20,
    pendingRequests: 3
  });

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching supervisor data
    setTeamMembers([
      { id: '1', name: 'John Doe', status: 'present', hours: 8.5, department: 'Engineering' },
      { id: '2', name: 'Jane Smith', status: 'present', hours: 7.5, department: 'Engineering' },
      { id: '3', name: 'Mike Johnson', status: 'on-leave', hours: 0, department: 'Engineering' },
      { id: '4', name: 'Sarah Wilson', status: 'present', hours: 8.0, department: 'Engineering' },
      { id: '5', name: 'David Brown', status: 'late', hours: 7.0, department: 'Engineering' },
      { id: '6', name: 'Lisa Davis', status: 'present', hours: 8.5, department: 'Engineering' }
    ]);

    setPendingApprovals([
      { id: '1', employee: 'Mike Johnson', type: 'Annual Leave', days: 3, date: '2024-01-20', status: 'pending' },
      { id: '2', employee: 'Sarah Wilson', type: 'Sick Leave', days: 1, date: '2024-01-18', status: 'pending' },
      { id: '3', employee: 'David Brown', type: 'Personal Leave', days: 2, date: '2024-01-25', status: 'pending' }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100';
      case 'late': return 'text-yellow-600 bg-yellow-100';
      case 'on-leave': return 'text-blue-600 bg-blue-100';
      case 'absent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircleIcon className="h-4 w-4" />;
      case 'late': return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'on-leave': return <CalendarDaysIcon className="h-4 w-4" />;
      case 'absent': return <ExclamationTriangleIcon className="h-4 w-4" />;
      default: return <ClockIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-4 rounded-xl bg-indigo-100">
            <EyeIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supervisor Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Supervisor ID</p>
          <p className="text-lg font-semibold text-gray-900">#{user?.id?.slice(-6) || 'SUP001'}</p>
          <p className="text-sm text-gray-500">Team Leader</p>
        </div>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-blue-600">{teamData.totalEmployees}</p>
              <p className="text-xs text-gray-500">Total employees</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-green-600">{teamData.presentToday}</p>
              <p className="text-xs text-gray-500">Checked in</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-blue-600">{teamData.onLeave}</p>
              <p className="text-xs text-gray-500">Team members</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-orange-600">{teamData.pendingApprovals}</p>
              <p className="text-xs text-gray-500">Awaiting review</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Work Hours & Leave Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">My Work Hours</h3>
            <ClockIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Today</span>
              <span className="text-sm font-medium text-gray-900">{workHours.today}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-sm font-medium text-gray-900">{workHours.thisWeek}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="text-sm font-medium text-gray-900">{workHours.thisMonth}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Team Average</span>
              <span className="text-sm font-medium text-gray-900">{workHours.teamAverage}h/day</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">My Annual Leave</h3>
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
      </div>

      {/* Team Status & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Team Status</h3>
            <UsersIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            {teamMembers.slice(0, 4).map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(member.status)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{member.hours}h</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
            <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((approval, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{approval.employee}</p>
                  <p className="text-xs text-gray-500">{approval.type} - {approval.days} days</p>
                  <p className="text-xs text-gray-400">{approval.date}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-green-100 text-green-600 rounded text-xs font-medium hover:bg-green-200">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-600 rounded text-xs font-medium hover:bg-red-200">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <UserGroupIcon className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Team Overview</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CalendarDaysIcon className="h-6 w-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Approve Leaves</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ChartBarIcon className="h-6 w-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Team Reports</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ClockIcon className="h-6 w-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Attendance</span>
          </button>
        </div>
      </div>
    </div>
  );
}
