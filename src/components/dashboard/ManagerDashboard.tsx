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
  UsersIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface DepartmentData {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  pendingApprovals: number;
  departmentBudget: number;
  usedBudget: number;
}

interface WorkHoursData {
  today: number;
  thisWeek: number;
  thisMonth: number;
  departmentAverage: number;
}

interface LeaveData {
  totalAnnualLeave: number;
  usedLeave: number;
  remainingLeave: number;
  pendingRequests: number;
}

export default function ManagerDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [departmentData, setDepartmentData] = useState<DepartmentData>({
    totalEmployees: 25,
    presentToday: 20,
    onLeave: 5,
    pendingApprovals: 8,
    departmentBudget: 500000,
    usedBudget: 350000
  });
  
  const [workHours, setWorkHours] = useState<WorkHoursData>({
    today: 7.5,
    thisWeek: 37.5,
    thisMonth: 150,
    departmentAverage: 7.3
  });
  
  const [leaveData, setLeaveData] = useState<LeaveData>({
    totalAnnualLeave: 25,
    usedLeave: 5,
    remainingLeave: 20,
    pendingRequests: 8
  });

  const [supervisors, setSupervisors] = useState<any[]>([]);
  const [departmentStats, setDepartmentStats] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching manager data
    setSupervisors([
      { id: '1', name: 'Sarah Johnson', team: 'Engineering', employees: 8, status: 'active' },
      { id: '2', name: 'Mike Chen', team: 'Marketing', employees: 6, status: 'active' },
      { id: '3', name: 'Lisa Davis', team: 'Sales', employees: 7, status: 'active' },
      { id: '4', name: 'David Wilson', team: 'HR', employees: 4, status: 'active' }
    ]);

    setDepartmentStats([
      { department: 'Engineering', employees: 8, present: 7, onLeave: 1, efficiency: 95 },
      { department: 'Marketing', employees: 6, present: 5, onLeave: 1, efficiency: 88 },
      { department: 'Sales', employees: 7, present: 6, onLeave: 1, efficiency: 92 },
      { department: 'HR', employees: 4, present: 4, onLeave: 0, efficiency: 100 }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-green-600 bg-green-100';
    if (efficiency >= 85) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-4 rounded-xl bg-purple-100">
            <BuildingOfficeIcon className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Manager ID</p>
          <p className="text-lg font-semibold text-gray-900">#{user?.id?.slice(-6) || 'MGR001'}</p>
          <p className="text-sm text-gray-500">Department Manager</p>
        </div>
      </div>

      {/* Department Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-blue-600">{departmentData.totalEmployees}</p>
              <p className="text-xs text-gray-500">Department wide</p>
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
              <p className="text-2xl font-bold text-green-600">{departmentData.presentToday}</p>
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
              <p className="text-2xl font-bold text-blue-600">{departmentData.onLeave}</p>
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
              <p className="text-2xl font-bold text-orange-600">{departmentData.pendingApprovals}</p>
              <p className="text-xs text-gray-500">Awaiting review</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Budget & Work Hours Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Department Budget</h3>
            <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Budget</span>
              <span className="text-sm font-medium text-gray-900">${departmentData.departmentBudget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Used</span>
              <span className="text-sm font-medium text-red-600">${departmentData.usedBudget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Remaining</span>
              <span className="text-lg font-bold text-green-600">
                ${(departmentData.departmentBudget - departmentData.usedBudget).toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(departmentData.usedBudget / departmentData.departmentBudget) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

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
              <span className="text-sm text-gray-600">Department Average</span>
              <span className="text-sm font-medium text-gray-900">{workHours.departmentAverage}h/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Supervisors & Department Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Supervisors</h3>
            <UsersIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            {supervisors.map((supervisor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-indigo-600">
                      {supervisor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{supervisor.name}</p>
                    <p className="text-xs text-gray-500">{supervisor.team} - {supervisor.employees} employees</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supervisor.status)}`}>
                  {supervisor.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
            <ChartBarIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            {departmentStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{stat.department}</p>
                  <p className="text-xs text-gray-500">{stat.employees} employees - {stat.present} present</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{stat.efficiency}%</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEfficiencyColor(stat.efficiency)}`}>
                    {stat.efficiency >= 95 ? 'Excellent' : stat.efficiency >= 85 ? 'Good' : 'Needs Attention'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Annual Leave */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">My Annual Leave</h3>
          <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{leaveData.totalAnnualLeave}</p>
            <p className="text-sm text-gray-600">Total Days</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{leaveData.usedLeave}</p>
            <p className="text-sm text-gray-600">Used</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{leaveData.remainingLeave}</p>
            <p className="text-sm text-gray-600">Remaining</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{leaveData.pendingRequests}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BuildingOfficeIcon className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Department Overview</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CalendarDaysIcon className="h-6 w-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Approve Leaves</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ChartBarIcon className="h-6 w-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Department Reports</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CurrencyDollarIcon className="h-6 w-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Budget Management</span>
          </button>
        </div>
      </div>
    </div>
  );
}
