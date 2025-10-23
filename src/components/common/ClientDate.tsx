'use client';

import React, { useState, useEffect } from 'react';

interface ClientDateProps {
  date: string | Date;
  className?: string;
}

export default function ClientDate({ date, className }: ClientDateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a consistent placeholder during SSR to prevent hydration mismatch
    return <span className={className}>--</span>;
  }

  // Format date consistently on client-side only
  const formatDateTime = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return <span className={className}>{formatDateTime(date)}</span>;
}
