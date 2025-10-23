'use client';

import React from 'react';
import { getOrgTree, getEmployeeCounts, debugEmployeeData, forceReinitialize, addMockDataManually } from '@/lib/employeeStore';
import { UserGroupIcon, UserIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export default function TeamsPage() {
  const tree = getOrgTree();
  const counts = getEmployeeCounts();
  
  // Debug log to verify data loading
  console.log('🏢 Teams Page - Data loaded:');
  console.log(`📊 Tree nodes: ${tree.length}`);
  console.log(`👥 Counts:`, counts);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Team Hierarchy</h1>
        <p className="text-gray-600">Manage organizational structure and reporting relationships</p>
        
        {/* Debug Info */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Team Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-700 font-medium">Managers:</span> {counts.managers}
            </div>
            <div>
              <span className="text-blue-700 font-medium">Supervisors:</span> {counts.supervisors}
            </div>
            <div>
              <span className="text-blue-700 font-medium">Employees:</span> {counts.employees}
            </div>
            <div>
              <span className="text-blue-700 font-medium">Total:</span> {counts.total}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => debugEmployeeData()}
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
            >
              Debug Data
            </button>
            <button
              onClick={() => {
                addMockDataManually();
                window.location.reload();
              }}
              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
            >
              Add Mock Data
            </button>
            <button
              onClick={() => {
                forceReinitialize();
                window.location.reload();
              }}
              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
            >
              Force Reload Data
            </button>
          </div>
        </div>
      </div>

      {tree.length === 0 ? (
        <div className="text-center py-12">
          <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No team data yet</h3>
          <p className="text-gray-500">Add managers, supervisors, and employees to build your organizational structure.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {tree.map(node => (
            <div key={node.manager.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Manager Header */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {node.manager.firstName} {node.manager.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{node.manager.position}</p>
                    <p className="text-xs text-gray-500">{node.manager.department} • Manager</p>
                  </div>
                </div>
              </div>

              {/* Supervisors and Employees */}
              <div className="p-6">
                {node.supervisors.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <BriefcaseIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p>No supervisors assigned to this manager</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {node.supervisors.map(s => (
                      <div key={s.supervisor.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        {/* Supervisor Header */}
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                              <UserGroupIcon className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {s.supervisor.firstName} {s.supervisor.lastName}
                              </h4>
                              <p className="text-sm text-gray-600">{s.supervisor.position}</p>
                              <p className="text-xs text-gray-500">{s.supervisor.department} • Supervisor</p>
                            </div>
                          </div>
                        </div>

                        {/* Employees */}
                        <div className="p-4">
                          {s.employees.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">No employees assigned to this supervisor</p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {s.employees.map(emp => (
                                <div key={emp.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    <UserIcon className="h-4 w-4 text-gray-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {emp.firstName} {emp.lastName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{emp.position}</p>
                                    <p className="text-xs text-gray-400">{emp.department}</p>
                                  </div>
                                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
                                    Employee
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


