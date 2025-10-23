'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
 ChartBarIcon,
 DocumentArrowDownIcon,
 CalendarIcon,
 UserGroupIcon,
 CurrencyDollarIcon,
 ClockIcon
} from '@heroicons/react/24/outline';
import { mockEmployees, mockAttendanceRecords, mockPayrollRecords } from '@/lib/mockData';

export default function ReportsPage() {
 const { user, isLoading } = useAuth();
 const router = useRouter();
 const [selectedReport, setSelectedReport] = useState('attendance');
 const [dateRange, setDateRange] = useState('30');

 useEffect(() => {
 if (!isLoading && !user) {
 router.push('/login');
 }
 }, [user, isLoading, router]);

 if (isLoading) {
 return (
 <div className="min-h-screen flex items-center justify-center">
 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
 </div>
 );
 }

 if (!user) {
 return null;
 }

 const reportTypes = [
 {
 id: 'attendance',
 name: 'Attendance Report',
 description: 'Employee attendance and working hours',
 icon: ClockIcon,
 color: 'blue'
 },
 {
 id: 'payroll',
 name: 'Payroll Report',
 description: 'Salary and payment information',
 icon: CurrencyDollarIcon,
 color: 'green'
 },
 {
 id: 'employee',
 name: 'Employee Report',
 description: 'Employee information and statistics',
 icon: UserGroupIcon,
 color: 'purple'
 },
 {
 id: 'performance',
 name: 'Performance Report',
 description: 'Employee performance metrics',
 icon: ChartBarIcon,
 color: 'yellow'
 }
 ];

 const getColorClasses = (color: string) => {
 switch (color) {
 case 'blue': return 'bg-blue-100 text-blue-600';
 case 'green': return 'bg-green-100 text-green-600';
 case 'purple': return 'bg-purple-100 text-purple-600';
 case 'yellow': return 'bg-yellow-100 text-yellow-600';
 default: return 'bg-gray-100 text-gray-600';
 }
 };

 const generateAttendanceReport = () => {
 const totalDays = mockAttendanceRecords.length;
 const presentDays = mockAttendanceRecords.filter(att => att.status === 'PRESENT').length;
 const lateDays = mockAttendanceRecords.filter(att => att.status === 'LATE').length;
 const absentDays = mockAttendanceRecords.filter(att => att.status === 'ABSENT').length;
 const totalHours = mockAttendanceRecords.reduce((sum, att) => sum + (att.totalHours || 0), 0);
 const averageHours = totalHours / Math.max(totalDays, 1);

 return {
 totalDays,
 presentDays,
 lateDays,
 absentDays,
 totalHours,
 averageHours,
 attendanceRate: (presentDays / Math.max(totalDays, 1)) * 100
 };
 };

 const generatePayrollReport = () => {
 const totalPayroll = mockPayrollRecords.reduce((sum, payroll) => sum + payroll.netSalary, 0);
 const averageSalary = totalPayroll / Math.max(mockPayrollRecords.length, 1);
 const totalOvertime = mockPayrollRecords.reduce((sum, payroll) => sum + payroll.overtimePay, 0);
 const totalBonuses = mockPayrollRecords.reduce((sum, payroll) => sum + payroll.bonuses, 0);
 const totalDeductions = mockPayrollRecords.reduce((sum, payroll) => sum + payroll.deductions, 0);

 return {
 totalPayroll,
 averageSalary,
 totalOvertime,
 totalBonuses,
 totalDeductions,
 recordCount: mockPayrollRecords.length
 };
 };

 const generateEmployeeReport = () => {
 const totalEmployees = mockEmployees.length;
 const activeEmployees = mockEmployees.filter(u => u.isActive).length;
 const departments = Array.from(new Set(mockEmployees.map(u => u.department).filter(Boolean)));
 const averageSalary = mockEmployees.reduce((sum, u) => sum + (u.salary || 0), 0) / Math.max(totalEmployees, 1);

 return {
 totalEmployees,
 activeEmployees,
 inactiveEmployees: totalEmployees - activeEmployees,
 departments: departments.length,
 averageSalary
 };
 };

 const attendanceReport = generateAttendanceReport();
 const payrollReport = generatePayrollReport();
 const employeeReport = generateEmployeeReport();

 return (
 <div className="min-h-screen bg-gray-50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 {/* Header */}
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
 <p className="text-gray-600 mt-2">Generate comprehensive reports and insights</p>
 </div>

 {/* Report Type Selection */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
 {reportTypes.map((report) => (
 <button
 key={report.id} onClick={() => setSelectedReport(report.id)}
 className={`p-6 rounded-xl shadow-lg transition-all ${
 selectedReport === report.id 
 ? 'bg-blue-600 text-white' 
 : 'bg-white text-gray-900 hover:shadow-xl'
 }`}
 >
 <div className="flex items-center mb-4">
 <div className={`p-3 rounded-lg ${
 selectedReport === report.id 
 ? 'bg-white bg-opacity-20' 
 : getColorClasses(report.color)
 }`}>
 <report.icon className="h-6 w-6" />
 </div>
 </div>
 <h3 className="text-lg font-semibold mb-2">{report.name}</h3>
 <p className="text-sm opacity-75">{report.description}</p>
 </button>
 ))}
 </div>

 {/* Date Range Filter */}
 <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
 <div className="flex items-center justify-between">
 <div className="flex items-center space-x-4">
 <CalendarIcon className="h-6 w-6 text-gray-400" />
 <span className="font-medium text-gray-900">Date Range:</span>
 <select
 value={dateRange}
 onChange={(e) => setDateRange(e.target.value)}
 className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
 >
 <option value="7">Last 7 days</option>
 <option value="30">Last 30 days</option>
 <option value="90">Last 90 days</option>
 <option value="365">Last year</option>
 </select>
 </div>
 <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
 >
 <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
 Export Report
 </button>
 </div>
 </div>

 {/* Report Content */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 {/* Attendance Report */}
 {selectedReport === 'attendance' && (
 <>
 <div className="bg-white rounded-xl shadow-lg p-6">
 <h3 className="text-xl font-semibold text-gray-900 mb-6">Attendance Summary</h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
 <span className="text-gray-600">Total Days</span>
 <span className="font-semibold text-gray-900">{attendanceReport.totalDays}</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
 <span className="text-gray-600">Present Days</span>
 <span className="font-semibold text-green-600">{attendanceReport.presentDays}</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
 <span className="text-gray-600">Late Days</span>
 <span className="font-semibold text-yellow-600">{attendanceReport.lateDays}</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
 <span className="text-gray-600">Absent Days</span>
 <span className="font-semibold text-red-600">{attendanceReport.absentDays}</span>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-xl shadow-lg p-6">
 <h3 className="text-xl font-semibold text-gray-900 mb-6">Working Hours</h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
 <span className="text-gray-600">Total Hours</span>
 <span className="font-semibold text-blue-600">{attendanceReport.totalHours.toFixed(1)}h</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
 <span className="text-gray-600">Average Hours/Day</span>
 <span className="font-semibold text-purple-600">{attendanceReport.averageHours.toFixed(1)}h</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
 <span className="text-gray-600">Attendance Rate</span>
 <span className="font-semibold text-green-600">{attendanceReport.attendanceRate.toFixed(1)}%</span>
 </div>
 </div>
 </div>
 </>
 )}

 {/* Payroll Report */}
 {selectedReport === 'payroll' && (
 <>
 <div className="bg-white rounded-xl shadow-lg p-6">
 <h3 className="text-xl font-semibold text-gray-900 mb-6">Payroll Summary</h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
 <span className="text-gray-600">Total Payroll</span>
 <span className="font-semibold text-green-600">${payrollReport.totalPayroll.toLocaleString()}</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
 <span className="text-gray-600">Average Salary</span>
 <span className="font-semibold text-blue-600">${payrollReport.averageSalary.toLocaleString()}</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
 <span className="text-gray-600">Total Overtime</span>
 <span className="font-semibold text-yellow-600">${payrollReport.totalOvertime.toLocaleString()}</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
 <span className="text-gray-600">Total Bonuses</span>
 <span className="font-semibold text-purple-600">${payrollReport.totalBonuses.toLocaleString()}</span>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-xl shadow-lg p-6">
 <h3 className="text-xl font-semibold text-gray-900 mb-6">Payroll Breakdown</h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
 <span className="text-gray-600">Total Records</span>
 <span className="font-semibold text-gray-900">{payrollReport.recordCount}</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
 <span className="text-gray-600">Total Deductions</span>
 <span className="font-semibold text-red-600">${payrollReport.totalDeductions.toLocaleString()}</span>
 </div>
 </div>
 </div>
 </>
 )}

 {/* Employee Report */}
 {selectedReport === 'employee' && (
 <>
 <div className="bg-white rounded-xl shadow-lg p-6">
 <h3 className="text-xl font-semibold text-gray-900 mb-6">Employee Statistics</h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
 <span className="text-gray-600">Total Employees</span>
 <span className="font-semibold text-blue-600">{employeeReport.totalEmployees}</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
 <span className="text-gray-600">Active Employees</span>
 <span className="font-semibold text-green-600">{employeeReport.activeEmployees}</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
 <span className="text-gray-600">Inactive Employees</span>
 <span className="font-semibold text-red-600">{employeeReport.inactiveEmployees}</span>
 </div>
 <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
 <span className="text-gray-600">Departments</span>
 <span className="font-semibold text-purple-600">{employeeReport.departments}</span>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-xl shadow-lg p-6">
 <h3 className="text-xl font-semibold text-gray-900 mb-6">Salary Information</h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
 <span className="text-gray-600">Average Salary</span>
 <span className="font-semibold text-yellow-600">${employeeReport.averageSalary.toLocaleString()}</span>
 </div>
 </div>
 </div>
 </>
 )}

 {/* Performance Report */}
 {selectedReport === 'performance' && (
 <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
 <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h3>
 <div className="text-center py-12">
 <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
 <h4 className="text-lg font-semibold text-gray-900 mb-2">Performance Analytics</h4>
 <p className="text-gray-600">Performance metrics and analytics will be displayed here.</p>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 );
}
