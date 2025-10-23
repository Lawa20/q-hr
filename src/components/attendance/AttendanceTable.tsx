'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClockIcon,
  MapPinIcon,
  UserIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  WifiIcon,
  SignalSlashIcon,
  EyeIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { AttendanceRecord } from '@/lib/mockAttendanceData';
import { formatDate, formatDateTime, formatTime } from '@/lib/dateUtils';
import ClientDate from '@/components/common/ClientDate';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  onExport: (format: 'excel' | 'pdf') => void;
  isExporting: boolean;
}

export default function AttendanceTable({ records, onExport, isExporting }: AttendanceTableProps) {
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [sortField, setSortField] = useState<keyof AttendanceRecord>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof AttendanceRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedRecords = [...records].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === 'timestamp') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusIcon = (record: AttendanceRecord) => {
    if (record.location.zoneStatus === 'Outside Zone') {
      return <ExclamationTriangleIcon className="h-4 w-4 text-orange-500" />;
    }
    if (record.faceRecognition.verified) {
      return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
    }
    return <XCircleIcon className="h-4 w-4 text-red-500" />;
  };

  const getStatusColor = (record: AttendanceRecord) => {
    if (record.location.zoneStatus === 'Outside Zone') {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
    if (record.faceRecognition.verified) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getTypeColor = (type: string) => {
    return type === 'check-in' 
      ? 'bg-blue-100 text-blue-800 border-blue-200'
      : 'bg-purple-100 text-purple-800 border-purple-200';
  };

  return (
    <div className="space-y-6">
      {/* Export Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Attendance Records ({records.length})
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onExport('excel')}
              disabled={isExporting}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={() => onExport('pdf')}
              disabled={isExporting}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  onClick={() => handleSort('employeeName')}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <UserIcon className="h-4 w-4" />
                    <span>Employee</span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort('department')}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <BuildingOfficeIcon className="h-4 w-4" />
                    <span>Department</span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort('type')}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>Type</span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort('timestamp')}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>Time</span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort('location')}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="h-4 w-4" />
                    <span>Location</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedRecords.map((record, index) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                          {record.employeeName.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {record.employeeName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.position}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {record.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(record.type)}`}>
                      {record.type === 'check-in' ? 'Check In' : 'Check Out'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <ClientDate date={record.timestamp} />
                    </div>
                    <div className="text-sm text-gray-500">
                      <ClientDate date={record.timestamp} className="text-sm text-gray-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {record.location.address}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(record)}`}>
                        {record.location.zoneStatus}
                      </span>
                      <div className="flex items-center space-x-1">
                        {record.isOffline ? (
                          <SignalSlashIcon className="h-4 w-4 text-orange-500" />
                        ) : (
                          <WifiIcon className="h-4 w-4 text-green-500" />
                        )}
                        <span className="text-xs text-gray-500">
                          {record.isOffline ? 'Offline' : 'Online'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record)}
                      <span className="text-sm text-gray-900">
                        {record.faceRecognition.verified ? 'Verified' : 'Failed'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Confidence: {(record.faceRecognition.confidence * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Attendance Record Details</h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Employee Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Employee Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-sm text-gray-900">{selectedRecord.employeeName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department</label>
                    <p className="text-sm text-gray-900">{selectedRecord.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Position</label>
                    <p className="text-sm text-gray-900">{selectedRecord.position}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Employee ID</label>
                    <p className="text-sm text-gray-900">{selectedRecord.employeeId}</p>
                  </div>
                </div>
              </div>

              {/* Attendance Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Attendance Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Type</label>
                    <p className="text-sm text-gray-900 capitalize">{selectedRecord.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date & Time</label>
                    <p className="text-sm text-gray-900">{formatDateTime(selectedRecord.timestamp)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Face Recognition</label>
                    <p className="text-sm text-gray-900">
                      {selectedRecord.faceRecognition.verified ? 'Verified' : 'Failed'} 
                      ({(selectedRecord.faceRecognition.confidence * 100).toFixed(1)}%)
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Connection</label>
                    <p className="text-sm text-gray-900">
                      {selectedRecord.isOffline ? 'Offline' : 'Online'} 
                      {selectedRecord.synced ? ' (Synced)' : ' (Pending Sync)'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Location Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-sm text-gray-900">{selectedRecord.location.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Latitude</label>
                      <p className="text-sm text-gray-900">{selectedRecord.location.latitude.toFixed(6)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Longitude</label>
                      <p className="text-sm text-gray-900">{selectedRecord.location.longitude.toFixed(6)}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Zone Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedRecord)}`}>
                      {selectedRecord.location.zoneStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedRecord.notes && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Notes</h4>
                  <p className="text-sm text-gray-900">{selectedRecord.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
