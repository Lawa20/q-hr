'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
 FunnelIcon, 
 CalendarDaysIcon, 
 XMarkIcon,
 MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { LeaveRequest } from '@/lib/mockLeaveData';

interface LeaveFiltersProps {
 filters: {
 status: string;
 leaveType: string;
 dateRange: {
 start: string;
 end: string;
 };
 search: string;
 };
 onFiltersChange: (filters: LeaveFiltersProps['filters']) => void;
 onClearFilters: () => void;
 totalResults: number;
}

const statusOptions = [
 { value: 'all', label: 'All Status' },
 { value: 'Pending', label: 'Pending' },
 { value: 'Approved', label: 'Approved' },
 { value: 'Rejected', label: 'Rejected' }
];

const leaveTypeOptions = [
 { value: 'all', label: 'All Types' },
 { value: 'Annual', label: 'Annual Leave' },
 { value: 'Sick', label: 'Sick Leave' },
 { value: 'Personal', label: 'Personal Leave' },
 { value: 'Maternity', label: 'Maternity Leave' },
 { value: 'Paternity', label: 'Paternity Leave' },
 { value: 'Emergency', label: 'Emergency Leave' },
 { value: 'Study', label: 'Study Leave' }
];

export default function LeaveFilters({ 
 filters, 
 onFiltersChange, 
 onClearFilters, 
 totalResults 
}: LeaveFiltersProps) {
 const handleFilterChange = (key: keyof typeof filters, value: any) => {
 onFiltersChange({
 ...filters,
 [key]: value
 });
 };

 const hasActiveFilters = 
 filters.status !== 'all' ||
 filters.leaveType !== 'all' ||
 filters.dateRange.start ||
 filters.dateRange.end ||
 filters.search;

 return (
 <motion.div
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
 >
 <div className="flex items-center justify-between mb-4">
 <div className="flex items-center">
 <FunnelIcon className="h-5 w-5 mr-2 text-gray-600" />
 <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
 </div>
 <div className="flex items-center space-x-4">
 <span className="text-sm text-gray-500">
 {totalResults} result{totalResults !== 1 ? 's' : ''}
 </span>
 {hasActiveFilters && (
 <button
 onClick={onClearFilters}
 className="flex items-center text-sm text-red-600 hover:text-red-700 transition-colors"
 >
 <XMarkIcon className="h-4 w-4 mr-1" />
 Clear Filters
 </button>
 )}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 {/* Search */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">
 Search
 </label>
 <div className="relative">
 <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
 <input
 type="text"
 value={filters.search}
 onChange={(e) => handleFilterChange('search', e.target.value)}
 placeholder="Search by name or reason..."
 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
 />
 </div>
 </div>

 {/* Status Filter */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">
 Status
 </label>
 <select
 value={filters.status}
 onChange={(e) => handleFilterChange('status', e.target.value)}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
 >
 {statusOptions.map(option => (
 <option key={option.value} value={option.value}>
 {option.label}
 </option>
 ))}
 </select>
 </div>

 {/* Leave Type Filter */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">
 Leave Type
 </label>
 <select
 value={filters.leaveType}
 onChange={(e) => handleFilterChange('leaveType', e.target.value)}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
 >
 {leaveTypeOptions.map(option => (
 <option key={option.value} value={option.value}>
 {option.label}
 </option>
 ))}
 </select>
 </div>

 {/* Date Range */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">
 Date Range
 </label>
 <div className="flex space-x-2">
 <input
 type="date"
 value={filters.dateRange.start}
 onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 placeholder-gray-400"
 placeholder="Start date"
 />
 <input
 type="date"
 value={filters.dateRange.end}
 onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-900 placeholder-gray-400"
 placeholder="End date"
 />
 </div>
 </div>
 </div>

 {/* Active Filters Display */}
 {hasActiveFilters && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 className="mt-4 pt-4 border-t border-gray-200"
 >
 <div className="flex items-center flex-wrap gap-2">
 <span className="text-sm text-gray-600">Active filters:</span>
 
 {filters.status !== 'all' && (
 <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
 Status: {filters.status}
 </span>
 )}
 
 {filters.leaveType !== 'all' && (
 <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
 Type: {filters.leaveType}
 </span>
 )}
 
 {filters.dateRange.start && (
 <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
 From: {new Date(filters.dateRange.start).toLocaleDateString()}
 </span>
 )}
 
 {filters.dateRange.end && (
 <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
 To: {new Date(filters.dateRange.end).toLocaleDateString()}
 </span>
 )}
 
 {filters.search && (
 <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
 Search: "{filters.search}"
 </span>
 )}
 </div>
 </motion.div>
 )}
 </motion.div>
 );
}
