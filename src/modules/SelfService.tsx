'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  DocumentTextIcon, 
  CogIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const SelfService: React.FC = () => {
  const services = [
    {
      title: 'Personal Information',
      description: 'Update your personal details, contact information, and emergency contacts.',
      icon: UserIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Documents',
      description: 'Access and download your employment documents and certificates.',
      icon: DocumentTextIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Settings',
      description: 'Manage your account settings, preferences, and notification settings.',
      icon: CogIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Security',
      description: 'Change your password, enable two-factor authentication, and manage security settings.',
      icon: ShieldCheckIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const quickActions = [
    { title: 'Update Profile', action: 'Edit personal information' },
    { title: 'Download Payslip', action: 'Get latest payslip' },
    { title: 'Change Password', action: 'Update account security' },
    { title: 'View Documents', action: 'Access all documents' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Self-Service Portal</h2>
        <p className="text-gray-600">
          Manage your personal information and access HR services independently.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left"
            >
              <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
              <p className="text-sm text-gray-600">{action.action}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className={`${service.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Access Service →
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SelfService;
