'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import Logo from '@/assets/logo/Logo';
import HomeModule from '@/modules/home/HomeModule';

export default function Home() {
  const { user, isLoading, login } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const [isAutoLogging, setIsAutoLogging] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        setShouldRender(true);
      } else {
        // Only redirect if we're not already on login page
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          router.push('/login');
        }
      }
    }
  }, [user, isLoading, router]);

  const handleQuickLogin = async (email: string, password: string) => {
    setIsAutoLogging(true);
    const success = await login(email, password);
    if (success) {
      setShouldRender(true);
    } else {
      setIsAutoLogging(false);
    }
  };

  if (isLoading || isAutoLogging) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">Q</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Q HR</h1>
          <p className="text-gray-600 mb-6">
            {isAutoLogging ? 'Logging you in...' : 'Loading your workspace...'}
          </p>
          
          {/* Quick Login Buttons */}
          {!isAutoLogging && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 mb-4">Quick Login for Testing:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleQuickLogin('admin@qhr.com', 'admin123')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Admin
                </button>
                <button
                  onClick={() => handleQuickLogin('hr@qhr.com', 'hr123')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  HR Manager
                </button>
                <button
                  onClick={() => handleQuickLogin('manager@qhr.com', 'manager123')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Manager
                </button>
                <button
                  onClick={() => handleQuickLogin('employee@qhr.com', 'employee123')}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Employee
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!shouldRender) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 animate-spin">
            <span className="text-white font-bold text-2xl">Q</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Q HR</h1>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <HomeModule />;
}