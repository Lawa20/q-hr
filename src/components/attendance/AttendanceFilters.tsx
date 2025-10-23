'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
 MagnifyingGlassIcon,
 FunnelIcon,
 CalendarDaysIcon,
 UserIcon,
 BuildingOfficeIcon,
 MapPinIcon,
 ClockIcon,
 XMarkIcon
} from '@heroicons/react/24/outline';

export interface AttendanceFilters {
 employeeName: string;
 department: string;
 dateRange: {
 start: string;
 end: string;
 };
 zoneStatus: string;
 type: string;
 search: string;
}

interface AttendanceFiltersProps {
 filters: AttendanceFilters;
 onFiltersChange: (filters: AttendanceFilters) => void;
 departments: string[];
 employeeNames: string[];
 totalRecords: number;
 filteredRecords: number;
}

export default function AttendanceFilters({
 filters,
 onFiltersChange,
 departments,
 employeeNames,
 totalRecords,
 filteredRecords
}: AttendanceFiltersProps) {
 const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

 const handleFilterChange = (key: keyof AttendanceFilters, value: any) => {
 onFiltersChange({
 ...filters,
 [key]: value
 });
 };

 const clearFilters = () => {
 onFiltersChange({
 employeeName: '',
 department: '',
 dateRange: { start: '', end: '' },
 zoneStatus: '',
 type: '',
 search: ''
 });
 };

 const hasActiveFilters = Object.values(filters).some(value => 
 typeof value === 'string' ? value !== '' : 
 typeof value === 'object' ? Object.values(value).some(v => v !== '') : false
 );

 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6"
 >
 {/* Header */}
 <div className="flex items-center justify-between mb-6">
 <div className="flex items-center space-x-3">
 <FunnelIcon className="h-6 w-6 text-blue-500" />
 <h3 className="text-lg font-semibold text-gray-900">Filter Attendance Records</h3>
 </div>
 <div className="flex items-center space-x-3">
 <span className="text-sm text-gray-500">
 Showing {filteredRecords} of {totalRecords} records
 </span>
 {hasActiveFilters && (
 <button
 onClick={clearFilters}
 className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 transition-colors"
 >
 <XMarkIcon className="h-4 w-4" />
 <span>Clear Filters</span>
 </button>
 )}
 </div>
 </div>

 {/* Search Bar */}
 <div className="mb-6">
 <div className="relative">
 <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
 <input
 type="text"
 placeholder="Search by employee name, department, or notes..."
 value={filters.search}
 onChange={(e) => handleFilterChange('search', e.target.value)}
 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 />
 </div>
 </div>

 {/* Quick Filters */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
 {/* Employee Name Filter */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">
 <UserIcon className="h-4 w-4 inline mr-1" />
 Employee
 </label>
 <select
 value={filters.employeeName}
 onChange={(e) => handleFilterChange('employeeName', e.target.value)}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 >
 <option value="">All Employees</option>
 {employeeNames.map(name => (
 <option key={name} value={name}>{name}</option>
 ))}
 </select>
 </div>

 {/* Department Filter */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">
 <BuildingOfficeIcon className="h-4 w-4 inline mr-1" />
 Department
 </label>
 <select
 value={filters.department}
 onChange={(e) => handleFilterChange('department', e.target.value)}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 >
 <option value="">All Departments</option>
 {departments.map(dept => (
 <option key={dept} value={dept}>{dept}</option>
 ))}
 </select>
 </div>

 {/* Zone Status Filter */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">
 <MapPinIcon className="h-4 w-4 inline mr-1" />
 Zone Status
 </label>
 <select
 value={filters.zoneStatus}
 onChange={(e) => handleFilterChange('zoneStatus', e.target.value)}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 >
 <option value="">All Locations</option>
 <option value="Inside Zone">Inside Zone</option>
 <option value="Outside Zone">Outside Zone</option>
 </select>
 </div>

 {/* Type Filter */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">
 <ClockIcon className="h-4 w-4 inline mr-1" />
 Type
 </label>
 <select
 value={filters.type}
 onChange={(e) => handleFilterChange('type', e.target.value)}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 >
 <option value="">All Types</option>
 <option value="check-in">Check In</option>
 <option value="check-out">Check Out</option>
 </select>
 </div>
 </div>

 {/* Advanced Filters Toggle */}
 <div className="border-t border-gray-200 pt-4">
 <button
 onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
 className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
 >
 <CalendarDaysIcon className="h-5 w-5" />
 <span className="font-medium">
 {showAdvancedFilters ? 'Hide' : 'Show'} Date Range Filter
 </span>
 </button>

 {/* Advanced Filters */}
 {showAdvancedFilters && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 className="mt-4 space-y-4"
 >
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">
 Start Date
 </label>
 <input
 type="date"
 value={filters.dateRange.start}
 onChange={(e) => handleFilterChange('dateRange', {
 ...filters.dateRange,
 start: e.target.value
 })}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">
 End Date
 </label>
 <input
 type="date"
 value={filters.dateRange.end}
 onChange={(e) => handleFilterChange('dateRange', {
 ...filters.dateRange,
 end: e.target.value
 })}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 />
 </div>
 </div>
 </motion.div>
 )}
 </div>
 </motion.div>
 );
}
