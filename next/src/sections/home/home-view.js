'use client';

import { useState, useEffect, useCallback, useContext } from "react";
import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';
import { AuthContext } from 'src/context/AuthContextProvider';
import { orderBy } from 'src/utils/helper';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CrudService from "src/services/cruds-service";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';

import ServiceSearch from 'src/sections/components/services/filters/services-search';
import { EmptyContent } from 'src/components/empty-content';

import HomeHero from './home-hero';
import HomeIntroduce from './home-introduce';
import HomeToursByCity from './home-tours-by-city';
import BlogHomeLatestPosts from '../blog/travel/home-posts';
import HomeFavoriteDestinations from './home-favorite-destinations';



import { ProductSort } from './product-sort';
import { ProductSearch } from './product-search';

import { ProductFilters } from './product-filters';

import { ProductFiltersResult } from './product-filters-result';


import OurClients from '../components/listings/our-clients';
import ListingList from '../components/listings/list/listings-list';
import ListingsCarousel from './listings-carousel';

// ----------------------------------------------------------------------

const heroUrl = [
  'images/categoriescover/activities.jpg', 'images/categoriescover/apartments.jpg',
  'images/categoriescover/audios.jpg', 'images/categoriescover/boats.jpg',
  'images/categoriescover/boxings.jpg', 'images/categoriescover/bureauxs.jpg',
  'images/categoriescover/cameras.jpg', 'images/categoriescover/camions.jpg',
  'images/categoriescover/caravans.jpg', 'images/categoriescover/cars.jpg',
  'images/categoriescover/chargers.jpg', 'images/categoriescover/clothes.jpg',
  'images/categoriescover/divings.jpg', 'images/categoriescover/drones.jpg',
  'images/categoriescover/eclairages.jpg', 'images/categoriescover/electricaltools.jpg',
  'images/categoriescover/engins.jpg', 'images/categoriescover/footballs.jpg',
  'images/categoriescover/furnitures.jpg', 'images/categoriescover/gamings.jpg',
  'images/categoriescover/golfs.jpg', 'images/categoriescover/houseappliances.jpg',
  'images/categoriescover/huntings.jpg', 'images/categoriescover/jewelrys.jpg',
  'images/categoriescover/ladders.jpg', 'images/categoriescover/laptops.jpg',
  'images/categoriescover/lightings.jpg', 'images/categoriescover/livres.jpg',
  'images/categoriescover/magasins.jpg', 'images/categoriescover/maisons.jpg',
  'images/categoriescover/mechanicaltools.jpg', 'images/categoriescover/mobiliers.jpg',
  'images/categoriescover/motos.jpg', 'images/categoriescover/musculations.jpg',
  'images/categoriescover/musicals.jpg', 'images/categoriescover/photographies.jpg',
  'images/categoriescover/powertools.jpg', 'images/categoriescover/pressurewashers.jpg',
  'images/categoriescover/printers.jpg', 'images/categoriescover/riads.jpg',
  'images/categoriescover/routers.jpg', 'images/categoriescover/scooters.jpg',
  'images/categoriescover/services.jpg', 'images/categoriescover/sonorisations.jpg',
  'images/categoriescover/surfs.jpg', 'images/categoriescover/tablettes.jpg',
  'images/categoriescover/taxiaeroports.jpg', 'images/categoriescover/tennis.jpg',
  'images/categoriescover/tentes.jpg', 'images/categoriescover/terrains.jpg',
  'images/categoriescover/transportations.jpg', 'images/categoriescover/velos.jpg',
  'images/categoriescover/villas.jpg'
];

const categories = [
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

const tours = heroUrl.map((url, index) => ({
  id: index,
  heroUrl: url,
  categories: categories[index] || 'Uncategorized',
}));

export default function HomeView() {



  const { selectedCategory, handleCategoryClick } = useContext(AuthContext);

  const [billiards, setBilliards] = useState([]);
  const [boxings, setBoxings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ourclients, setOurclients] = useState([]);
  const [recentarticles, setRecentarticles] = useState([]);
  const [initialListings, setInitialListings] = useState([]); // Store the initial listings fetched

  const loading = useBoolean(true);


  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getHome();

        const billiardsData = response.data.filter(item => item.type === 'billiards');
        const boxingsData = response.data.filter(item => item.type === 'listings');
        const favoritesData = response.favorites;
        const ourclientsData = response.ourclients;
        const recentarticlesData = response.recentarticles;

        console.log('Mapped recentarticlesData :', recentarticlesData);
        console.log('Our clients:', ourclientsData);

        setBilliards(billiardsData);
        setInitialListings(billiardsData);

        setBoxings(boxingsData);
        setFavorites(favoritesData);
        setRecentarticles(recentarticlesData);
        setOurclients(ourclientsData);
      } catch (error) {
        console.error('Failed to fetch Home:', error);
      }
    })();
  }, []);

  const fetchListings = useCallback(async (searchs) => {
    console.log('Search parameters:', searchs); // Log search parameters

    try {
      const response = await CrudService.getSearchListings(searchs);
      console.log('Listings fetched:', response.data);

      const listingsData = response.data.map(item => ({
        type: item.type,
        id: item.id,
        attributes: {
          ...item.attributes
        }
      }));
      console.log('Parsed listings data:', listingsData); // Log parsed listings data

      const favoritesData = response.favorites;

      setFavorites(favoritesData);
      setInitialListings(listingsData); // Store the fetched listings


    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
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




  useEffect(() => {
    if (selectedCategory) {
      console.log("Selected category in HomeView:", selectedCategory);
      fetchListings({ searchCategories: selectedCategory });
    }
  }, [selectedCategory, fetchListings]);









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


  const canReset =
    filters.state.gender.length > 0 ||

    filters.state.rating !== '' ||
    filters.state.category !== 'all' ||
    filters.state.priceRange[0] !== 0 ||
    filters.state.priceRange[1] !== 200;

  const notFound = !initialListings.length && canReset;

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  const productsEmpty = !initialListings.length;

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >


      <Stack direction="row" spacing={1} flexShrink={0}>
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

        <ProductSort sort={sortBy} onSort={handleSortBy} sortOptions={PRODUCT_SORT_OPTIONS} />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <ProductFiltersResult filters={filters} totalResults={initialListings.length} />
  );

  const renderNotFound = <EmptyContent filled sx={{ py: 10 }} />;










  return (
    <>

      <Box sx={{ position: 'relative' }}>
        <HomeHero tours={tours} />

        <Container
          sx={{
            mb: { md: 10 },
            left: { md: 0 },
            right: { md: 0 },
            bottom: { md: 0 },
            mx: { md: 'auto' },
            pt: { xs: 3, md: 0 },
            position: { md: 'absolute' },
          }}
        >
          <ServiceSearch
            colorr="white"
            onCategoryClick={handleCategoryClick}
            onSearch={fetchListings}
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
          marginTop: '-50px',
          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
          backgroundColor: 'white',
        }}
      >

        <Stack alignItems="flex-end" sx={{ mr: 3 }}>
          <Button
            sx={{ my: 4, }}
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:filter" width={18} />}

          >
            Filters
          </Button>
        </Stack>




          <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
            {renderFilters}

            {canReset && renderResults}
          </Stack>

          {(notFound || productsEmpty) && renderNotFound}






        <ListingList tours={initialListings} loading={loading.value} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />
        <ListingsCarousel tours={billiards} title="Billiards" />
        <ListingsCarousel tours={boxings} title="Boxings" />

      </Container>
      <OurClients brands={ourclients} />
      <BlogHomeLatestPosts posts={recentarticles.slice(2, 6)} />
    </>
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
    inputData = inputData.filter((product) => product.price >= min && product.price <= max);
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





