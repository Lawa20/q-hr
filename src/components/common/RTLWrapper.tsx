'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RTLWrapperProps {
  children: React.ReactNode;
}

export default function RTLWrapper({ children }: RTLWrapperProps) {
  const { direction } = useLanguage();

  useEffect(() => {
    // Update document direction and language (client-side only)
    if (typeof window !== 'undefined') {
      // Use requestAnimationFrame to prevent rapid updates
      const updateDocument = () => {
        document.documentElement.dir = direction;
        document.documentElement.lang = direction === 'rtl' ? 'ar' : 'en';
        
        // Add RTL-specific classes
        if (direction === 'rtl') {
          document.body.classList.add('rtl');
        } else {
          document.body.classList.remove('rtl');
        }
      };
      
      // Debounce the update to prevent rapid changes
      const timeoutId = setTimeout(updateDocument, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [direction]);

  return (
    <div className={`${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
      {children}
    </div>
  );
}
