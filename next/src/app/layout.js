/* eslint-disable perfectionist/sort-imports */
"use client";
import 'src/global.css';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';
import ThemeProvider from 'src/theme';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { AuthContextProvider } from 'src/context/AuthContextProvider'; // Adjust the import path

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};