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

import  ProductFilters  from 'src/sections/store/product/filters/product-filters';

import { ProductFiltersResult } from 'src/sections/home/product-filters-result';
import { EmptyContent } from 'src/components/empty-content';


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
  const [viewMode, setViewMode] = useState('grid');

  const [favorites, setFavorites] = useState([]);

  const [favoritestore, setFavoritestore] = useState([]);


  const { data: storeData, isLoading: isStoreLoading, error: storeError } = useQuery({
    queryKey: ['store', url],
    queryFn: () => CrudService.getStore(url),
    onError: (error) => {
      console.error('Failed to fetch store data:', error);
    },
  });

  // Update favorites from storeData
  useEffect(() => {
    if (storeData?.favorites) {

      console.log('Store Data:', storeData); // Log storeData
      console.log('Favorites:', storeData.favorites); // Log favorites from storeData

      setFavorites(storeData.favorites);
    }
  }, [storeData]);



  useEffect(() => {
    if (storeData?.favoritestore) {

      console.log('Favoritestore:', storeData.favoritestore); // Log favoritestore from storeData

      setFavoritestore(storeData.favoritestore);
    }
  }, [storeData]);


  // Extract listings from storeData using useMemo
  const extractedListings = useMemo(() => storeData?.data?.attributes?.listings || [], [storeData]);


  // Memoize listings and other store data values
  const memoizedStoreData = useMemo(() => {
    const listings = storeData?.data?.attributes?.listings || [];
    const favoritesData = storeData?.favorites || [];

    const favoritestoreData = storeData?.favoritestore || [];

    const storeEmpty = !isStoreLoading && !listings.length;

    return {
      listings,
      favorites: favoritesData,
      favoritestore: favoritestoreData,

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





  const handleFavoriteTogglestore = useCallback((id, isFavorite) => {
    setFavoritestore(prevFavorites =>
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
          <StoreHero StoreData={storeData?.data}  favorites={favoritestore} onFavoriteToggle={handleFavoriteTogglestore}/>
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
            color="primary"
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


                <ProductFilters
                  filters={filters}
                  canReset={canReset}
                  open={mobileOpen.value}
                  onClose={mobileOpen.onFalse}
                  options={{
                    ratings: PRODUCT_RATING_OPTIONS,
                    genders: PRODUCT_GENDER_OPTIONS,
                    categories: ['all', ...PRODUCT_CATEGORY_OPTIONS],
                  }}
                />


          </Stack>

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${280}px)` },
            }}
          >


            <Stack direction="row" justifyContent="space-between" >
                <Stack spacing={2.5} sx={{ mb: 2 }}>
                      {canReset && renderResults}
                </Stack>
            </Stack>



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

              <ProductSort  sort={sortBy} onSort={handleSortBy} sortOptions={PRODUCT_SORT_OPTIONS} />

            </Stack>




            <StoreList
              loading={memoizedStoreData.storeLoading}
              viewMode={viewMode}
              products={dataFiltered}
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
