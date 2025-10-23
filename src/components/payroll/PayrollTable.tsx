'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CurrencyDollarIcon,
  UserIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { PayrollRecord } from '@/lib/mockPayrollData';
import { getSalaryBreakdown } from '@/lib/salaryCalculations';
import { formatDate } from '@/lib/dateUtils';

interface PayrollTableProps {
  records: PayrollRecord[];
  onExport: (format: 'excel' | 'pdf') => void;
  isExporting: boolean;
}

export default function PayrollTable({ records, onExport, isExporting }: PayrollTableProps) {
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);
  const [sortField, setSortField] = useState<keyof PayrollRecord>('netSalary');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const getFullMonthName = (month: string) => {
    const monthMap: Record<string, string> = {
      'Jan': 'January',
      'Feb': 'February',
      'Mar': 'March',
      'Apr': 'April',
      'May': 'May',
      'Jun': 'June',
      'Jul': 'July',
      'Aug': 'August',
      'Sep': 'September',
      'Oct': 'October',
      'Nov': 'November',
      'Dec': 'December',
      'January': 'January',
      'February': 'February',
      'March': 'March',
      'April': 'April',
      'June': 'June',
      'July': 'July',
      'August': 'August',
      'September': 'September',
      'October': 'October',
      'November': 'November',
      'December': 'December'
    };
    return monthMap[month] || month;
  };

  const handleSort = (field: keyof PayrollRecord) => {
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

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'Approved':
        return <CheckCircleIcon className="h-4 w-4 text-blue-500" />;
      case 'Draft':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      case 'Rejected':
        return <XCircleIcon className="h-4 w-4 text-red-500" />;
      default:
        return <ExclamationTriangleIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Approved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Export Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Payroll Records ({records.length})
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
                  onClick={() => handleSort('month')}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span>Period</span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort('baseSalary')}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <CurrencyDollarIcon className="h-4 w-4" />
                    <span>Base Salary</span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort('netSalary')}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <BanknotesIcon className="h-4 w-4" />
                    <span>Net Salary</span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
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
                    <div className="text-sm text-gray-900">
                      {getFullMonthName(record.month)} {record.year}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(record.baseSalary)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">
                      {formatCurrency(record.netSalary)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {record.incentives > 0 && `+${formatCurrency(record.incentives)}`}
                      {record.bonus > 0 && ` +${formatCurrency(record.bonus)}`}
                      {record.totalDeductions > 0 && ` -${formatCurrency(record.totalDeductions)}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
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
          onClick={() => setSelectedRecord(null)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          style={{ overflow: 'auto' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl my-8 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Payroll Record Details</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {getFullMonthName(selectedRecord.month)} {selectedRecord.year}
                </p>
              </div>
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
                    <label className="text-sm font-medium text-gray-500">Period</label>
                    <p className="text-sm text-gray-900">{getFullMonthName(selectedRecord.month)} {selectedRecord.year}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm text-gray-900">{selectedRecord.email}</p>
                  </div>
                </div>
              </div>

              {/* Salary Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Salary Breakdown</h4>
                {(() => {
                  const breakdown = getSalaryBreakdown(selectedRecord);
                  return (
                    <div className="space-y-4">
                      {/* Earnings */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Earnings</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Base Salary</span>
                            <span className="text-sm font-medium text-gray-900">{formatCurrency(breakdown.baseSalary)}</span>
                          </div>
                          {breakdown.incentives > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Incentives</span>
                              <span className="text-sm font-medium text-green-600">+{formatCurrency(breakdown.incentives)}</span>
                            </div>
                          )}
                          {breakdown.bonus > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Bonus</span>
                              <span className="text-sm font-medium text-green-600">+{formatCurrency(breakdown.bonus)}</span>
                            </div>
                          )}
                          {breakdown.overtimePay > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Overtime Pay</span>
                              <span className="text-sm font-medium text-green-600">+{formatCurrency(breakdown.overtimePay)}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Deductions */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Deductions</h5>
                        <div className="space-y-2">
                          {breakdown.lateDeductions > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Late Arrivals ({selectedRecord.lateArrivals}x)</span>
                              <span className="text-sm font-medium text-red-600">-{formatCurrency(breakdown.lateDeductions)}</span>
                            </div>
                          )}
                          {breakdown.earlyDeductions > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Early Departures ({selectedRecord.earlyDepartures}x)</span>
                              <span className="text-sm font-medium text-red-600">-{formatCurrency(breakdown.earlyDeductions)}</span>
                            </div>
                          )}
                          {breakdown.unpermittedDeductions > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Unpermitted Off Days ({selectedRecord.unpermittedOffDays}x)</span>
                              <span className="text-sm font-medium text-red-600">-{formatCurrency(breakdown.unpermittedDeductions)}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Social Security (8.5%)</span>
                            <span className="text-sm font-medium text-red-600">-{formatCurrency(breakdown.socialSecurityDeduction)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between">
                          <span className="text-base font-semibold text-gray-900">Net Salary</span>
                          <span className="text-base font-bold text-green-600">{formatCurrency(breakdown.netSalary)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Working Days</label>
                    <p className="text-sm text-gray-900">{selectedRecord.workingDays} days</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Present Days</label>
                    <p className="text-sm text-gray-900">{selectedRecord.presentDays} days</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Absent Days</label>
                    <p className="text-sm text-gray-900">{selectedRecord.absentDays} days</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Overtime Hours</label>
                    <p className="text-sm text-gray-900">{selectedRecord.overtimeHours} hours</p>
                  </div>
                </div>
              </div>

              {/* Status Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Status Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <p className="text-sm text-gray-900">{selectedRecord.status}</p>
                  </div>
                  {selectedRecord.approvedBy && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Approved By</label>
                      <p className="text-sm text-gray-900">{selectedRecord.approvedBy}</p>
                    </div>
                  )}
                  {selectedRecord.approvedDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Approved Date</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedRecord.approvedDate)}</p>
                    </div>
                  )}
                  {selectedRecord.paymentDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Payment Date</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedRecord.paymentDate)}</p>
                    </div>
                  )}
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
