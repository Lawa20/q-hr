'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  ClockIcon, 
  UserGroupIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  WifiIcon,
  SignalSlashIcon,
  EyeIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { 
  mockUsers, 
  mockGeofenceZones, 
  generateMockCheckInHistory, 
  generateMockNotifications,
  mockAttendanceStats,
  mockRealTimeData,
  type MockCheckInOut,
  type MockNotification
} from '@/lib/mockAttendanceData';
import { initializeDemoData, getDemoData } from '@/lib/demoDataGenerator';

export default function AttendanceDashboard() {
  const [checkInHistory, setCheckInHistory] = useState<MockCheckInOut[]>([]);
  const [notifications, setNotifications] = useState<MockNotification[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'today' | 'week' | 'month'>('today');
  const [filterStatus, setFilterStatus] = useState<'all' | 'inside' | 'outside'>('all');

  useEffect(() => {
    // Initialize demo data and load it
    const demoData = getDemoData();
    if (!demoData) {
      initializeDemoData();
      const newDemoData = getDemoData();
      if (newDemoData) {
        setCheckInHistory(newDemoData.checkIns);
        setNotifications(newDemoData.notifications);
      }
    } else {
      setCheckInHistory(demoData.checkIns);
      setNotifications(demoData.notifications);
    }
  }, []);

  const filteredHistory = checkInHistory.filter(record => {
    if (filterStatus === 'all') return true;
    return record.geofenceStatus === filterStatus;
  });

  const getStatusIcon = (record: MockCheckInOut) => {
    if (record.type === 'check-in') {
      return record.geofenceStatus === 'inside' 
        ? <CheckCircleIcon className="h-5 w-5 text-green-500" />
        : <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
    } else {
      return <XCircleIcon className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (record: MockCheckInOut) => {
    if (record.type === 'check-in') {
      return record.geofenceStatus === 'inside' ? 'text-green-600' : 'text-yellow-600';
    } else {
      return 'text-red-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Attendance Dashboard
        </h2>
        <p className="text-gray-600">
          Real-time monitoring of face recognition and GPS tracking
        </p>
      </div>

      {/* Real-time Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-blue-600">{mockRealTimeData.activeUsers}</p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <WifiIcon className="h-4 w-4 mr-1" />
            Online
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Face Recognition</p>
              <p className="text-2xl font-bold text-green-600">{mockAttendanceStats.thisWeek.faceRecognitionAccuracy}%</p>
            </div>
            <EyeIcon className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <ShieldCheckIcon className="h-4 w-4 mr-1" />
            Accuracy Rate
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Geofence Compliance</p>
              <p className="text-2xl font-bold text-blue-600">{mockAttendanceStats.thisWeek.geofenceCompliance}%</p>
            </div>
            <MapPinIcon className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <CheckCircleIcon className="h-4 w-4 mr-1" />
            In Zone
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Alerts</p>
              <p className="text-2xl font-bold text-red-600">{mockAttendanceStats.alerts.pending}</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <ClockIcon className="h-4 w-4 mr-1" />
            Requires Attention
          </div>
        </motion.div>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTimeRange('today')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTimeRange === 'today'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setSelectedTimeRange('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTimeRange === 'week'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setSelectedTimeRange('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTimeRange === 'month'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Month
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'all'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Locations
          </button>
          <button
            onClick={() => setFilterStatus('inside')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'inside'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Inside Geofence
          </button>
          <button
            onClick={() => setFilterStatus('outside')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'outside'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Outside Geofence
          </button>
        </div>
      </div>

      {/* Check-in History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Check-In/Out Activity
          </h3>
          <p className="text-sm text-gray-600">
            Real-time face recognition and GPS tracking logs
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Face Recognition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.slice(0, 10).map((record, index) => {
                const user = mockUsers.find(u => u.id === record.userId);
                return (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user?.avatar || '/default-avatar.png'}
                            alt={user?.name || 'Unknown'}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user?.name || 'Unknown User'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user?.department || 'Unknown Department'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.type === 'check-in'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.type === 'check-in' ? 'Check In' : 'Check Out'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                        {record.location.address}
                      </div>
                      <div className="text-xs text-gray-500">
                        {record.location.latitude.toFixed(4)}, {record.location.longitude.toFixed(4)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {record.faceRecognition.verified ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <XCircleIcon className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${
                          record.faceRecognition.verified ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {(record.faceRecognition.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(record)}
                        <span className={`ml-2 text-sm font-medium ${getStatusColor(record)}`}>
                          {record.geofenceStatus === 'inside' ? 'In Zone' : 'Outside Zone'}
                        </span>
                      </div>
                      {record.isOffline && (
                        <div className="flex items-center mt-1">
                          <SignalSlashIcon className="h-3 w-3 text-orange-500 mr-1" />
                          <span className="text-xs text-orange-600">Offline</span>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Alerts & Notifications
        </h3>
        
        <div className="space-y-3">
          {notifications.slice(0, 5).map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-l-4 ${
                notification.priority === 'high'
                  ? 'border-red-500 bg-red-50'
                  : notification.priority === 'medium'
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    notification.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : notification.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {notification.priority}
                  </span>
                  {!notification.read && (
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
