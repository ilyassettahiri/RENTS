'use client';

import { useState, useEffect, useCallback, useMemo  } from "react";
import PropTypes from 'prop-types';
import { useSetState } from 'src/hooks/use-set-state';
import { orderBy } from 'src/utils/helper';

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

import { ProductSort } from 'src/sections/home/product-sort';

import { ProductFilters } from 'src/sections/home/product-filters';

import { ProductFiltersResult } from 'src/sections/home/product-filters-result';
import { EmptyContent } from 'src/components/empty-content';


import EcommerceFilters from 'src/sections/store/product/filters/ecommerce-filters';
import StoreList from 'src/sections/store/product/list/store-list';
import StoreHeroSkeleton from 'src/sections/store/landing/store-hero-skeleton';

import StoreHero from './landing/store-hero';



// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'list', icon: <Iconify icon="carbon:list-boxes" /> },
  { value: 'grid', icon: <Iconify icon="carbon:grid" /> },
];



const PRODUCT_SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'featured', label: 'Featured' },

  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];



const PRODUCT_GENDER_OPTIONS = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRODUCT_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];






export default function StoreView({ params }) {
  const mobileOpen = useBoolean();
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
  const extractedListings = useMemo(() => storeData?.data?.attributes?.listings || [], [storeData]);


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



  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);









  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('newest');



  const filters = useSetState({
    gender: [],

    rating: '',
    category: 'all',

    priceRange: { start: 0, end: 0 },

  });

  // const { searchResults, searchLoading } = useSearchProducts(debouncedQuery);
  const dataFiltered = applyFilter({ inputData: extractedListings, filters: filters.state, sortBy });


  const canReset =
    filters.state.gender.length > 0 ||

    filters.state.rating !== '' ||
    filters.state.category !== 'all' ||
    filters.state.priceRange.start !== 0 || // Updated check
    filters.state.priceRange.end !== 0;   // Updated check

    const notFound = !dataFiltered.length && canReset;

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);



  const productsEmpty = !extractedListings.length;



  const renderResults = (
    <ProductFiltersResult filters={filters} totalResults={dataFiltered.length} />
  );

  const renderNotFound = <EmptyContent filled sx={{ py: 10 }} />;








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

              {/* <FormControl size="small" hiddenLabel sx={{ width: 120 }}>
                <Select value={sort} onChange={handleChangeSort}>
                  {SORT_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
            </Stack>

            <StoreList
              loading={memoizedStoreData.storeLoading}
              viewMode={viewMode}
              products={extractedListings}
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




function applyFilter({ inputData, filters, sortBy }) {
  const { gender, category, priceRange, rating } = filters;

  const min = priceRange.start;
  const max = priceRange.end;




  // Sort by
  if (sortBy === 'featured') {
    inputData = orderBy(inputData, ['totalSold'], ['desc']);
  }

  if (sortBy === 'newest') {
    inputData = orderBy(inputData, [(item) => new Date(item.attributes.created_at)], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    inputData = orderBy(inputData, [(item) => Number(item.attributes.price)], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    inputData = orderBy(inputData, [(item) => Number(item.attributes.price)], ['asc']);
  }
  // filters
  if (gender.length) {
    inputData = inputData.filter((product) => product.gender.some((i) => gender.includes(i)));
  }

  if (category !== 'all') {
    inputData = inputData.filter((product) => product.category === category);
  }


  // Apply price filter based on user input only
  if (min !== 0 || max !== 0) {
    inputData = inputData.filter((product) => {
      const price = Number(product.attributes.price);
      // Filter based on the existence of min and/or max
      return (min === 0 || price >= min) && (max === 0 || price <= max);
    });
  }


  if (rating) {
    inputData = inputData.filter((product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRatings > convertRating(rating);
    });
  }



  return inputData;
}
