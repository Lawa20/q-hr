'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AttendanceChartProps {
  data: Array<{
    date: string;
    present: number;
    absent: number;
    late: number;
  }>;
}

export default function AttendanceChart({ data }: AttendanceChartProps) {
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;
    let resizeObserver: ResizeObserver | null = null;

    const checkDimensions = () => {
      if (!mounted || !containerRef.current) return false;
      
      const rect = containerRef.current.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      
      // Only proceed if we have valid dimensions
      if (width > 300 && height > 200) {
        setDimensions({ width, height });
        setIsReady(true);
        return true;
      }
      return false;
    };

    const initializeChart = () => {
      if (!mounted) return;
      
      // Multiple attempts with increasing delays
      const attempts = [100, 300, 500, 800, 1200, 2000];
      
      const tryInitialize = (attemptIndex: number) => {
        if (!mounted) return;
        
        if (checkDimensions()) {
          return; // Success!
        }
        
        if (attemptIndex < attempts.length - 1) {
          timeoutId = setTimeout(() => {
            tryInitialize(attemptIndex + 1);
          }, attempts[attemptIndex]);
        } else {
          // Final fallback - force dimensions if still not ready
          if (containerRef.current) {
            setDimensions({ width: 400, height: 256 });
            setIsReady(true);
          }
        }
      };
      
      tryInitialize(0);
    };

    // Start initialization
    initializeChart();

    // ResizeObserver with strict validation
    if (containerRef.current) {
      resizeObserver = new ResizeObserver((entries) => {
        if (!mounted) return;
        
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 300 && height > 200) {
            setDimensions({ width: Math.floor(width), height: Math.floor(height) });
            setIsReady(true);
          }
        }
      });
      
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Attendance Overview</h3>
        <p className="text-sm text-gray-600">Last 7 days attendance trends</p>
      </div>
      
      <div 
        ref={containerRef} 
        className="h-64 min-h-[200px] w-full" 
        style={{ 
          minWidth: '300px', 
          minHeight: '200px',
          width: '100%',
          height: '256px',
          display: 'block',
          position: 'relative'
        }}
      >
        {isReady && data && data.length > 0 && dimensions.width > 0 && dimensions.height > 0 ? (
          <ResponsiveContainer 
            width={dimensions.width} 
            height={dimensions.height}
            minHeight={200} 
            minWidth={300}
            debounce={300}
          >
            <LineChart 
              data={data}
              width={dimensions.width}
              height={dimensions.height}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="present" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="absent" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="late" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div 
            className="flex items-center justify-center h-full min-h-[200px]" 
            style={{ 
              minWidth: '300px', 
              minHeight: '200px',
              width: '100%',
              height: '256px',
              display: 'block',
              position: 'relative'
            }}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-500">Loading chart...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Present</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Absent</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Late</span>
        </div>
      </div>
    </motion.div>
  );
}
