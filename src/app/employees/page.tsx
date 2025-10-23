'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
 UserGroupIcon, 
 MagnifyingGlassIcon,
 PlusIcon,
 EllipsisVerticalIcon,
 EyeIcon,
 PencilIcon,
 TrashIcon
} from '@heroicons/react/24/outline';
import { getAllEmployees, addEmployee, deleteEmployee } from '@/lib/employeeStore';
import EmployeeForm from '@/components/employees/EmployeeForm';
import { User } from '@/types';

export default function EmployeesPage() {
 const { user, isLoading } = useAuth();
 const router = useRouter();
 const [employees, setEmployees] = useState<User[]>([]);
 const [searchTerm, setSearchTerm] = useState('');
 const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
 const [selectedDepartment, setSelectedDepartment] = useState('All');
 const [showEmployeeForm, setShowEmployeeForm] = useState(false);
 const [editingEmployee, setEditingEmployee] = useState<User | undefined>(undefined);
 const [viewingEmployee, setViewingEmployee] = useState<User | undefined>(undefined);

 // Load employees on mount
 useEffect(() => {
   const loadEmployees = async () => {
     try {
       // First try to load from database API
       console.log('📥 Fetching employees from database...');
       const response = await fetch('/api/employees');
       
       if (response.ok) {
         const dbEmployees = await response.json();
         console.log('✅ Loaded employees from database:', dbEmployees.length);
         
         // Combine database employees with mock data for display
         const allEmployees = [...dbEmployees, ...getAllEmployees()];
         
         // Remove duplicates by email
         const uniqueEmployees = Array.from(new Map(
           allEmployees.map(emp => [emp.email, emp])
         ).values());
         
         setEmployees(uniqueEmployees);
         setFilteredUsers(uniqueEmployees);
         return;
       }
     } catch (error) {
       console.warn('⚠️ Could not load from database API, using mock data:', error);
     }
     
     // Fallback to mock data
     const allEmployees = getAllEmployees();
     setEmployees(allEmployees);
     setFilteredUsers(allEmployees);
   };
   
   loadEmployees();
 }, []);

 useEffect(() => {
 if (!isLoading && !user) {
 router.push('/login');
 }
 }, [user, isLoading, router]);

 useEffect(() => {
 let filtered = employees;

 if (searchTerm) {
 filtered = filtered.filter(user => 
 user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
 user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
 user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
 user.position?.toLowerCase().includes(searchTerm.toLowerCase())
 );
 }

 if (selectedDepartment !== 'All') {
 filtered = filtered.filter(user => user.department === selectedDepartment);
 }

 setFilteredUsers(filtered);
 }, [searchTerm, selectedDepartment, employees]);

 const handleAddEmployee = (employeeData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
 const newEmployee = addEmployee(employeeData);
 setEmployees(getAllEmployees());
 setShowEmployeeForm(false);
 setEditingEmployee(undefined);
 };

 const handleDeleteEmployee = (id: string) => {
 if (confirm('Are you sure you want to delete this employee?')) {
 deleteEmployee(id);
 setEmployees(getAllEmployees());
 }
 };

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

 const departments = ['All', ...Array.from(new Set(employees.map(user => user.department).filter(Boolean)))];

  const getStatusColor = (isActive: boolean) => {
 return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
 };

 return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
 {/* Header */}
 <div className="mb-8">
 <div className="flex justify-between items-center">
 <div>
 <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
 <p className="text-gray-600 mt-2">Manage your team members and their information</p>
 </div>
 <button 
 onClick={() => setShowEmployeeForm(true)}
 className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
 >
 <PlusIcon className="h-5 w-5 mr-2" />
 Add Employee
 </button>
 </div>
 </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6 hover-card">
 <div className="flex items-center">
 <div className="p-3 bg-blue-100 rounded-lg">
 <UserGroupIcon className="h-6 w-6 text-blue-600" />
 </div>
 <div className="ml-4">
 <p className="text-sm font-medium text-gray-600">Total Employees</p>
 <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
 </div>
 </div>
 </div>

      <div className="bg-white rounded-xl shadow-lg p-6 hover-card">
 <div className="flex items-center">
 <div className="p-3 bg-green-100 rounded-lg">
 <UserGroupIcon className="h-6 w-6 text-green-600" />
 </div>
 <div className="ml-4">
 <p className="text-sm font-medium text-gray-600">Active</p>
 <p className="text-2xl font-bold text-gray-900">
 {employees.filter(u => u.isActive).length}
 </p>
 </div>
 </div>
 </div>

      <div className="bg-white rounded-xl shadow-lg p-6 hover-card">
 <div className="flex items-center">
 <div className="p-3 bg-purple-100 rounded-lg">
 <UserGroupIcon className="h-6 w-6 text-purple-600" />
 </div>
 <div className="ml-4">
 <p className="text-sm font-medium text-gray-600">Departments</p>
 <p className="text-2xl font-bold text-gray-900">
 {departments.length - 1}
 </p>
 </div>
 </div>
 </div>

      <div className="bg-white rounded-xl shadow-lg p-6 hover-card">
 <div className="flex items-center">
 <div className="p-3 bg-yellow-100 rounded-lg">
 <UserGroupIcon className="h-6 w-6 text-yellow-600" />
 </div>
 <div className="ml-4">
 <p className="text-sm font-medium text-gray-600">New This Month</p>
 <p className="text-2xl font-bold text-gray-900">2</p>
 </div>
 </div>
 </div>
 </div>

 {/* Filters and Search */}
 <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
 <div className="flex flex-col md:flex-row gap-4">
 <div className="flex-1">
 <div className="relative">
 <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
 <input
 type="text"
 placeholder="Search employees..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
 />
 </div>
 </div>
 <div className="md:w-48">
 <select
 value={selectedDepartment}
 onChange={(e) => setSelectedDepartment(e.target.value)}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
 >
 {departments.map(dept => (
 <option key={dept} value={dept}>{dept}</option>
 ))}
 </select>
 </div>
 </div>
 </div>

        {/* Employees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
 {filteredUsers.map((employee, index) => (
        <div key={employee.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow hover-card">
 <div className="flex items-start justify-between mb-4">
 <div className="flex items-center space-x-3">
 {employee.avatar ? (
 <img
 src={employee.avatar}
 alt={`${employee.firstName} ${employee.lastName}`}
 className="h-12 w-12 rounded-full object-cover"
 />
 ) : (
 <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
 <span className="text-gray-600 font-semibold">
 {employee.firstName?.[0] || ''}{employee.lastName?.[0] || ''}
 </span>
 </div>
 )}
 <div>
 <h3 className="font-semibold text-gray-900">
 {employee.firstName || ''} {employee.lastName || ''}
 </h3>
 <p className="text-sm text-gray-600">{employee.position}</p>
 </div>
 </div>
 <div className="relative">
 <button className="p-2 hover:bg-gray-100 rounded-lg">
 <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
 </button>
 </div>
 </div>

 <div className="space-y-3">
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Position</span>
<span className="text-sm font-medium text-gray-900">{employee.position || 'N/A'}</span>
</div>
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Department</span>
<span className="text-sm font-medium text-gray-900">{employee.department}</span>
</div>
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Status</span>
<span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.isActive)}`}>
{employee.isActive ? 'Active' : 'Inactive'}
</span>
</div>
          {employee.salary && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Salary</span>
              <span className="text-sm font-medium text-gray-900">
                ${employee.salary.toLocaleString()}
              </span>
            </div>
          )}
          {employee.bloodType && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Blood Type</span>
              <span className="text-sm font-medium text-gray-900">{employee.bloodType}</span>
            </div>
          )}
 </div>

 <div className="mt-4 pt-4 border-t border-gray-200">
 <div className="flex space-x-2">
 <button 
  onClick={() => setViewingEmployee(employee)}
  className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center"
>
<EyeIcon className="h-4 w-4 mr-1" />
View
</button>
 <button 
 onClick={() => {
 setEditingEmployee(employee);
 setShowEmployeeForm(true);
 }}
 className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
 >
 <PencilIcon className="h-4 w-4 mr-1" />
 Edit
 </button>
 <button 
 onClick={() => handleDeleteEmployee(employee.id)}
 className="bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
 >
 <TrashIcon className="h-4 w-4" />
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>

 {filteredUsers.length === 0 && (
 <div className="text-center py-12">
 <UserGroupIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
 <h3 className="text-lg font-semibold text-gray-900 mb-2">No employees found</h3>
 <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
 </div>
 )}

 {/* Employee Form Modal */}
 {showEmployeeForm && (
 <EmployeeForm
 onClose={() => {
 setShowEmployeeForm(false);
 setEditingEmployee(undefined);
 }}
 onSubmit={handleAddEmployee}
 initialData={editingEmployee}
 />
 )}

 {/* View Employee Modal */}
 {viewingEmployee && (
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    {/* Header */}
    <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {viewingEmployee.avatar && (
            <img
              src={viewingEmployee.avatar}
              alt={`${viewingEmployee.firstName} ${viewingEmployee.lastName}`}
              className="h-16 w-16 rounded-full object-cover border-2 border-blue-200"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {viewingEmployee.firstName} {viewingEmployee.lastName}
            </h2>
            <p className="text-gray-600">{viewingEmployee.position || 'N/A'}</p>
          </div>
        </div>
        <button
          onClick={() => setViewingEmployee(undefined)}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">{viewingEmployee.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-gray-900">{viewingEmployee.phone || 'N/A'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Address</p>
            <p className="font-medium text-gray-900">{viewingEmployee.address || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Work Information */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-medium text-gray-900">{viewingEmployee.department || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Position</p>
            <p className="font-medium text-gray-900">{viewingEmployee.position || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Salary</p>
            <p className="font-medium text-gray-900">${viewingEmployee.salary?.toLocaleString() || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className={`font-medium ${viewingEmployee.isActive ? 'text-green-600' : 'text-red-600'}`}>
              {viewingEmployee.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
      </div>

      {/* Health Information */}
      {viewingEmployee.bloodType && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Information</h3>
          <div>
            <p className="text-sm text-gray-600">Blood Type</p>
            <p className="font-medium text-gray-900">{viewingEmployee.bloodType}</p>
          </div>
        </div>
      )}

      {/* Emergency Contact */}
      {viewingEmployee.emergencyContactName && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-900">{viewingEmployee.emergencyContactName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{viewingEmployee.emergencyContactPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Relationship</p>
              <p className="font-medium text-gray-900">{viewingEmployee.emergencyContactRelationship}</p>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex space-x-3">
      <button
        onClick={() => setViewingEmployee(undefined)}
        className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
      >
        Close
      </button>
      <button
        onClick={() => {
          setViewingEmployee(undefined);
          setEditingEmployee(viewingEmployee);
          setShowEmployeeForm(true);
        }}
        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Edit
      </button>
    </div>
  </div>
</div>
)}
 </div>
 </div>
 );
}
