import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'components/snackbar';

import { allLangs } from './all-langs';
import { fallbackLng, changeLangMessages as messages } from './config-locales';

// ----------------------------------------------------------------------

export function useTranslate(ns) {
  const navigate = useNavigate(); // React Router's navigate function
  const params = useParams(); // Access route parameters

  const { t, i18n } = useTranslation(ns);

  const fallback = allLangs.filter((lang) => lang.value === fallbackLng)[0];

  const currentLang = allLangs.find((lang) => lang.value === i18n.resolvedLanguage);

  const onChangeLang = useCallback(
    async (newLang) => {
      try {
        const langChangePromise = i18n.changeLanguage(newLang);

        const currentMessages = messages[newLang] || messages.en;

        toast.promise(langChangePromise, {
          loading: currentMessages.loading,
          success: () => currentMessages.success,
          error: currentMessages.error,
        });

        if (currentLang) {
          dayjs.locale(currentLang.adapterLocale);
        }

        // You can navigate or refresh as needed in React Router
        // Example: Navigate to a new path with the selected language
        navigate(`/${newLang}`);
      } catch (error) {
        console.error(error);
      }
    },
    [currentLang, i18n, navigate]
  );

  return {
    t,
    i18n,
    onChangeLang,
    currentLang: currentLang ?? fallback,
  };
}
