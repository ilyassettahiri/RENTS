"use client";

import 'src/global.css';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import ProgressBar from 'src/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { AuthContextProvider } from 'src/context/AuthContextProvider';
import ThemeProvider from 'src/theme';
import { usePathname, useRouter } from 'next/navigation';

import { I18nProvider } from 'src/locales/i18n-provider';

import { useState, useEffect } from 'react';
import i18next from 'i18next';
import { useSettingsContext } from 'src/components/settings/context';


export default function ClientLayout({ children, lang: initialLang  }) {


  const pathname = usePathname();
  const [lang, setLang] = useState(initialLang);
  const settings = useSettingsContext(); // Access settings context



  useEffect(() => {

    const urlLang = pathname.split('/')[1];
    if (urlLang && i18next.language !== urlLang) {
      i18next.changeLanguage(urlLang);
      setLang(urlLang);


      // Update the theme direction based on URL language
      const themeDirection = urlLang === 'ar' ? 'rtl' : 'ltr';
      settings.onUpdate('themeDirection', themeDirection);


    }
  }, [pathname, settings]);


  useEffect(() => {
    const handleLangChange = (newLang) => {
      setLang(newLang);
      const themeDirection = newLang === 'ar' ? 'rtl' : 'ltr';
      settings.onUpdate('themeDirection', themeDirection); // Update theme direction using settings

    };

    i18next.on('languageChanged', handleLangChange);

    return () => {
      i18next.off('languageChanged', handleLangChange);
    };
  }, [settings]);


  return (


        <I18nProvider lang={lang}>
          <LocalizationProvider>

              <AuthContextProvider>
                <ThemeProvider>
                  <MotionLazy>


                    {/* <ProgressBar /> */}
                    <SettingsDrawer />
                    {children}
                  </MotionLazy>
                </ThemeProvider>
              </AuthContextProvider>

          </LocalizationProvider>
        </I18nProvider>


  );
}

ClientLayout.propTypes = {
  children: PropTypes.node,
  lang: PropTypes.string.isRequired,
};
