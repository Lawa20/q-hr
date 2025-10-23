'use client';

import React, { useState, useEffect } from 'react';
import {
 CurrencyDollarIcon,
 UserGroupIcon,
 ChartBarIcon,
 BanknotesIcon,
 ArrowTrendingUpIcon,
 ArrowTrendingDownIcon,
 ExclamationTriangleIcon,
 CheckCircleIcon,
 ClockIcon,
 ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { 
 generateMockPayrollData, 
 getPayrollSummary, 
 filterPayrollRecords,
 getDepartments,
 getMonths,
 getYears,
 PayrollRecord,
 PayrollSummary
} from '@/lib/mockPayrollData';
import PayrollTable from '@/components/payroll/PayrollTable';
import { useAuth } from '@/contexts/AuthContext';
import { exportPayrollToExcel, exportPayrollToPDF, generatePayrollSummary } from '@/lib/payrollExportUtils';

interface PayrollFilters {
 employeeName: string;
 department: string;
 month: string;
 year: number;
 status: string;
 search: string;
}

export default function PayrollModule() {
 const { user, hasPermission } = useAuth();
 const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
 const [filteredRecords, setFilteredRecords] = useState<PayrollRecord[]>([]);
 const [summary, setSummary] = useState<PayrollSummary | null>(null);
 const [isExporting, setIsExporting] = useState(false);
 const [filters, setFilters] = useState<PayrollFilters>({
 employeeName: '',
 department: '',
 month: '',
 year: 0,
 status: '',
 search: ''
 });

 // Load mock data on component mount
 useEffect(() => {
  // Only load if user has permission
  if (user && hasPermission('view_payroll')) {
    const mockData = generateMockPayrollData();
    setPayrollRecords(mockData);
    setFilteredRecords(mockData);
    setSummary(getPayrollSummary(mockData));
  }
}, [user, hasPermission]);

 // Apply filters whenever filters change
 useEffect(() => {
  if (!payrollRecords.length) return;
  
  let filtered = payrollRecords;

 // Apply search filter
 if (filters.search) {
 const searchTerm = filters.search.toLowerCase();
 filtered = filtered.filter(record =>
 record.employeeName.toLowerCase().includes(searchTerm) ||
 record.department.toLowerCase().includes(searchTerm) ||
 record.position.toLowerCase().includes(searchTerm) ||
 record.email.toLowerCase().includes(searchTerm)
 );
 }

 // Apply other filters
 if (filters.employeeName) {
 filtered = filtered.filter(record => record.employeeName === filters.employeeName);
 }

 if (filters.department) {
 filtered = filtered.filter(record => record.department === filters.department);
 }

 if (filters.month) {
 filtered = filtered.filter(record => record.month === filters.month);
 }

 if (filters.year) {
 filtered = filtered.filter(record => record.year === filters.year);
 }

 if (filters.status) {
 filtered = filtered.filter(record => record.status === filters.status);
 }

 setFilteredRecords(filtered);
 }, [payrollRecords, filters]);

 const handleExport = async (format: 'excel' | 'pdf') => {
 setIsExporting(true);
 
 try {
 if (format === 'excel') {
 exportPayrollToExcel(filteredRecords, `payroll_records_${new Date().toISOString().split('T')[0]}`);
 } else {
 const payrollSummary = generatePayrollSummary(filteredRecords);
 exportPayrollToPDF(filteredRecords, payrollSummary, `payroll_report_${new Date().toISOString().split('T')[0]}`);
 }
 } catch (error) {
 console.error('Export failed:', error);
 alert('Export failed. Please try again.');
 } finally {
 setIsExporting(false);
 }
 };

 const departments = getDepartments(payrollRecords);
 const months = getMonths(payrollRecords);
 const years = getYears(payrollRecords);

 const formatCurrency = (amount: number) => {
 return new Intl.NumberFormat('en-US', {
 style: 'currency',
 currency: 'USD',
 minimumFractionDigits: 0,
 maximumFractionDigits: 0
 }).format(amount);
 };

 // Check if user has access to payroll
 if (!user || !hasPermission('view_payroll')) {
 return (
 <div className="p-6">
 <div className="text-center py-12">
 <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500 mb-4" />
 <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
 <p className="text-gray-500">
 You don't have permission to access payroll information.
 </p>
 </div>
 </div>
 );
 }

 return (
 <div className="p-6 space-y-6">
 {/* Header */}
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-3xl font-bold text-gray-900">Payroll Management</h2>
 <p className="text-gray-600">Manage employee salaries, deductions, and payroll processing</p>
 </div>
 <div className="flex items-center space-x-3">
 <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
 HR & Finance Access
 </div>
 <button
 onClick={() => {
 const mockData = generateMockPayrollData();
 setPayrollRecords(mockData);
 setFilteredRecords(mockData);
 setSummary(getPayrollSummary(mockData));
 }}
 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
 >
 Refresh Data
 </button>
 </div>
 </div>

 {/* Statistics Cards */}
 {summary && (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-gray-600">Total Employees</p>
 <p className="text-2xl font-bold text-gray-900">{summary.totalEmployees}</p>
 </div>
 <UserGroupIcon className="h-8 w-8 text-blue-500" />
 </div>
 </div>

 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-gray-600">Total Net Salary</p>
 <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalNetSalary)}</p>
 </div>
 <BanknotesIcon className="h-8 w-8 text-green-500" />
 </div>
 </div>

 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-gray-600">Average Salary</p>
 <p className="text-2xl font-bold text-blue-600">{formatCurrency(summary.averageSalary)}</p>
 </div>
 <ChartBarIcon className="h-8 w-8 text-blue-500" />
 </div>
 </div>

 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-gray-600">Total Deductions</p>
 <p className="text-2xl font-bold text-red-600">{formatCurrency(summary.totalDeductions)}</p>
 </div>
 <ArrowTrendingDownIcon className="h-8 w-8 text-red-500" />
 </div>
 </div>
 </div>
 )}

 {/* Additional Stats */}
 {summary && (
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-gray-600">Total Base Salary</p>
 <p className="text-2xl font-bold text-indigo-600">{formatCurrency(summary.totalBaseSalary)}</p>
 </div>
 <CurrencyDollarIcon className="h-8 w-8 text-indigo-500" />
 </div>
 </div>

 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-gray-600">Total Incentives</p>
 <p className="text-2xl font-bold text-purple-600">{formatCurrency(summary.totalIncentives)}</p>
 </div>
 <ArrowTrendingUpIcon className="h-8 w-8 text-purple-500" />
 </div>
 </div>

 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-gray-600">Total Bonus</p>
 <p className="text-2xl font-bold text-yellow-600">{formatCurrency(summary.totalBonus)}</p>
 </div>
 <CheckCircleIcon className="h-8 w-8 text-yellow-500" />
 </div>
 </div>
 </div>
 )}

 {/* Filters */}
 <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
 <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Payroll Records</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Employee</label>
 <input
 type="text"
 placeholder="Search by name..."
 value={filters.search}
 onChange={(e) => setFilters({ ...filters, search: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
 <select
 value={filters.department}
 onChange={(e) => setFilters({ ...filters, department: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 >
 <option value="">All Departments</option>
 {departments.map(dept => (
 <option key={dept} value={dept}>{dept}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
 <select
 value={filters.month}
 onChange={(e) => setFilters({ ...filters, month: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 >
 <option value="">All Months</option>
 {months.map(month => (
 <option key={month} value={month}>{month}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
 <select
 value={filters.year}
 onChange={(e) => setFilters({ ...filters, year: parseInt(e.target.value) || 0 })}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 >
 <option value={0}>All Years</option>
 {years.map(year => (
 <option key={year} value={year}>{year}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
 <select
 value={filters.status}
 onChange={(e) => setFilters({ ...filters, status: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
 >
 <option value="">All Status</option>
 <option value="Draft">Draft</option>
 <option value="Approved">Approved</option>
 <option value="Paid">Paid</option>
 <option value="Rejected">Rejected</option>
 </select>
 </div>
 <div className="flex items-end">
 <button
 onClick={() => setFilters({
 employeeName: '',
 department: '',
 month: '',
 year: 0,
 status: '',
 search: ''
 })}
 className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
 >
 Clear Filters
 </button>
 </div>
 </div>
 </div>

 {/* Payroll Table */}
 <div>
 <PayrollTable
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
 <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 flex items-center space-x-2">
 <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" />
 <span className="text-sm text-yellow-800">
 <strong>Confidential:</strong> This data is restricted to HR and Finance personnel only
 </span>
 </div>
 </div>
 </div>
 </div>
 );
 }
