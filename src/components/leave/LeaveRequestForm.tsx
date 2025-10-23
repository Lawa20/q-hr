'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, PaperClipIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { LeaveRequest, LeaveBalance } from '@/lib/mockLeaveData';

interface LeaveRequestFormProps {
  onSubmit: (request: Omit<LeaveRequest, 'id' | 'submittedDate' | 'status'>) => void;
  onCancel: () => void;
  leaveBalance?: LeaveBalance;
  isSubmitting?: boolean;
}

const leaveTypes = [
  { value: 'Annual', label: 'Annual Leave', color: 'bg-blue-100 text-blue-800' },
  { value: 'Sick', label: 'Sick Leave', color: 'bg-red-100 text-red-800' },
  { value: 'Personal', label: 'Personal Leave', color: 'bg-purple-100 text-purple-800' },
  { value: 'Maternity', label: 'Maternity Leave', color: 'bg-pink-100 text-pink-800' },
  { value: 'Paternity', label: 'Paternity Leave', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'Emergency', label: 'Emergency Leave', color: 'bg-orange-100 text-orange-800' },
  { value: 'Study', label: 'Study Leave', color: 'bg-green-100 text-green-800' }
];

export default function LeaveRequestForm({ onSubmit, onCancel, leaveBalance, isSubmitting = false }: LeaveRequestFormProps) {
  const [formData, setFormData] = useState({
    leaveType: 'Annual' as LeaveRequest['leaveType'],
    startDate: '',
    endDate: '',
    reason: '',
    attachments: [] as File[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateTotalDays = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.leaveType) {
      newErrors.leaveType = 'Please select a leave type';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (start < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }

      if (end < start) {
        newErrors.endDate = 'End date cannot be before start date';
      }
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
    }

    // Check leave balance
    if (leaveBalance && formData.leaveType) {
      const totalDays = calculateTotalDays(formData.startDate, formData.endDate);
      const availableDays = leaveBalance[`${formData.leaveType.toLowerCase()}Leave` as keyof LeaveBalance] as number;
      
      if (totalDays > availableDays) {
        newErrors.leaveType = `Insufficient ${formData.leaveType.toLowerCase()} leave balance. Available: ${availableDays} days`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const totalDays = calculateTotalDays(formData.startDate, formData.endDate);
    
    onSubmit({
      employeeId: 'emp-001', // Mock employee ID
      employeeName: 'Current User',
      employeeEmail: 'user@qhr.com',
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalDays,
      reason: formData.reason,
      attachments: formData.attachments.map(file => file.name)
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        attachments: Array.from(e.target.files || [])
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const totalDays = calculateTotalDays(formData.startDate, formData.endDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <CalendarDaysIcon className="h-6 w-6 mr-2 text-blue-600" />
          Request Leave
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Leave Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leave Type *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {leaveTypes.map((type) => (
              <label
                key={type.value}
                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.leaveType === type.value
                    ? 'border-blue-500 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <input
                  type="radio"
                  name="leaveType"
                  value={type.value}
                  checked={formData.leaveType === type.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, leaveType: e.target.value as LeaveRequest['leaveType'] }))}
                  className="sr-only"
                />
                <div className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 ${type.color}`}>
                  {type.label.replace(' Leave', '')}
                </div>
                <span className="text-sm font-medium text-gray-700">{type.label}</span>
                {formData.leaveType === type.value && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </label>
            ))}
          </div>
          {errors.leaveType && (
            <p className="text-red-500 text-sm mt-1">{errors.leaveType}</p>
          )}
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${
                errors.startDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date *
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${
                errors.endDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Total Days Display */}
        {totalDays > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Total Days:</span> {totalDays} day{totalDays !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason *
          </label>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
            rows={4}
            placeholder="Please provide a detailed reason for your leave request..."
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 ${
              errors.reason ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
          )}
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attachments (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="attachments"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="attachments"
              className="flex items-center justify-center cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
            >
              <PaperClipIcon className="h-5 w-5 mr-2" />
              <span>Click to attach files (PDF, DOC, Images)</span>
            </label>
          </div>

          {/* Display attached files */}
          {formData.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {formData.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
