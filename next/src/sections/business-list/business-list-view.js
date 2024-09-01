'use client';

import { useState, useEffect, useCallback, useMemo  } from "react";
import CrudService from "src/services/cruds-service";
import { useSetState } from 'src/hooks/use-set-state';
import { orderBy } from 'src/utils/helper';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';

import { useQuery } from '@tanstack/react-query';

import ServiceSearch from 'src/sections/components/services/filters/services-search';
import Iconify from 'src/components/iconify';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { ProductSort } from 'src/sections/home/product-sort';

import { ProductFilters } from 'src/sections/home/product-filters';

import { ProductFiltersResult } from 'src/sections/home/product-filters-result';

import { EmptyContent } from 'src/components/empty-content';

import EcommerceFilters from 'src/sections/store/product/filters/ecommerce-filters';
import BusinessList from '../components/business/list/business-list';

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




export default function BusinessListView() {
  const mobileOpen = useBoolean();




  const [favorites, setFavorites] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const [searchParamsState, setSearchParamsState] = useState({});



  // Query for initial services
  const { data: initialData, isLoading: isInitialLoading, error: initialError } = useQuery({
    queryKey: ['business'],
    queryFn: () => CrudService.getBusiness(),
    onError: (error) => {
      console.error('Failed to fetch initial business:', error);
    },
  });



  // Query for search results
  const { data: searchData, isLoading: isSearchLoading, isFetching: isSearching, error: searchError } = useQuery({
    queryKey: ['business', debouncedQuery],
    queryFn: () => CrudService.getSearchBusinessListings(debouncedQuery),
    enabled: !!debouncedQuery,
    onError: (error) => {
      console.error('Failed to fetch search results:', error);
    },
  });




  useEffect(() => {
    if (initialData?.favorites) {
      setFavorites(initialData.favorites);
    }
  }, [initialData]);


  useEffect(() => {
    if (searchData?.favorites) {
      setFavorites(searchData.favorites);
    }
  }, [searchData]);





  const business = useMemo(() => searchData?.data || initialData?.data || [], [searchData, initialData]);
  const isLoading = isInitialLoading || isSearching;


  const memoizedValue = useMemo(() => ({
    business,
    favorites,
    businessLoading: isSearchLoading || isInitialLoading,
    businessError: searchError || initialError,
    businessFetching: isLoading,
    businessEmpty: !isSearchLoading && !(business.length),
  }), [ searchError, isLoading, isInitialLoading, initialError, business, favorites, isSearchLoading]);







  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);









  const [sortBy, setSortBy] = useState('newest');



  const filters = useSetState({
    gender: [],

    rating: '',
    category: 'all',

    priceRange: { start: 0, end: 0 },

  });

  // const { searchResults, searchLoading } = useSearchProducts(debouncedQuery);
  const dataFiltered = applyFilter({ inputData: business, filters: filters.state, sortBy });


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

  const handleSearch = useCallback((params) => {
    setSearchParamsState(params);
  }, []);

  const productsEmpty = !business.length;



  const renderResults = (
    <ProductFiltersResult filters={filters} totalResults={dataFiltered.length} />
  );

  const renderNotFound = <EmptyContent filled sx={{ py: 10 }} />;









  return (
    <Container
      maxWidth={false}
      sx={{
        mt: { xs: 15, md: 0 },

        paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },
      }}
    >
      <ServiceSearch
        colorr="black"
        categories={categories}

        onSearch={handleSearch}
        sx={{
          color: { md: 'common.white' },
          bgcolor: (theme) => ({
            xs: 'background.neutral',
            md: theme.palette.common.white, // Adjusted as `alpha` was not defined
          }),
        }}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"

        sx={{ pb: 4 , }}

      >
        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:filter" width={18} />}
          onClick={mobileOpen.onTrue}
          sx={{ display: { md: 'none' } }}
        >
          Filters
        </Button>

        <Stack/>

        <Stack
          direction={{
            xs: 'column-reverse',
            md: 'row',
          }}

        >



            <Stack direction="row" alignItems="center" justifyContent="space-between" >


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


        </Stack>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }}>
        <EcommerceFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />
        <Box
          sx={{
            flexGrow: 1,
            pl: { md: 8 },
            width: { md: `calc(100% - ${280}px)` },
          }}
        >
          <BusinessList businesses={business} loading={isLoading} favorites={favorites} onFavoriteToggle={handleFavoriteToggle}/>
        </Box>
      </Stack>
    </Container>
  );
}



const categories = [
  'Apartments',

  'Billiards',
  'Activities',
  'Audios',
  'Boats',
  'Boxings',
  'Bureauxs',

];




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
