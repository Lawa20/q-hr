'use client';

import React, { useState } from 'react';
import {
  Cog6ToothIcon,
  BellIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentListIcon,
  PresentationChartLineIcon,
  UsersIcon,
  FolderIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import DocumentModule from '../documents/DocumentModule';

export default function MoreModule() {
  const [activeCategory, setActiveCategory] = useState('tools');
  const [showDocumentManagement, setShowDocumentManagement] = useState(false);

  const categories = {
    tools: {
      name: 'Tools & Utilities',
      icon: WrenchScrewdriverIcon,
      color: 'blue',
      items: [
        {
          title: 'Document Management',
          description: 'Upload, organize, and manage documents',
          icon: FolderIcon,
          status: 'available',
          action: () => setShowDocumentManagement(true)
        },
        {
          title: 'Document Generator',
          description: 'Create HR documents and reports',
          icon: DocumentTextIcon,
          status: 'available'
        },
        {
          title: 'Analytics Dashboard',
          description: 'Advanced reporting and insights',
          icon: ChartBarIcon,
          status: 'available'
        },
        {
          title: 'Team Management',
          description: 'Manage team structures and hierarchies',
          icon: UserGroupIcon,
          status: 'coming-soon'
        },
        {
          title: 'System Settings',
          description: 'Configure system preferences',
          icon: Cog6ToothIcon,
          status: 'available'
        }
      ]
    },
    reports: {
      name: 'Reports & Analytics',
      icon: PresentationChartLineIcon,
      color: 'green',
      items: [
        {
          title: 'Attendance Reports',
          description: 'Detailed attendance analytics',
          icon: ChartBarIcon,
          status: 'available'
        },
        {
          title: 'Payroll Reports',
          description: 'Salary and payment analysis',
          icon: DocumentTextIcon,
          status: 'available'
        },
        {
          title: 'Performance Reports',
          description: 'Employee performance metrics',
          icon: PresentationChartLineIcon,
          status: 'coming-soon'
        },
        {
          title: 'Custom Reports',
          description: 'Create custom report templates',
          icon: ClipboardDocumentListIcon,
          status: 'coming-soon'
        }
      ]
    },
    admin: {
      name: 'Administration',
      icon: ShieldCheckIcon,
      color: 'purple',
      items: [
        {
          title: 'User Management',
          description: 'Manage user accounts and permissions',
          icon: UsersIcon,
          status: 'available'
        },
        {
          title: 'Security Settings',
          description: 'Configure security and access controls',
          icon: ShieldCheckIcon,
          status: 'available'
        },
        {
          title: 'System Maintenance',
          description: 'System health and maintenance tools',
          icon: WrenchScrewdriverIcon,
          status: 'available'
        },
        {
          title: 'Audit Logs',
          description: 'View system activity and audit trails',
          icon: ClipboardDocumentListIcon,
          status: 'coming-soon'
        }
      ]
    },
    support: {
      name: 'Support & Help',
      icon: QuestionMarkCircleIcon,
      color: 'orange',
      items: [
        {
          title: 'Help Center',
          description: 'Access documentation and guides',
          icon: InformationCircleIcon,
          status: 'available'
        },
        {
          title: 'Contact Support',
          description: 'Get help from our support team',
          icon: BellIcon,
          status: 'available'
        },
        {
          title: 'Feature Requests',
          description: 'Suggest new features and improvements',
          icon: DocumentTextIcon,
          status: 'available'
        },
        {
          title: 'System Status',
          description: 'Check system health and uptime',
          icon: ChartBarIcon,
          status: 'available'
        }
      ]
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'coming-soon': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Features</h2>
        <p className="text-gray-600">Explore advanced tools and utilities for your HR needs</p>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`p-4 rounded-xl transition-all ${
                activeCategory === key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-3 rounded-lg ${
                  activeCategory === key
                    ? 'bg-white bg-opacity-20'
                    : getColorClasses(category.color)
                }`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <span className="font-medium text-sm">{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories[activeCategory as keyof typeof categories].items.map((item, index) => (
          <div key={item.title} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClasses(categories[activeCategory as keyof typeof categories].color)}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                {item.status.replace('-', ' ')}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            
            <button
              disabled={item.status === 'coming-soon'}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                item.status === 'available'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {item.status === 'available' ? 'Open' : 'Coming Soon'}
            </button>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <WrenchScrewdriverIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Available Tools</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-600">Active features</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ChartBarIcon className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Reports Generated</h3>
          <p className="text-3xl font-bold text-green-600">48</p>
          <p className="text-sm text-gray-600">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <UsersIcon className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">System Users</h3>
          <p className="text-3xl font-bold text-purple-600">156</p>
          <p className="text-sm text-gray-600">Active users</p>
        </div>
      </div>
    </div>
  );

  // Show Document Management if requested
  if (showDocumentManagement) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowDocumentManagement(false)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to More Features</span>
          </button>
        </div>
        <DocumentModule />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">More Features</h2>
          <p className="text-gray-600">Additional tools and utilities for your HR needs</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeCategory === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories[activeCategory as keyof typeof categories].items.map((item, index) => (
              <div key={item.title} onClick={item.action} className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${ item.status === 'available' ? 'border-gray-200 hover:border-blue-300 bg-white' : 'border-gray-100 bg-gray-50 cursor-not-allowed' }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    item.status === 'available' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <item.icon className={`h-6 w-6 ${
                      item.status === 'available' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'coming-soon'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status === 'available' ? 'Available' : 
                     item.status === 'coming-soon' ? 'Coming Soon' : 'In Development'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <WrenchScrewdriverIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Available Tools</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-600">Active features</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ChartBarIcon className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Reports Generated</h3>
          <p className="text-3xl font-bold text-green-600">48</p>
          <p className="text-sm text-gray-600">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <UsersIcon className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">System Users</h3>
          <p className="text-3xl font-bold text-purple-600">156</p>
          <p className="text-sm text-gray-600">Active users</p>
        </div>
      </div>
    </div>
  );
}
