'use client';

import { useState, useEffect, useCallback } from "react";
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CrudService from "src/services/cruds-service";


import Typography from '@mui/material/Typography';

import ListingList from '../components/listings/list/listings-list';


import { useBoolean } from 'src/hooks/use-boolean';
// ----------------------------------------------------------------------

export default function DashboardWishlistView() {

  const [favoritelistings, setFavoritelistings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const loading = useBoolean(true);


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

      <ListingList
        tours={favoritelistings}
        loading={loading.value}
        favorites={favorites}
        onFavoriteToggle={handleFavoriteToggle}
      />

    </>
  );
}
