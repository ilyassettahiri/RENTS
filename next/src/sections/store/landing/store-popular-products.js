/* eslint-disable import/no-named-as-default, class-methods-use-this */


import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import StoreItemBestSellers from '../product/item/store-item-best-sellers';

// ----------------------------------------------------------------------

const TABS = [
  'Marrakech',
  'Casablanca',

  'Tanger',
  'Rabat',
  'Fes',
  'Agadir',
  'Meknes',
  'Oujda',
  'Kenitra',
  'Tetouan',
  'Salé',
  'Temara',
  'Safi',
  'Mohammedia',
  'Ouarzazate',
  'Errachidia',

  'laayoune',

];

// ----------------------------------------------------------------------

export default function StorePopularProducts({
  recentListingsCasablanca,
  recentListingsMarrakech,
  recentListingsTanger,
  recentListingsRabat,
  recentListingsFes,
  recentListingsAgadir,
  recentListingsMeknes,
  recentListingsOujda,
  recentListingsKenitra,
  recentListingsTetouan,

}) {
  const [tab, setTab] = useState('Marrakech');
  const { t } = useTranslation();

  const handleChangeTab = useCallback((event, newValue) => {
    setTab(newValue);
  }, []);

  const listingsMap = {
    'Marrakech': recentListingsMarrakech,
    'Casablanca': recentListingsCasablanca,

    'Tanger': recentListingsTanger,
    'Rabat': recentListingsRabat,
    'Fes': recentListingsFes,
    'Agadir': recentListingsAgadir,
    'Meknes': recentListingsMeknes,
    'Oujda': recentListingsOujda,
    'Kenitra': recentListingsKenitra,
    'Tetouan': recentListingsTetouan,

  };

  const currentListings = listingsMap[tab] || [];

  return (
    <Box
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        {t('PopularCities')}
      </Typography>

      <Tabs
        value={tab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
        sx={{ my: 5 }}

      >
        {TABS.map((city) => (
          <Tab key={city} value={city} label={city} />
        ))}
      </Tabs>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
      >
        {currentListings.map((listing) => (
          <StoreItemBestSellers key={listing.id} product={listing.attributes} />
        ))}
      </Box>
    </Box>
  );
}

StorePopularProducts.propTypes = {
  recentListingsCasablanca: PropTypes.array,
  recentListingsMarrakech: PropTypes.array,
  recentListingsTanger: PropTypes.array,
  recentListingsRabat: PropTypes.array,
  recentListingsFes: PropTypes.array,
  recentListingsAgadir: PropTypes.array,
  recentListingsMeknes: PropTypes.array,
  recentListingsOujda: PropTypes.array,
  recentListingsKenitra: PropTypes.array,
  recentListingsTetouan: PropTypes.array,

};
