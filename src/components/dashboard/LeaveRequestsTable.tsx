'use client';

import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface LeaveRequest {
  id: string;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

interface LeaveRequestsTableProps {
  requests: LeaveRequest[];
  onView: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  userRole: 'employee' | 'hr' | 'admin';
}

const statusIcons = {
  pending: ClockIcon,
  approved: CheckCircleIcon,
  rejected: XCircleIcon,
};

const statusColors = {
  pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  approved: 'text-green-600 bg-green-50 border-green-200',
  rejected: 'text-red-600 bg-red-50 border-red-200',
};

export default function LeaveRequestsTable({ 
  requests, 
  onView, 
  onApprove, 
  onReject,
  userRole 
}: LeaveRequestsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CalendarDaysIcon className="h-6 w-6 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Leave Requests</h3>
        </div>
        <span className="text-sm text-gray-500">
          {requests.filter(r => r.status === 'pending').length} pending
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Employee</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Type</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Duration</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Status</th>
              {userRole !== 'employee' && (
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={userRole !== 'employee' ? 5 : 4} className="text-center py-8">
                  <CalendarDaysIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No leave requests</p>
                </td>
              </tr>
            ) : (
              requests.slice(0, 5).map((request, index) => {
                const StatusIcon = statusIcons[request.status];
                return (
                  <motion.tr
                    key={request.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-4 px-2">
                      <div>
                        <p className="font-medium text-gray-900">{request.employee}</p>
                        <p className="text-sm text-gray-500">{request.reason}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-sm text-gray-900">{request.type}</span>
                    </td>
                    <td className="py-4 px-2">
                      <div>
                        <p className="text-sm text-gray-900">
                          {request.startDate} - {request.endDate}
                        </p>
                        <p className="text-xs text-gray-500">{request.days} days</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${statusColors[request.status]}
                      `}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    {userRole !== 'employee' && (
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onView(request.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="View details"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          {request.status === 'pending' && (
                            <>
                              <button
                                onClick={() => onApprove(request.id)}
                                className="p-1 text-green-600 hover:text-green-800 transition-colors"
                                title="Approve"
                              >
                                <CheckCircleIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => onReject(request.id)}
                                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                title="Reject"
                              >
                                <XCircleIcon className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    )}
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {requests.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all requests
          </button>
        </div>
      )}
    </motion.div>
  );
}
