'use client';

import { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useBoolean } from 'src/hooks/use-boolean';
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
  const [data, setData] = useState(null);
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const loading = useBoolean(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getStore(url);
        setData(response.data);

        const listingsData = response.data.attributes.listings.map(item => ({
          type: item.type,
          id: item.id,
          attributes: {
            ...item.attributes
          }
        }));

        const favoritesData = response.data.attributes.favorites;
        setFavorites(favoritesData);
        setListings(listingsData);
      } catch (error) {
        console.error('Failed to fetch Home:', error);
      }
    })();
  }, [url]);

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

  const handleChangeViewMode = useCallback((event, newAlignment) => {
    if (newAlignment !== null) {
      setViewMode(newAlignment);
    }
  }, []);

  const handleChangeSort = useCallback((event) => {
    setSort(event.target.value);
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
        {data && (
          <StoreHero
            StoreData={data}

          />
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
              loading={loading.value}
              viewMode={viewMode}
              products={listings}
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
