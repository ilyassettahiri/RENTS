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

export default function ClientLayout({ children }) {
  return (


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


  );
}

ClientLayout.propTypes = {
  children: PropTypes.node,
};
