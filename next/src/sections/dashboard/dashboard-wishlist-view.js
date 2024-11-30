'use client';

import { useState, useEffect, useCallback, useMemo } from "react";

import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useBoolean } from 'src/hooks/use-boolean';
import Label from 'src/components/label';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CrudService from "src/services/cruds-service";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import ListingList from 'src/sections/components/listings/list/listings-list';
import ServiceList from 'src/sections/components/services/list/services-list';
import BusinessList from 'src/sections/components/business/list/business-list';

// ----------------------------------------------------------------------
const categories = [
  'Allcategories',
  'Business',
  'Services',
  'Jobs',
  'Billiard',
  'Activities',
  'Apartments',
  'Audio',
  'Boats',
  'Boxing',
  'Offices',
  'Cameras',
  'Trucks',
  'Caravans',
  'Cars',
  'Chargers',
  'Clothes',
  'Diving',
  'Drones',
  'Eclairage',
  'Electrical-Tools',
  'Engins',
  'Football',
  'Furniture',
  'Gaming',
  'Golf',
  'Home-Appliances',
  'Hunting',
  'Jewelry',
  'Ladders',
  'Laptops',
  'Lighting',
  'Books',
  'Shops',
  'Houses',
  'Mechanical-Tools',
  'Mobilier',
  'Motorcycles',
  'Gym',
  'Musical',
  'Photography',
  'Power-Tools',
  'Pressure-Washers',
  'Printers',
  'Riads',
  'Routers',
  'Scooters',
  'Sound-Systems',
  'Surf',
  'Tablets',
  'Airport-Taxis',
  'Tennis',
  'Tents',
  'Lands',
  'Transportation',
  'Bicycles',
  'Villas'
];

export default function DashboardWishlistView() {


  const [favorites, setFavorites] = useState([]);
  const [favoritestore, setFavoritestore] = useState([]);
  const { t } = useTranslation();


  const [tab, setTab] = useState('All categories');

  const handleChangeTab = useCallback((event, newValue) => {
    setTab(newValue);
  }, []);

  // Fetch favorite listings using React Query
  const { data: favoriteListingsData, isLoading: isFavoritesLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: CrudService.getFavorites,
    onError: (error) => {
      console.error('Failed to fetch favorite listings:', error);
    },
  });


  // Fetch favorite stores using React Query
  const { data: favoriteStoresData, isLoading: isStoresLoading } = useQuery({
    queryKey: ['favoriteStores'],
    queryFn: CrudService.getFavoritestore,
    onError: (error) => {
      console.error('Failed to fetch favorite stores:', error);
    },
  });


    // Set favorites from home data
    useEffect(() => {
      if (favoriteListingsData?.favorites) {
        setFavorites(favoriteListingsData.favorites);
      }
    }, [favoriteListingsData]);


      // Set favorites from home data
  useEffect(() => {
    if (favoriteStoresData?.favorites) {
      setFavoritestore(favoriteStoresData.favorites);
    }
  }, [favoriteStoresData]);

  // Memoized categories and counts
  const { favoritelistings, categoryCounts = {}, filteredlistings, business } = useMemo(() => {
    if (!favoriteListingsData || !favoriteStoresData) return {
      favoritelistings: [],
      categoryCounts: {},
      filteredlistings: [],
      business: [],
    };

    // Map favorite listings
    const favoritelistingsData = favoriteListingsData.data.map(item => ({
      type: item.type,
      id: item.id,
      attributes: {
        ...item.attributes,
      }
    }));

    // Calculate category counts
    const counts = favoritelistingsData.reduce((acc, listing) => {
      const category = listing.attributes.category.toLowerCase();
      if (!acc[category]) acc[category] = 0;
      acc[category] += 1;
      return acc;
    }, {});


    counts['all categories'] = favoritelistingsData.filter(listing =>
      listing.attributes.category.toLowerCase() !== 'services' &&
      listing.attributes.category.toLowerCase() !== 'jobs'
    ).length;

    // Add business counts
    counts.business = favoriteStoresData.data.length;

    counts.jobs = favoritelistingsData.filter(listing => listing.attributes.category.toLowerCase() === 'jobs').length;

    // Filter listings by selected tab
    let filteredListingsByTab = [];
    if (tab === 'All categories') {
      filteredListingsByTab = favoritelistingsData.filter(listing =>
        listing.attributes.category.toLowerCase() !== 'services' &&
        listing.attributes.category.toLowerCase() !== 'jobs'
      );
    } else if (tab === 'Jobs') {
      filteredListingsByTab = favoritelistingsData.filter(listing =>
        listing.attributes.category.toLowerCase() === 'jobs'
      );
    } else if (tab !== 'Business') {
      filteredListingsByTab = favoritelistingsData.filter(listing =>
        listing.attributes.category.toLowerCase() === tab.toLowerCase()
      );
    }


    return {
      favoritelistings: favoritelistingsData,
      categoryCounts: counts,
      filteredlistings: filteredListingsByTab,
      business: favoriteStoresData.data,
      jobs: favoritelistingsData.filter(listing => listing.attributes.category.toLowerCase() === 'jobs'),

    };
  }, [favoriteListingsData, favoriteStoresData, tab]);


  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);

  return (


    <>
    <Typography variant="h5" sx={{ mb: 3 }}>
      {t('Wishlist')}
    </Typography>

    <Tabs
      value={tab}
      scrollButtons="auto"
      variant="scrollable"
      allowScrollButtonsMobile
      onChange={handleChangeTab}
      sx={{ mb: 3 }}
    >
      {categories.map((category) => (
        <Tab
          key={category}
          value={category}
          label={`${t(category)} (${categoryCounts[category.toLowerCase()] || 0})`}
        />
      ))}
    </Tabs>

    {(() => {
      if (tab === 'Services') {
        return (
          <ServiceList
            jobs={filteredlistings}
            loading={isFavoritesLoading}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            columns={3}
          />
        );
      }

      if (tab === 'Business') {
        return (
          <BusinessList
            businesses={business}
            loading={isStoresLoading}
            favorites={favoritestore}
            onFavoriteToggle={handleFavoriteToggle}
          />
        );
      }

      if (tab === 'Jobs') {
        return (
          <ListingList
            tours={filteredlistings}
            loading={isFavoritesLoading}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            columns={3}
          />
        );
      }

      return (
        <ListingList
          tours={filteredlistings}
          loading={isFavoritesLoading}
          favorites={favorites}
          onFavoriteToggle={handleFavoriteToggle}
          columns={3}
        />
      );
    })()}
  </>

  );

}
