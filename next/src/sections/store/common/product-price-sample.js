/* eslint-disable import/no-named-as-default, class-methods-use-this */


import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------



const conversionRates = {
  MAD: 1,
  USD: 0.1,
  EUR: 0.1,
};

const languageCurrencyMap = {
  en: 'USD',
  fr: 'EUR',
  ar: 'MAD',
};




export default function ProductPriceSample({ price, priceSale = 0, fromCurrency = 'MAD', sx, ...other }) {

  const { i18n } = useTranslation();
  const { t } = useTranslation();


  const toCurrency = languageCurrencyMap[i18n.language] || 'MAD';



  const convertCurrency = (amount, from, to) => {
    if (from === to) return amount; // No conversion needed
    return amount * (conversionRates[to] / conversionRates[from]);
  };

  const convertedPrice = convertCurrency(price, fromCurrency, toCurrency);


  return (
    <Stack  sx={{ typography: 'subtitle2', ...sx }} {...other}>
      {`${fCurrency(convertedPrice)}`}


    </Stack>
  );
}

ProductPriceSample.propTypes = {
  price: PropTypes.number,
  per: PropTypes.string.isRequired,

  fromCurrency: PropTypes.string.isRequired,

  priceSale: PropTypes.number,
  sx: PropTypes.object,
};
