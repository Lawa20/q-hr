'use client';

import React from 'react';
import { 
  PlusIcon, 
  CalendarDaysIcon, 
  ClockIcon, 
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const LeaveTracker: React.FC = () => {
  const leaveRequests = [
    {
      id: 1,
      type: 'Annual Leave',
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      days: 3,
      status: 'pending',
      reason: 'Family vacation',
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2024-01-10',
      endDate: '2024-01-10',
      days: 1,
      status: 'approved',
      reason: 'Medical appointment',
    },
    {
      id: 3,
      type: 'Personal Leave',
      startDate: '2024-01-08',
      endDate: '2024-01-08',
      days: 1,
      status: 'rejected',
      reason: 'Personal matters',
    },
  ];

  const leaveBalances = [
    { type: 'Annual Leave', total: 21, used: 5, remaining: 16 },
    { type: 'Sick Leave', total: 10, used: 2, remaining: 8 },
    { type: 'Personal Leave', total: 5, used: 1, remaining: 4 },
    { type: 'Emergency Leave', total: 3, used: 0, remaining: 3 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Leave Tracker</h2>
            <p className="text-gray-600">
              Manage your leave requests and track your leave balances.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <PlusIcon className="w-5 h-5" />
            <span>New Request</span>
          </button>
        </div>
      </div>

      {/* Leave Balances */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Balances</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaveBalances.map((balance, index) => (
            <div
              key={balance.type}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <h4 className="font-medium text-gray-900 mb-2">{balance.type}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">{balance.total} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Used:</span>
                  <span className="font-medium text-red-600">{balance.used} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-medium text-green-600">{balance.remaining} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Leave Requests</h3>
        <div className="space-y-4">
          {leaveRequests.map((request, index) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <CalendarDaysIcon className="w-6 h-6 text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-900">{request.type}</h4>
                  <p className="text-sm text-gray-600">
                    {request.startDate} - {request.endDate} ({request.days} days)
                  </p>
                  <p className="text-sm text-gray-500">{request.reason}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
                {getStatusIcon(request.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveTracker;
