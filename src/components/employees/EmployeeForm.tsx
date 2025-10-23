'use client';

import React, { useState, useEffect } from 'react';
import { XMarkIcon, UserIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { User } from '@/types';
import { getAllEmployees } from '@/lib/employeeStore';
import { getAllDepartments } from '@/lib/departmentStore';

interface EmployeeFormProps {
  onClose: () => void;
  onSubmit: (employee: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: User;
}

export default function EmployeeForm({ onClose, onSubmit, initialData }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    position: initialData?.position || '',
    department: initialData?.department || '',
    salary: initialData?.salary?.toString() || '',
    role: initialData?.role || 'EMPLOYEE' as const,
    isActive: initialData?.isActive ?? true,
    avatar: initialData?.avatar || '',
    bloodType: initialData?.bloodType || '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [departments, setDepartments] = useState<string[]>([]);
  const [managers, setManagers] = useState<User[]>([]);
  const [supervisors, setSupervisors] = useState<User[]>([]);
  
  // File upload states
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string>('');
  const [personalFiles, setPersonalFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Load departments from store
    const allDepartments = getAllDepartments();
    setDepartments(allDepartments.map(dept => dept.name));

    // Load managers and supervisors for relationship selectors
    const allEmployees = getAllEmployees();
    setManagers(allEmployees.filter(e => e.role === 'MANAGER'));
    setSupervisors(allEmployees.filter(e => e.role === 'SUPERVISOR'));
  }, []);

  const departmentPositions: Record<string, string[]> = {
    'Engineering': [
      'Junior Software Engineer',
      'Software Engineer',
      'Senior Software Engineer',
      'Lead Engineer',
      'Tech Lead',
      'Engineering Manager',
      'Director of Engineering'
    ],
    'Marketing': [
      'Marketing Coordinator',
      'Marketing Specialist',
      'Digital Marketing Manager',
      'Content Manager',
      'Marketing Manager',
      'Director of Marketing'
    ],
    'Sales': [
      'Sales Associate',
      'Sales Representative',
      'Account Executive',
      'Sales Manager',
      'Regional Sales Manager',
      'Director of Sales'
    ],
    'HR': [
      'HR Assistant',
      'HR Specialist',
      'HR Generalist',
      'Recruiter',
      'HR Manager',
      'Director of HR'
    ],
    'Finance': [
      'Accountant',
      'Financial Analyst',
      'Senior Financial Analyst',
      'Finance Manager',
      'Controller',
      'CFO'
    ],
    'Operations': [
      'Operations Coordinator',
      'Operations Specialist',
      'Operations Manager',
      'Senior Operations Manager',
      'Director of Operations'
    ],
    'Design': [
      'Junior Designer',
      'UI/UX Designer',
      'Senior Designer',
      'Lead Designer',
      'Design Manager',
      'Creative Director'
    ],
    'Customer Support': [
      'Support Representative',
      'Support Specialist',
      'Senior Support Specialist',
      'Team Lead',
      'Support Manager',
      'Head of Support'
    ]
  };

  const availablePositions = formData.department 
    ? departmentPositions[formData.department] || []
    : [];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    if (!formData.position) {
      newErrors.position = 'Position is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const employeeData: any = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone || undefined,
      address: formData.address || undefined,
      position: formData.position || undefined,
      department: formData.department || undefined,
      salary: formData.salary ? parseFloat(formData.salary) : undefined,
      isActive: formData.isActive,
      hireDate: new Date().toISOString(),
      // relationships
      supervisorId: formData.role === 'EMPLOYEE' ? (formData as any).supervisorId : undefined,
      managerId: formData.role === 'SUPERVISOR' ? (formData as any).managerId : undefined,
      bloodType: formData.bloodType || undefined,
      emergencyContactName: formData.emergencyContactName || undefined,
      emergencyContactPhone: formData.emergencyContactPhone || undefined,
      emergencyContactRelationship: formData.emergencyContactRelationship || undefined,
      // file uploads - send preview URL or null (not File objects)
      profilePhoto: profilePhotoPreview || undefined,
      personalFiles: personalFiles && personalFiles.length > 0 ? personalFiles.map(f => f.name) : undefined
    };

    // Remove undefined values
    Object.keys(employeeData).forEach(key => {
      if (employeeData[key] === undefined || employeeData[key] === '') {
        delete employeeData[key];
      }
    });

    // Save to both database AND mock data for now
    saveEmployeeToDB(employeeData);
    onSubmit(employeeData);
  };

  // Function to save employee to database
  const saveEmployeeToDB = async (employeeData: any) => {
    try {
      console.log('💾 Saving employee to database...', employeeData);
      
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Error saving to database:', errorData);
        alert(`Error saving employee: ${errorData.error}`);
        return;
      }

      const savedEmployee = await response.json();
      console.log('✅ Employee saved to database:', savedEmployee);
      alert('Employee added successfully!');
    } catch (error) {
      console.error('❌ Error saving to database:', error);
      alert('Error saving employee to database');
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle profile photo upload
  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePhoto: 'Please select a valid image file (JPG or PNG)' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePhoto: 'File size must be less than 5MB' }));
        return;
      }
      
      setProfilePhoto(file);
      setErrors(prev => ({ ...prev, profilePhoto: '' }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle personal files upload
  const handlePersonalFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      setErrors(prev => ({ ...prev, personalFiles: 'Only PDF, JPG, PNG, and DOC files are allowed' }));
      return;
    }
    
    // Validate file sizes (max 10MB each)
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setErrors(prev => ({ ...prev, personalFiles: 'Each file must be less than 10MB' }));
      return;
    }
    
    setPersonalFiles(prev => [...prev, ...files]);
    setErrors(prev => ({ ...prev, personalFiles: '' }));
  };

  // Remove personal file
  const removePersonalFile = (index: number) => {
    setPersonalFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {initialData ? 'Edit Employee' : 'Add New Employee'}
              </h2>
              <p className="text-sm text-gray-500">Fill in the employee information below</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john.doe@qhr.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="+1-555-0123"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="123 Main St, City, State, ZIP"
                />
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${
                    errors.department ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && (
                  <p className="mt-1 text-sm text-red-500">{errors.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${
                    errors.position ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={!formData.department}
                >
                  <option value="">
                    {!formData.department ? 'Select Department First' : 'Select Position'}
                  </option>
                  {availablePositions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
                {errors.position && (
                  <p className="mt-1 text-sm text-red-500">{errors.position}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value="EMPLOYEE">Employee</option>
                  <option value="SUPERVISOR">Supervisor</option>
                  <option value="MANAGER">Manager</option>
                </select>
              </div>

          {/* Conditional: Supervisor selector for EMPLOYEE */}
          {formData.role === 'EMPLOYEE' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supervisor <span className="text-red-500">*</span>
              </label>
              <select
                value={(formData as any).supervisorId || ''}
                onChange={(e) => handleChange('supervisorId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${errors.supervisorId ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Supervisor</option>
                {supervisors.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName} – {s.department || '—'}
                  </option>
                ))}
              </select>
              {errors.supervisorId && (
                <p className="mt-1 text-sm text-red-500">{errors.supervisorId}</p>
              )}
            </div>
          )}

          {/* Conditional: Manager selector for SUPERVISOR */}
          {formData.role === 'SUPERVISOR' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manager <span className="text-red-500">*</span>
              </label>
              <select
                value={(formData as any).managerId || ''}
                onChange={(e) => handleChange('managerId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${errors.managerId ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Manager</option>
                {managers.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.firstName} {m.lastName} – {m.department || '—'}
                  </option>
                ))}
              </select>
              {errors.managerId && (
                <p className="mt-1 text-sm text-red-500">{errors.managerId}</p>
              )}
            </div>
          )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary (Monthly)
                </label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleChange('salary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="5000"
                  min="0"
                  step="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type
                </label>
                <select
                  value={formData.bloodType}
                  onChange={(e) => handleChange('bloodType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Active Employee
                </label>
              </div>
            </div>
          </div>

          {/* Profile Photo Upload */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h3>
            <div className="flex items-center space-x-6">
              {/* Photo Preview */}
              <div className="flex-shrink-0">
                {profilePhotoPreview ? (
                  <img
                    src={profilePhotoPreview}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Upload Button */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photo (JPG or PNG)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleProfilePhotoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.profilePhoto && (
                  <p className="mt-1 text-sm text-red-500">{errors.profilePhoto}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Maximum file size: 5MB</p>
              </div>
            </div>
          </div>

          {/* Personal Files Upload */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Documents</h3>
            <div className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Documents (CV, ID, Passport, Achievements)
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handlePersonalFilesChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                {errors.personalFiles && (
                  <p className="mt-1 text-sm text-red-500">{errors.personalFiles}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Accepted formats: PDF, JPG, PNG, DOC, DOCX. Maximum file size: 10MB each</p>
              </div>

              {/* Uploaded Files List */}
              {personalFiles.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                  <div className="space-y-2">
                    {personalFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <DocumentTextIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePersonalFile(index)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleChange('emergencyContactName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="+1-555-0123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship
                </label>
                <select
                  value={formData.emergencyContactRelationship}
                  onChange={(e) => handleChange('emergencyContactRelationship', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value="">Select Relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialData ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

