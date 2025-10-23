'use client';

import React, { useState, useEffect } from 'react';
import {
  ClockIcon,
  UserGroupIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { 
  generateMockAttendanceData, 
  getAttendanceStats, 
  filterAttendanceRecords,
  getDepartments,
  getEmployeeNames,
  AttendanceRecord,
  AttendanceStats
} from '@/lib/mockAttendanceData';
import AttendanceFiltersComponent, { AttendanceFilters } from '@/components/attendance/AttendanceFilters';
import AttendanceTable from '@/components/attendance/AttendanceTable';
import { exportToExcel, exportToPDF } from '@/lib/exportUtils';

export default function AttendanceModule() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [filters, setFilters] = useState<AttendanceFilters>({
    employeeName: '',
    department: '',
    dateRange: { start: '', end: '' },
    zoneStatus: '',
    type: '',
    search: ''
  });

  // Load mock data on component mount
  useEffect(() => {
    const mockData = generateMockAttendanceData();
    setAttendanceRecords(mockData);
    setFilteredRecords(mockData);
    setStats(getAttendanceStats(mockData));
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    let filtered = attendanceRecords;

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(record =>
        record.employeeName.toLowerCase().includes(searchTerm) ||
        record.department.toLowerCase().includes(searchTerm) ||
        record.position.toLowerCase().includes(searchTerm) ||
        (record.notes && record.notes.toLowerCase().includes(searchTerm))
      );
    }

    // Apply other filters
    if (filters.employeeName) {
      filtered = filtered.filter(record => record.employeeName === filters.employeeName);
    }

    if (filters.department) {
      filtered = filtered.filter(record => record.department === filters.department);
    }

    if (filters.zoneStatus) {
      filtered = filtered.filter(record => record.location.zoneStatus === filters.zoneStatus);
    }

    if (filters.type) {
      filtered = filtered.filter(record => record.type === filters.type);
    }

    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      endDate.setHours(23, 59, 59, 999); // Include entire end date
      
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.timestamp);
        return recordDate >= startDate && recordDate <= endDate;
      });
    }

    setFilteredRecords(filtered);
  }, [attendanceRecords, filters]);

  const handleExport = async (format: 'excel' | 'pdf') => {
    setIsExporting(true);
    
    try {
      if (format === 'excel') {
        exportToExcel(filteredRecords, `attendance_records_${new Date().toISOString().split('T')[0]}`);
      } else {
        exportToPDF(filteredRecords, `attendance_records_${new Date().toISOString().split('T')[0]}`);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const departments = getDepartments(attendanceRecords);
  const employeeNames = getEmployeeNames(attendanceRecords);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Attendance Management</h2>
          <p className="text-gray-600">Monitor employee check-in/out records with GPS tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
              </div>
              <UserGroupIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Checked In Today</p>
                <p className="text-2xl font-bold text-green-600">{stats.checkedInToday}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
                <p className="text-2xl font-bold text-orange-600">{stats.lateArrivals}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outside Zone</p>
                <p className="text-2xl font-bold text-red-600">{stats.outsideZoneCount}</p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>
      )}

      {/* Additional Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Early Departures</p>
                <p className="text-2xl font-bold text-purple-600">{stats.earlyDepartures}</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Check-in Time</p>
                <p className="text-2xl font-bold text-blue-600">{stats.averageCheckInTime}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Check-out Time</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.averageCheckOutTime}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-indigo-500" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <AttendanceFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        departments={departments}
        employeeNames={employeeNames}
        totalRecords={attendanceRecords.length}
        filteredRecords={filteredRecords.length}
      />

      {/* Attendance Table */}
      <div>
        <AttendanceTable
          records={filteredRecords}
          onExport={handleExport}
          isExporting={isExporting}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleExport('excel')}
            disabled={isExporting}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Export to Excel</span>
          </button>
          <button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Export to PDF</span>
          </button>
          <button
            onClick={() => setFilters({
              employeeName: '',
              department: '',
              dateRange: { start: '', end: '' },
              zoneStatus: '',
              type: '',
              search: ''
            })}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ChartBarIcon className="h-4 w-4" />
            <span>Clear All Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}