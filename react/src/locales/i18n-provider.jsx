/* eslint-disable react/prop-types */


import React, { useMemo } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files with corrected paths
import enTranslation from 'locales/langs/en/common.json';
import frTranslation from 'locales/langs/fr/common.json';
import arTranslation from 'locales/langs/ar/common.json';

// Initialize i18n
i18n
  .use(LanguageDetector) // Detects language from the browser or query string
  .use(initReactI18next) // Connects i18n to React
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      ar: { translation: arTranslation },
    },
    fallbackLng: 'en', // Fallback language
    debug: true, // Enable debug mode in development
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

// Create I18nProvider component
export const I18nProvider = ({ children, lang }) => {
  useMemo(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return <>{children}</>;
};

export default I18nProvider;
