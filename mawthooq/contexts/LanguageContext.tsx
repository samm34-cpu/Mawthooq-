'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Lang } from '@/lib/translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ar',
  setLang: () => {},
  toggle: () => {},
  isRTL: true,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang === 'ar' ? 'ar-MA' : 'fr-MA';
      document.documentElement.setAttribute('data-lang', newLang);
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === 'ar' ? 'fr' : 'ar');
  }, [lang, setLang]);

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
