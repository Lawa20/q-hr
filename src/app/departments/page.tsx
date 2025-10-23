'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  BuildingOfficeIcon, 
  UserGroupIcon,
  ChartBarIcon,
  UsersIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { getAllEmployees } from '@/lib/employeeStore';
import { getAllDepartments, addDepartment, Department } from '@/lib/departmentStore';
import { User } from '@/types';

export default function DepartmentsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [employees, setEmployees] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const allEmployees = getAllEmployees();
    const allDepartments = getAllDepartments();
    setEmployees(allEmployees);
    setDepartments(allDepartments);
  }, []);

  const handleAddDepartment = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Department name is required';
    }
    
    // Check for duplicate department names
    if (departments.some(dept => dept.name.toLowerCase() === formData.name.trim().toLowerCase())) {
      errors.name = 'A department with this name already exists';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const newDepartment = addDepartment({
      name: formData.name.trim(),
      description: formData.description.trim()
    });
    
    setDepartments([...departments, newDepartment]);
    setFormData({ name: '', description: '' });
    setFormErrors({});
    setShowAddModal(false);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({ name: '', description: '' });
    setFormErrors({});
  };

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

  // Get department statistics from employees
  const departmentStats = departments.map(dept => {
    const deptEmployees = employees.filter(emp => emp.department === dept.name);
    const managers = deptEmployees.filter(emp => emp.role === 'MANAGER').length;
    const supervisors = deptEmployees.filter(emp => emp.role === 'SUPERVISOR').length;
    const regularEmployees = deptEmployees.filter(emp => emp.role === 'EMPLOYEE').length;
    const totalSalary = deptEmployees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    const avgSalary = deptEmployees.length > 0 ? Math.round(totalSalary / deptEmployees.length) : 0;
    
    return {
      ...dept,
      count: deptEmployees.length,
      managers,
      supervisors,
      employees: regularEmployees,
      avgSalary,
      totalSalary
    };
  }).sort((a, b) => b.count - a.count);

  const filteredEmployees = selectedDepartment
    ? employees.filter(emp => emp.department === selectedDepartment)
    : [];

  const getDepartmentColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-orange-100 text-orange-800 border-orange-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-cyan-100 text-cyan-800 border-cyan-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-yellow-100 text-yellow-800 border-yellow-200'
    ];
    return colors[index % colors.length];
  };

  const getEmployeeStats = (deptEmployees: any[]) => {
    const managers = deptEmployees.filter(e => e.position?.toLowerCase().includes('manager')).length;
    const supervisors = deptEmployees.filter(e => e.position?.toLowerCase().includes('supervisor')).length;
    const employees = deptEmployees.length - managers - supervisors;
    const avgSalary = deptEmployees.reduce((sum, e) => sum + (e.salary || 0), 0) / (deptEmployees.length || 1);
    
    return { managers, supervisors, employees, avgSalary };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
            <p className="text-gray-600 mt-2">Explore department structure and team members</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="font-medium">Add Department</span>
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover-card">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Departments</p>
                <p className="text-2xl font-bold text-gray-900">{departmentStats.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover-card">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover-card">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <UsersIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Largest Department</p>
                <p className="text-lg font-bold text-gray-900">{departmentStats[0]?.name || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover-card">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Team Size</p>
                <p className="text-2xl font-bold text-gray-900">
                  {departmentStats.length > 0 ? Math.round(employees.length / departmentStats.length) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {departmentStats.map((dept, index) => (
            <div
              key={dept.name}
              onClick={() => setSelectedDepartment(dept.name)}
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl border-2 hover-card ${
                selectedDepartment === dept.name
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${getDepartmentColor(index).split(' ')[0]}`}>
                    <BuildingOfficeIcon className={`h-6 w-6 ${getDepartmentColor(index).split(' ')[1]}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-500">{dept.count} {dept.count === 1 ? 'member' : 'members'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Managers:</span>
                  <span className="font-semibold text-purple-600">{dept.managers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Supervisors:</span>
                  <span className="font-semibold text-blue-600">{dept.supervisors}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Employees:</span>
                  <span className="font-semibold text-green-600">{dept.employees}</span>
                </div>
              </div>

              {dept.avgSalary > 0 && (
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Avg Salary:</span>
                    <span className="text-sm font-bold text-gray-900">${dept.avgSalary.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Department Employees List */}
        {selectedDepartment && (
          <div className="bg-white rounded-xl shadow-lg p-6 hover-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedDepartment} Department</h2>
                <p className="text-gray-600">{filteredEmployees.length} team {filteredEmployees.length === 1 ? 'member' : 'members'}</p>
              </div>
              <button
                onClick={() => setSelectedDepartment(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start space-x-3 mb-3">
                    {employee.avatar ? (
                      <img
                        src={employee.avatar}
                        alt={`${employee.firstName} ${employee.lastName}`}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {employee.firstName?.[0]}{employee.lastName?.[0]}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {employee.firstName} {employee.lastName}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">{employee.position}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Position:</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {employee.position || 'N/A'}
                      </span>
                    </div>
                    {employee.salary && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Salary:</span>
                        <span className="text-sm font-semibold text-gray-900">
                          ${employee.salary.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {employee.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <UserGroupIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No employees in this department yet.</p>
              </div>
            )}
          </div>
        )}

        {!selectedDepartment && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <BuildingOfficeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Department</h3>
            <p className="text-gray-600">Click on any department card above to view its team members</p>
          </div>
        )}
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Department</h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setFormErrors({ ...formErrors, name: '' });
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900 placeholder-gray-400 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Product Development"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="Brief description of this department..."
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddDepartment}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Add Department
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

