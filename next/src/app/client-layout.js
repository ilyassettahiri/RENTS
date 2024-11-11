"use client";

import 'src/global.css';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import ProgressBar from 'src/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { AuthContextProvider } from 'src/context/AuthContextProvider'; // Adjust the import path
import ThemeProvider from 'src/theme';

import { I18nProvider } from 'src/locales/i18n-provider';

import { useState, useEffect } from 'react';
import i18next from 'i18next';


export default function ClientLayout({ children, lang: initialLang  }) {

  const [lang, setLang] = useState(initialLang);

  useEffect(() => {

    i18next.changeLanguage(lang); // Set the initial language in i18next

    const handleLangChange = (newLang) => {

      setLang(newLang);
    };

    i18next.on('languageChanged', handleLangChange);

    return () => {
      i18next.off('languageChanged', handleLangChange);
    };
  }, [lang]);



  return (


        <I18nProvider lang={lang}>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeColorPresets: 'default', // 'default' | 'preset01' | 'preset02' | 'preset03' | 'preset04' | 'preset05'
              }}
            >
              <AuthContextProvider>
                <ThemeProvider>
                  <MotionLazy>


                    <ProgressBar />
                    <SettingsDrawer />
                    {children}
                  </MotionLazy>
                </ThemeProvider>
              </AuthContextProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </I18nProvider>


  );
}

ClientLayout.propTypes = {
  children: PropTypes.node,
  lang: PropTypes.string.isRequired,
};
