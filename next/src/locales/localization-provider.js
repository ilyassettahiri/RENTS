/* eslint-disable perfectionist/sort-imports */

'use client';

import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/ar-sa';

import dayjs from 'dayjs';
import PropTypes from 'prop-types'; // Import PropTypes for type checking

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as Provider } from '@mui/x-date-pickers/LocalizationProvider';

import { useTranslate } from './use-locales';

// ----------------------------------------------------------------------

export function LocalizationProvider({ children }) {
  const { currentLang } = useTranslate();

  dayjs.locale(currentLang.adapterLocale);

  return (
    <Provider dateAdapter={AdapterDayjs} adapterLocale={currentLang.adapterLocale}>
      {children}
    </Provider>
  );
}

// PropTypes validation
LocalizationProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' can be any renderable content and is required
};
