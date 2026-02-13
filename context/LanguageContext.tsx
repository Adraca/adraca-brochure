"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/utils/translations';

// Re-export Language type for convenience in other files
export type { Language } from '@/utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string) => {
    // Check if key exists in translations
    // @ts-ignore - Dynamic access to translations object
    if (translations[key] && translations[key][language]) {
      // @ts-ignore
      return translations[key][language];
    }

    // Warn in dev mode if key is missing
    if (process.env.NODE_ENV === 'development' && !translations[key as keyof typeof translations]) {
      console.warn(`Missing translation for key: ${key}`);
    }

    return key; // Fallback to key if not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
