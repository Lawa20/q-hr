'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  UserIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  PaperClipIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { LeaveRequest } from '@/lib/mockLeaveData';
import ClientDate from '@/components/common/ClientDate';

interface LeaveRequestCardProps {
  request: LeaveRequest;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  showActions?: boolean;
  isApproving?: boolean;
  isRejecting?: boolean;
}

const getStatusConfig = (status: LeaveRequest['status']) => {
  switch (status) {
    case 'Approved':
      return {
        icon: CheckCircleIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        borderColor: 'border-green-200',
        label: 'Approved'
      };
    case 'Rejected':
      return {
        icon: XCircleIcon,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-200',
        label: 'Rejected'
      };
    case 'Pending':
      return {
        icon: ExclamationTriangleIcon,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        borderColor: 'border-yellow-200',
        label: 'Pending'
      };
    default:
      return {
        icon: ClockIcon,
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        borderColor: 'border-gray-200',
        label: 'Unknown'
      };
  }
};

const getLeaveTypeColor = (leaveType: LeaveRequest['leaveType']) => {
  switch (leaveType) {
    case 'Annual': return 'bg-blue-100 text-blue-800';
    case 'Sick': return 'bg-red-100 text-red-800';
    case 'Personal': return 'bg-purple-100 text-purple-800';
    case 'Maternity': return 'bg-pink-100 text-pink-800';
    case 'Paternity': return 'bg-cyan-100 text-cyan-800';
    case 'Emergency': return 'bg-orange-100 text-orange-800';
    case 'Study': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function LeaveRequestCard({ 
  request, 
  onApprove, 
  onReject, 
  onViewDetails,
  showActions = false,
  isApproving = false,
  isRejecting = false
}: LeaveRequestCardProps) {
  const statusConfig = getStatusConfig(request.status);
  const StatusIcon = statusConfig.icon;



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-xl shadow-sm border-2 ${statusConfig.borderColor} hover:shadow-md transition-all duration-200`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
              <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{request.employeeName}</h3>
              <p className="text-sm text-gray-500">{request.employeeEmail}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(request.leaveType)}`}>
              {request.leaveType}
            </span>
          </div>
        </div>

        {/* Leave Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarDaysIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>
              <ClientDate date={request.startDate} /> - <ClientDate date={request.endDate} />
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>{request.totalDays} day{request.totalDays !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
            <span className="font-medium">Reason:</span> {request.reason}
          </p>
        </div>

        {/* Attachments */}
        {request.attachments && request.attachments.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <PaperClipIcon className="h-4 w-4 mr-1" />
              <span>Attachments ({request.attachments.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {request.attachments.map((attachment, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-200"
                >
                  {attachment}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Review Information */}
        {request.status !== 'Pending' && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <UserIcon className="h-4 w-4 mr-2" />
              <span>Reviewed by {request.reviewedBy}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="h-4 w-4 mr-2" />
              <ClientDate date={request.reviewedDate!} />
            </div>
            {request.comments && (
              <div className="mt-2">
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                  <span>Comments:</span>
                </div>
                <p className="text-sm text-gray-700 bg-white rounded p-2 border">
                  {request.comments}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Submitted Date */}
        <div className="text-xs text-gray-500 mb-4">
          Submitted: <ClientDate date={request.submittedDate} />
        </div>

        {/* Actions */}
        {showActions && request.status === 'Pending' && (
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => onViewDetails?.(request.id)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              View Details
            </button>
            <button
              onClick={() => onReject?.(request.id)}
              disabled={isRejecting}
              className="px-4 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 text-sm"
            >
              {isRejecting ? 'Rejecting...' : 'Reject'}
            </button>
            <button
              onClick={() => onApprove?.(request.id)}
              disabled={isApproving}
              className="px-4 py-2 text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50 text-sm"
            >
              {isApproving ? 'Approving...' : 'Approve'}
            </button>
          </div>
        )}

        {!showActions && onViewDetails && (
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={() => onViewDetails(request.id)}
              className="px-4 py-2 text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors text-sm"
            >
              View Details
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
