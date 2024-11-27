/* eslint-disable react/prop-types */


import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/ar-sa';

import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as Provider } from '@mui/x-date-pickers/LocalizationProvider';

import { useTranslate } from './use-locales'; // Ensure the adapted `useTranslate` hook is imported

// ----------------------------------------------------------------------

export function LocalizationProvider({ children }) {
  const { currentLang } = useTranslate(); // Use the adapted `useTranslate` for React

  // Set Day.js locale based on the current language
  dayjs.locale(currentLang.adapterLocale);

  return (
    <Provider dateAdapter={AdapterDayjs} adapterLocale={currentLang.adapterLocale}>
      {children}
    </Provider>
  );
}
