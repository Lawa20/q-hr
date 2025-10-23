'use client';

import React from 'react';
import { 
  ClockIcon, 
  CalendarDaysIcon, 
  UserGroupIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const stats = [
    {
      title: 'Today\'s Attendance',
      value: '89%',
      change: '+2.5%',
      icon: ClockIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending Leave Requests',
      value: '12',
      change: '-3',
      icon: CalendarDaysIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Active Employees',
      value: '156',
      change: '+5',
      icon: UserGroupIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Performance Score',
      value: '8.7/10',
      change: '+0.3',
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'John Smith submitted a leave request',
      time: '2 hours ago',
      type: 'leave',
    },
    {
      id: 2,
      action: 'Sarah Johnson checked in late',
      time: '3 hours ago',
      type: 'attendance',
    },
    {
      id: 3,
      action: 'Mike Wilson completed his performance review',
      time: '5 hours ago',
      type: 'performance',
    },
    {
      id: 4,
      action: 'Lisa Brown updated her profile',
      time: '1 day ago',
      type: 'profile',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Good morning, Admin!</h2>
        <p className="text-blue-100 text-lg">
          Here's an overview of your HR dashboard for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last week
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'leave' ? 'bg-orange-500' :
                  activity.type === 'attendance' ? 'bg-blue-500' :
                  activity.type === 'performance' ? 'bg-purple-500' :
                  'bg-green-500'
                }`} />
                <p className="text-gray-900">{activity.action}</p>
              </div>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
