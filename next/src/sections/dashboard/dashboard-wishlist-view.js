'use client';

import { useState, useEffect, useCallback } from "react";
import { useBoolean } from 'src/hooks/use-boolean';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CrudService from "src/services/cruds-service";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import Typography from '@mui/material/Typography';

import ListingList from 'src/sections/components/listings/list/listings-list';


// ----------------------------------------------------------------------
const categories = [

  'All categories',
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
  'Services',
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
  const [favorites, setFavorites] = useState([]);
  const loading = useBoolean(true);



  const [tab, setTab] = useState('All Vouchers');

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
      } catch (error) {
        console.error('Failed to fetch Home:', error);
      }
    })();
  }, []);



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
          <Tab key={category} value={category} label={category} />
        ))}
      </Tabs>

      <ListingList
        tours={favoritelistings}
        loading={loading.value}
        favorites={favorites}
        onFavoriteToggle={handleFavoriteToggle}
        columns={3}
      />

    </>
  );
}
