'use client';

import React, { useState } from 'react';
import {
 UserIcon,
 EnvelopeIcon,
 PhoneIcon,
 MapPinIcon,
 BuildingOfficeIcon,
 CalendarDaysIcon,
 CurrencyDollarIcon,
 PencilIcon,
 CameraIcon
} from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/dateUtils';

export default function SelfServiceModule() {
 const [isEditing, setIsEditing] = useState(false);
 const [profile, setProfile] = useState({
 firstName: 'John',
 lastName: 'Doe',
 email: 'john.doe@company.com',
 phone: '+1 (555) 123-4567',
 address: '123 Main St, City, State 12345',
 department: 'Human Resources',
 position: 'HR Manager',
 hireDate: '2020-01-15',
 salary: 75000
 });

 const handleSave = () => {
 setIsEditing(false);
 // Here you would typically save to the backend
 };

 const handleCancel = () => {
 setIsEditing(false);
 // Reset any unsaved changes
 };

 return (
 <div className="p-6 space-y-6">
 {/* Profile Header */}
 <div className="bg-white rounded-xl shadow-lg p-6">
 <div className="flex items-center justify-between mb-6">
 <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
 <div className="flex space-x-2">
 {isEditing ? (
 <>
 <button
 onClick={handleCancel}
 className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
 >
 Cancel
 </button>
 <button
 onClick={handleSave}
 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
 >
 Save Changes
 </button>
 </>
 ) : (
 <button
 onClick={() => setIsEditing(true)}
 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
 >
 <PencilIcon className="h-4 w-4 mr-2" />
 Edit Profile
 </button>
 )}
 </div>
 </div>

 <div className="flex items-start space-x-6">
 {/* Profile Picture */}
 <div className="relative">
 <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
 {profile.firstName[0]}{profile.lastName[0]}
 </div>
 {isEditing && (
 <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
 <CameraIcon className="h-4 w-4" />
 </button>
 )}
 </div>

 {/* Basic Info */}
 <div className="flex-1">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
 {isEditing ? (
 <input
 type="text"
 value={profile.firstName}
 onChange={(e) => setProfile({...profile, firstName: e.target.value})}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
 />
 ) : (
 <p className="text-gray-900">{profile.firstName}</p>
 )}
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
 {isEditing ? (
 <input
 type="text"
 value={profile.lastName}
 onChange={(e) => setProfile({...profile, lastName: e.target.value})}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
 />
 ) : (
 <p className="text-gray-900">{profile.lastName}</p>
 )}
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Contact Information */}
 <div className="bg-white rounded-xl shadow-lg p-6">
 <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
 <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
 Email Address
 </label>
 {isEditing ? (
 <input
 type="email"
 value={profile.email}
 onChange={(e) => setProfile({...profile, email: e.target.value})}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
 />
 ) : (
 <p className="text-gray-900">{profile.email}</p>
 )}
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
 <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
 Phone Number
 </label>
 {isEditing ? (
 <input
 type="tel"
 value={profile.phone}
 onChange={(e) => setProfile({...profile, phone: e.target.value})}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
 />
 ) : (
 <p className="text-gray-900">{profile.phone}</p>
 )}
 </div>
 <div className="md:col-span-2">
 <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
 <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
 Address
 </label>
 {isEditing ? (
 <textarea
 value={profile.address}
 onChange={(e) => setProfile({...profile, address: e.target.value})}
 rows={2}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
 />
 ) : (
 <p className="text-gray-900">{profile.address}</p>
 )}
 </div>
 </div>
 </div>

 {/* Employment Information */}
 <div className="bg-white rounded-xl shadow-lg p-6">
 <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Information</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
 <BuildingOfficeIcon className="h-4 w-4 mr-2 text-gray-400" />
 Department
 </label>
 <p className="text-gray-900">{profile.department}</p>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
 <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
 Position
 </label>
 <p className="text-gray-900">{profile.position}</p>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
 <CalendarDaysIcon className="h-4 w-4 mr-2 text-gray-400" />
 Hire Date
 </label>
 <p className="text-gray-900">{formatDate(profile.hireDate)}</p>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
 <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
 Salary
 </label>
 <p className="text-gray-900">${profile.salary.toLocaleString()}</p>
 </div>
 </div>
 </div>

 {/* Quick Actions */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-white rounded-xl shadow-lg p-6 text-center">
 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
 <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
 </div>
 <h3 className="font-semibold text-gray-900 mb-2">Request Leave</h3>
 <p className="text-sm text-gray-600 mb-4">Submit time off requests</p>
 <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
 Submit Request
 </button>
 </div>

 <div className="bg-white rounded-xl shadow-lg p-6 text-center">
 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
 <UserIcon className="h-6 w-6 text-green-600" />
 </div>
 <h3 className="font-semibold text-gray-900 mb-2">Update Profile</h3>
 <p className="text-sm text-gray-600 mb-4">Manage your personal details</p>
 <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
 Edit Profile
 </button>
 </div>

 <div className="bg-white rounded-xl shadow-lg p-6 text-center">
 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
 <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
 </div>
 <h3 className="font-semibold text-gray-900 mb-2">View Payroll</h3>
 <p className="text-sm text-gray-600 mb-4">Check salary and benefits</p>
 <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
 View Details
 </button>
 </div>
 </div>
 </div>
 );
}
