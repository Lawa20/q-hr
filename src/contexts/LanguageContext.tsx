'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, getLanguageDirection, getLanguageName } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof translations.en;
  direction: 'ltr' | 'rtl';
  availableLanguages: { code: Language; name: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('qhr-language') as Language;
      if (savedLanguage && ['en', 'ar', 'ku'].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('qhr-language', newLanguage);
    }
    // Document updates are handled by RTLWrapper to avoid conflicts
  };

  const direction = getLanguageDirection(language);
  const t = translations[language];
  
  const availableLanguages = [
    { code: 'en' as Language, name: getLanguageName('en') },
    { code: 'ar' as Language, name: getLanguageName('ar') },
    { code: 'ku' as Language, name: getLanguageName('ku') },
  ];

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      direction,
      availableLanguages,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
