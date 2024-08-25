'use client';

import { useState, useEffect, useCallback } from "react";
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
  'All categories',
  'Business',
  'Services',
  'Billiards',
  'Activities',
  'Apartments',
  'Audios',
  'Boats',
  'Boxings',
  'Bureauxs',
  'Cameras',
  'Camions',
  'Caravans',
  'Cars',
  'Chargers',
  'Clothes',
  'Divings',
  'Drones',
  'Eclairages',
  'Electricaltools',
  'Engins',
  'Footballs',
  'Furnitures',
  'Gamings',
  'Golfs',
  'Houseappliances',
  'Huntings',
  'Jewelrys',
  'Ladders',
  'Laptops',
  'Lightings',
  'Livres',
  'Magasins',
  'Maisons',
  'Mechanicaltools',
  'Mobiliers',
  'Motos',
  'Musculations',
  'Musicals',
  'Photographies',
  'Powertools',
  'Pressurewashers',
  'Printers',
  'Riads',
  'Routers',
  'Scooters',
  'Sonorisations',
  'Surfs',
  'Tablettes',
  'Taxiaeroports',
  'Tennis',
  'Tentes',
  'Terrains',
  'Transportations',
  'Velos',
  'Villas'
];

export default function DashboardWishlistView() {
  const [favoritelistings, setFavoritelistings] = useState([]);
  const [filteredlistings, setFilteredlistings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const loading = useBoolean(true);
  const [business, setBusiness] = useState([]);
  const [tab, setTab] = useState('All categories');

  const handleChangeTab = useCallback((event, newValue) => {
    setTab(newValue);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getFavorites();

        const favoritelistingsData = response.data.map(item => ({
          type: item.type,
          id: item.id,
          attributes: {
            ...item.attributes
          }
        }));

        console.log('Mapped favoritelistings data:', favoritelistingsData);

        const favoritesData = response.favorites;
        setFavorites(favoritesData);
        setFavoritelistings(favoritelistingsData);

        // Calculate the count of items in each category
        const counts = favoritelistingsData.reduce((acc, listing) => {
          const category = listing.attributes.category.toLowerCase();
          if (!acc[category]) acc[category] = 0;
          acc[category] += 1;
          return acc;
        }, {});

        // Exclude services from "All categories"
        counts['all categories'] = favoritelistingsData.filter(listing => listing.attributes.category.toLowerCase() !== 'services').length;
        setCategoryCounts(counts);
      } catch (error) {
        console.error('Failed to fetch Home:', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (tab === 'Business' || tab === 'All categories') {
      (async () => {
        try {
          const response = await CrudService.getFavoritestore();
          setBusiness(response.data);

          // Update business count
          setCategoryCounts(prevCounts => ({
            ...prevCounts,
            business: response.data.length,
            'all categories': (prevCounts['all categories'] || 0) + response.data.length,
          }));
        } catch (error) {
          console.error('Failed to fetch favorite stores:', error);
        }
      })();
    }
  }, [tab]);

  useEffect(() => {
    const filterListings = () => {
      if (tab === 'All categories') {
        setFilteredlistings(favoritelistings.filter(listing => listing.attributes.category.toLowerCase() !== 'services'));
      } else if (tab !== 'Business') {
        const filtered = favoritelistings.filter(listing => listing.attributes.category === tab.toLowerCase());
        setFilteredlistings(filtered);
      }
    };

    filterListings();
  }, [tab, favoritelistings]);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Wishlist
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
            label={`${category} (${categoryCounts[category.toLowerCase()] || 0})`}
          />
        ))}
      </Tabs>

      {(() => {
        if (tab === 'Services') {
          return (
            <ServiceList
              jobs={filteredlistings}
              loading={loading.value}
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
              loading={loading.value}
              favorites={favorites}
              onFavoriteToggle={handleFavoriteToggle}
            />
          );
        }

        return (
          <ListingList
            tours={filteredlistings}
            loading={loading.value}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            columns={3}
          />
        );
      })()}
    </>
  );

}
