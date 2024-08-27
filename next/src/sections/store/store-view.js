'use client';

import { useState, useEffect, useCallback, useMemo  } from "react";
import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useBoolean } from 'src/hooks/use-boolean';

import { useQuery } from '@tanstack/react-query';

import CrudService from 'src/services/cruds-service';

import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Iconify from 'src/components/iconify';

import EcommerceFilters from 'src/sections/store/product/filters/ecommerce-filters';
import StoreList from 'src/sections/store/product/list/store-list';

import StoreHero from './landing/store-hero';
import StoreHeroSkeleton from 'src/sections/store/landing/store-hero-skeleton';



// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'list', icon: <Iconify icon="carbon:list-boxes" /> },
  { value: 'grid', icon: <Iconify icon="carbon:grid" /> },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'popular', label: 'Popular' },
];

export default function StoreView({ params }) {
  const mobileOpen = useBoolean();
  const [sort, setSort] = useState('latest');
  const { url } = params;
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');



  const { data: storeData, isLoading: isStoreLoading, error: storeError } = useQuery({
    queryKey: ['store', url],
    queryFn: () => CrudService.getStore(url),
    onError: (error) => {
      console.error('Failed to fetch store data:', error);
    },
  });

  // Update favorites from storeData
  useEffect(() => {
    if (storeData?.data?.attributes?.favorites) {
      setFavorites(storeData.data.attributes.favorites);
    }
  }, [storeData]);

  // Extract listings from storeData using useMemo
  const listings = useMemo(() => storeData?.data?.attributes?.listings || [], [storeData]);


  // Memoize listings and other store data values
  const memoizedStoreData = useMemo(() => {
    const listings = storeData?.data?.attributes?.listings || [];
    const favoritesData = storeData?.data?.attributes?.favorites || [];
    const storeEmpty = !isStoreLoading && !listings.length;

    return {
      listings,
      favorites: favoritesData,
      storeLoading: isStoreLoading,
      storeError,
      storeFetching: false, // Assuming there's no need for fetching state
      storeEmpty,
    };
  }, [storeData, isStoreLoading, storeError]);




  const handleChangeViewMode = useCallback((event, newAlignment) => {
    if (newAlignment !== null) {
      setViewMode(newAlignment);
    }
  }, []);

  const handleChangeSort = useCallback((event) => {
    setSort(event.target.value);
  }, []);

  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);



  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
        }}
      >

        {memoizedStoreData.storeLoading ? (
          <StoreHeroSkeleton />
        ) : (
          <StoreHero StoreData={storeData?.data} />
        )}


        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            py: 6,
            mt: 5,
          }}
        >
          <Button
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:filter" width={18} />}
            onClick={mobileOpen.onTrue}
            sx={{
              display: { md: 'none' },
              mb: { xs: -3 },
            }}
          >
            Filters
          </Button>
        </Stack>

        <Stack
          direction={{
            xs: 'column-reverse',
            md: 'row',
          }}
          sx={{ mb: { xs: 8, md: 10 } }}
        >
          <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
            <EcommerceFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />
          </Stack>

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${280}px)` },
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
              <ToggleButtonGroup
                exclusive
                size="small"
                value={viewMode}
                onChange={handleChangeViewMode}
                sx={{ borderColor: 'transparent' }}
              >
                {VIEW_OPTIONS.map((option) => (
                  <ToggleButton key={option.value} value={option.value}>
                    {option.icon}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              <FormControl size="small" hiddenLabel sx={{ width: 120 }}>
                <Select value={sort} onChange={handleChangeSort}>
                  {SORT_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <StoreList
              loading={memoizedStoreData.storeLoading}
              viewMode={viewMode}
              products={listings}
              favorites={favorites} onFavoriteToggle={handleFavoriteToggle}
            />
          </Box>
        </Stack>
      </Container>
    </>
  );
}

StoreView.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
