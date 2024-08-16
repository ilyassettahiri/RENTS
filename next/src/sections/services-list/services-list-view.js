'use client';

import { useState, useEffect, useCallback } from 'react';
import Container from '@mui/material/Container';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';
import { orderBy } from 'src/utils/helper';

import { useBoolean } from 'src/hooks/use-boolean';
import CrudService from 'src/services/cruds-service';
import ServiceSearch from 'src/sections/components/services/filters/services-search';
import Stack from '@mui/material/Stack';

import { EmptyContent } from 'src/components/empty-content';

import { ProductSort } from 'src/sections/home/product-sort';
import { ProductSearch } from 'src/sections/home/product-search';

import { ProductFilters } from 'src/sections/home/product-filters';

import { ProductFiltersResult } from 'src/sections/home/product-filters-result';



import ServiceList from '../components/services/list/services-list';




const PRODUCT_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
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



export default function ServicesListView() {
  const loading = useBoolean(true);
  const [favorites, setFavorites] = useState([]);
  const [services, setServices] = useState([]);
  const [initialListings, setInitialListings] = useState([]); // Store the initial listings fetched


  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getSerice();

        const favoritesData = response.favorites;


        setServices(response.data);
        setFavorites(favoritesData);

      } catch (error) {
        console.error('Failed to fetch Home:', error);
      }
    })();
  }, []);


  const fetchListings = async (searchs) => {
    try {
      const response = await CrudService.getSearchServiceListings(searchs);
      console.log('Listings fetched:', response.data);

      const favoritesData = response.favorites;


      setServices(response.data);

      setFavorites(favoritesData);

    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };


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











  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('featured');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const filters = useSetState({
    gender: [],

    rating: '',
    category: 'all',
    priceRange: [0, 200],
  });

  // const { searchResults, searchLoading } = useSearchProducts(debouncedQuery);
  const dataFiltered = applyFilter({ inputData: services, filters: filters.state, sortBy });


  const canReset =
    filters.state.gender.length > 0 ||

    filters.state.rating !== '' ||
    filters.state.category !== 'all' ||
    filters.state.priceRange[0] !== 0 ||
    filters.state.priceRange[1] !== 200;

  const notFound = !services.length && canReset;

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  const productsEmpty = !services.length;



  const renderResults = (
    <ProductFiltersResult filters={filters} totalResults={services.length} />
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
        onSearch={fetchListings}
        sx={{
          color: { md: 'common.white' },
          bgcolor: (theme) => ({
            xs: 'background.neutral',
            md: theme.palette.common.white,
          }),
        }}
      />


        <Stack direction="row" justifyContent="space-between" sx={{ my: 1, }}>
          <Stack spacing={2.5} >

              <ProductFilters
                filters={filters}
                canReset={canReset}
                open={openFilters.value}
                onOpen={openFilters.onTrue}
                onClose={openFilters.onFalse}
                options={{

                  ratings: PRODUCT_RATING_OPTIONS,
                  genders: PRODUCT_GENDER_OPTIONS,
                  categories: ['all', ...PRODUCT_CATEGORY_OPTIONS],
                }}
              />

          </Stack>

          <Stack alignItems="flex-end" spacing={2.5} >
            <ProductSort  sort={sortBy} onSort={handleSortBy} sortOptions={PRODUCT_SORT_OPTIONS} />

          </Stack>
        </Stack>



        <Stack direction="row" justifyContent="space-between" >
          <Stack spacing={2.5} sx={{ my: 3 }}>
            {canReset && renderResults}
          </Stack>


        </Stack>






          {(notFound || productsEmpty) && renderNotFound}






      <ServiceList jobs={services} loading={loading.value} favorites={favorites} onFavoriteToggle={handleFavoriteToggle}/>
    </Container>
  );
}





function applyFilter({ inputData, filters, sortBy }) {
  const { gender, category, priceRange, rating } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  // Sort by
  if (sortBy === 'featured') {
    inputData = orderBy(inputData, ['totalSold'], ['desc']);
  }

  if (sortBy === 'newest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    inputData = orderBy(inputData, ['price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    inputData = orderBy(inputData, ['price'], ['asc']);
  }

  // filters
  if (gender.length) {
    inputData = inputData.filter((product) => product.gender.some((i) => gender.includes(i)));
  }

  if (category !== 'all') {
    inputData = inputData.filter((product) => product.category === category);
  }



  if (min !== 0 || max !== 200) {
    inputData = inputData.filter((product) => product.attributes.price >= min && product.attributes.price <= max);
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



