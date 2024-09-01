'use client';

import { useState, useEffect, useCallback, useContext, useMemo } from "react";
import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';
import { AuthContext } from 'src/context/AuthContextProvider';
import { orderBy } from 'src/utils/helper';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CrudService from "src/services/cruds-service";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';

import ServiceSearch from 'src/sections/components/services/filters/services-search';

import { EmptyContent } from 'src/components/empty-content';
import ListingsCarousel from 'src/sections/home/listings-carousel';

import HomeHero from './home-hero';



import BlogHomeLatestPosts from '../blog/travel/home-posts';

import { ProductSearch } from 'src/sections/home/product-search';


import { ProductSort } from 'src/sections/home/product-sort';

import { ProductFilters } from 'src/sections/home/product-filters';

import { ProductFiltersResult } from 'src/sections/home/product-filters-result';


import OurClients from '../components/listings/our-clients';
import ListingList from '../components/listings/list/listings-list';

// ----------------------------------------------------------------------
const heroUrl = [
  'images/categoriescover/apartments.jpg',

  'images/categoriescover/billiards.jpg',
  'images/categoriescover/activities.jpg',
  'images/categoriescover/audios.jpg',
  'images/categoriescover/boats.jpg',
  'images/categoriescover/boxings.jpg',
  'images/categoriescover/bureauxs.jpg',
  'images/categoriescover/cameras.jpg',
  'images/categoriescover/camions.jpg',
  'images/categoriescover/caravans.jpg',
  'images/categoriescover/cars.jpg',
  'images/categoriescover/chargers.jpg',
  'images/categoriescover/clothes.jpg',
  'images/categoriescover/divings.jpg',
  'images/categoriescover/drones.jpg',
  'images/categoriescover/eclairages.jpg',
  'images/categoriescover/electricaltools.jpg',
  'images/categoriescover/engins.jpg',
  'images/categoriescover/footballs.jpg',
  'images/categoriescover/furnitures.jpg',
  'images/categoriescover/gamings.jpg',
  'images/categoriescover/golfs.jpg',
  'images/categoriescover/houseappliances.jpg',
  'images/categoriescover/huntings.jpg',
  'images/categoriescover/jewelrys.jpg',
  'images/categoriescover/ladders.jpg',
  'images/categoriescover/laptops.jpg',
  'images/categoriescover/lightings.jpg',
  'images/categoriescover/livres.jpg',
  'images/categoriescover/magasins.jpg',
  'images/categoriescover/maisons.jpg',
  'images/categoriescover/mechanicaltools.jpg',
  'images/categoriescover/mobiliers.jpg',
  'images/categoriescover/motos.jpg',
  'images/categoriescover/musculations.jpg',
  'images/categoriescover/musicals.jpg',
  'images/categoriescover/photographies.jpg',
  'images/categoriescover/powertools.jpg',
  'images/categoriescover/pressurewashers.jpg',
  'images/categoriescover/printers.jpg',
  'images/categoriescover/riads.jpg',
  'images/categoriescover/routers.jpg',
  'images/categoriescover/scooters.jpg',
  'images/categoriescover/services.jpg',
  'images/categoriescover/sonorisations.jpg',
  'images/categoriescover/surfs.jpg',
  'images/categoriescover/tablettes.jpg',
  'images/categoriescover/taxiaeroports.jpg',
  'images/categoriescover/tennis.jpg',
  'images/categoriescover/tentes.jpg',
  'images/categoriescover/terrains.jpg',
  'images/categoriescover/transportations.jpg',
  'images/categoriescover/velos.jpg',
  'images/categoriescover/villas.jpg'
];

const categories = [
  'Apartments',

  'Billiards',
  'Activities',
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

const tours = heroUrl.map((url, index) => ({
  id: index,
  heroUrl: url,
  categories: categories[index] || 'Uncategorized',
}));

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



export default function HomeView() {



  const router = useRouter();
  const searchParams = useSearchParams();





  const [searchParamsState, setSearchParamsState] = useState({});


  const [favorites, setFavorites] = useState([]);



  const mdUp = useResponsive('up', 'md');

  const { selectedCategory, handleCategoryClick } = useContext(AuthContext);




    const { data: homeData, isLoading: isHomeLoading, error: homeError } = useQuery({
      queryKey: ['home'],
      queryFn: CrudService.getHome,
      onError: (error) => {
        console.error('Failed to fetch Home:', error);
      },
    });



  const { data: searchResultsData, isLoading: isSearchLoading, error: searchError } = useQuery({
    queryKey: ['search', searchParamsState],
    queryFn: () => CrudService.getSearchListings(searchParamsState),
    enabled: !!searchParamsState.searchKeyword || !!searchParamsState.searchCategories,
    onError: (error) => {
      console.error('Failed to fetch search results:', error);
    },
  });



  useEffect(() => {
    if (selectedCategory) {
      setSearchParamsState({ searchKeyword: '', searchCategories: selectedCategory,  searchLocation: '' });
    }
  }, [selectedCategory]);


  useEffect(() => {
    if (homeData?.favorites) {
      setFavorites(homeData.favorites);

    }
  }, [homeData]);

  useEffect(() => {
    if (searchResultsData?.favorites) {
      setFavorites(searchResultsData.favorites);

    }
  }, [searchResultsData]);

  // Combine search results or category data
  const InitialListings = useMemo(
    () =>
      searchResultsData?.data.map(item => ({
        type: item.type,
        id: item.id,
        attributes: {
          ...item.attributes,
        },
      })) || homeData?.data.filter(item => item.type === 'apartments') || [],
    [searchResultsData, homeData]
  );

  console.log('InitialListings:', InitialListings);

  const isLoading = isHomeLoading || isSearchLoading;



    const memoizedHomeData = useMemo(() => {
      const billiards = homeData?.data.filter(item => item.type === 'billiards') || [];
      const velos = homeData?.data.filter(item => item.type === 'velos') || [];
      const apartments = homeData?.data.filter(item => item.type === 'apartments') || [];

      const recentarticles = homeData?.recentarticles || [];
      const ourclients = homeData?.ourclients || [];
      const listingsEmpty = !isLoading && !InitialListings.length;

      return {

        billiards,
        velos,
        apartments,
        recentarticles,
        ourclients,
        favorites: homeData?.favorites || [],
        homeLoading: isLoading,
        homeError,
        listingsEmpty,
      };
    }, [homeData, isLoading, homeError, InitialListings]);








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
  const dataFiltered = applyFilter({ inputData: InitialListings, filters: filters.state, sortBy });


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

  const productsEmpty = !InitialListings.length;



  const renderResults = (
    <ProductFiltersResult filters={filters} totalResults={dataFiltered.length} />
  );

  const renderNotFound = <EmptyContent filled sx={{ py: 10 }} />;










  return (
    <>

      <Box sx={{ position: 'relative' }}>



            <HomeHero tours={tours} />






        <Container

          maxWidth={false}

          sx={{
            mb: { md: 10 },
            left: { md: 0 },
            right: { md: 0 },
            bottom: { md: 0 },
            mx: { md: 'auto' },
            paddingLeft: { lg: '100px' },
            paddingRight: { lg: '100px' },

            position: { md: 'absolute' },
          }}
        >




            <ServiceSearch
            colorr="white"
            onCategoryClick={handleCategoryClick}
            onSearch={handleSearch}
            categories={categories}
            sx={{
              color: { md: 'common.white' },
              bgcolor: (theme) => ({
                xs: 'background.neutral',
                md: alpha(theme.palette.common.white, 0.08),
              }),
              }}
            />





        </Container>
      </Box>

      <Container
        maxWidth={false}
        sx={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '20px',

          mt: { xs: -5, md: -7 },

          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
          backgroundColor: 'white',
        }}
      >


        <Stack direction="row" justifyContent="space-between" sx={{ py: 5,  }}>
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
          <Stack spacing={2.5} sx={{ mb: 2 }}>
            {canReset && renderResults}
          </Stack>


        </Stack>







         {(notFound || productsEmpty) && renderNotFound}




        <ListingList tours={dataFiltered} loading={isLoading} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />


        <Stack sx={{ my: 5 }} >
          {memoizedHomeData.apartments && <ListingsCarousel tours={memoizedHomeData.apartments} title="apartments" />}

        </Stack>


        <Stack sx={{ my: 5 }} >
          {memoizedHomeData.billiards && <ListingsCarousel tours={memoizedHomeData.billiards} title="Billiards" />}

        </Stack>


        <Stack sx={{ my: 5 }} >
        {memoizedHomeData.velos && <ListingsCarousel tours={memoizedHomeData.velos} title="velos" />}

        </Stack>




      </Container>
      <OurClients brands={memoizedHomeData.ourclients} />
      <BlogHomeLatestPosts posts={memoizedHomeData.recentarticles.slice(2, 6)} />
    </>
  );
}





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






