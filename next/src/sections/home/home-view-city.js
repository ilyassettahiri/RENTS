'use client';

import { useState, useEffect, useCallback, useContext, useMemo } from "react";

import PropTypes from 'prop-types';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';
import { useTranslation } from 'react-i18next';

import { AuthContext } from 'src/context/AuthContextProvider';
import { orderBy } from 'src/utils/helper';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter, usePathname, useSearchParams} from 'src/routes/hooks';
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





import { ProductSearch } from 'src/sections/home/product-search';


import { ProductSort } from 'src/sections/home/product-sort';

import { ProductFilters } from 'src/sections/home/product-filters';

import { ProductFiltersResult } from 'src/sections/home/product-filters-result';

import HomeHero from './home-hero';

import BlogHomeLatestPosts from '../blog/travel/home-posts';


import ListingList from '../components/listings/list/listings-list';

// ----------------------------------------------------------------------
const heroUrl = [
  'categoriescover/apartments.jpg',
  'categoriescover/cars.jpg',
  'categoriescover/bureauxs.jpg',
  'categoriescover/activities.jpg',
  'categoriescover/engins.jpg',
  'categoriescover/terrains.jpg',
  'categoriescover/transportations.jpg',
  'categoriescover/velos.jpg',
  'categoriescover/villas.jpg',
  'categoriescover/audios.jpg',
  'categoriescover/boats.jpg',
  'categoriescover/boxings.jpg',
  'categoriescover/cameras.jpg',
  'categoriescover/camions.jpg',
  'categoriescover/caravans.jpg',
  'categoriescover/chargers.jpg',
  'categoriescover/clothes.jpg',
  'categoriescover/divings.jpg',
  'categoriescover/drones.jpg',
  'categoriescover/eclairages.jpg',
  'categoriescover/electricaltools.jpg',
  'categoriescover/footballs.jpg',
  'categoriescover/furnitures.jpg',
  'categoriescover/gamings.jpg',
  'categoriescover/golfs.jpg',
  'categoriescover/houseappliances.jpg',
  'categoriescover/huntings.jpg',
  'categoriescover/jewelrys.jpg',
  'categoriescover/ladders.jpg',
  'categoriescover/laptops.jpg',
  'categoriescover/lightings.jpg',
  'categoriescover/livres.jpg',
  'categoriescover/magasins.jpg',
  'categoriescover/maisons.jpg',
  'categoriescover/mechanicaltools.jpg',
  'categoriescover/mobiliers.jpg',
  'categoriescover/motos.jpg',
  'categoriescover/musculations.jpg',
  'categoriescover/musicals.jpg',
  'categoriescover/photographies.jpg',
  'categoriescover/powertools.jpg',
  'categoriescover/pressurewashers.jpg',
  'categoriescover/printers.jpg',
  'categoriescover/riads.jpg',
  'categoriescover/routers.jpg',
  'categoriescover/scooters.jpg',
  'categoriescover/sonorisations.jpg',
  'categoriescover/surfs.jpg',
  'categoriescover/tablettes.jpg',
  'categoriescover/taxiaeroports.jpg',
  'categoriescover/tennis.jpg',
  'categoriescover/tentes.jpg',
  'categoriescover/billiards.jpg'
];


const heroUrlicon = [
  'categoryiconcover/apartments.svg',
  'categoryiconcover/cars.svg',
  'categoryiconcover/bureauxs.svg',
  'categoryiconcover/activities.svg',
  'categoryiconcover/engins.svg',
  'categoryiconcover/terrains.svg',
  'categoryiconcover/transportations.svg',
  'categoryiconcover/velos.svg',
  'categoryiconcover/villas.svg',
  'categoryiconcover/audios.svg',
  'categoryiconcover/boats.svg',
  'categoryiconcover/boxings.svg',
  'categoryiconcover/cameras.svg',
  'categoryiconcover/camions.svg',
  'categoryiconcover/caravans.svg',
  'categoryiconcover/chargers.svg',
  'categoryiconcover/clothes.svg',
  'categoryiconcover/divings.svg',
  'categoryiconcover/drones.svg',
  'categoryiconcover/eclairages.svg',
  'categoryiconcover/electricaltools.svg',
  'categoryiconcover/footballs.svg',
  'categoryiconcover/furnitures.svg',
  'categoryiconcover/gamings.svg',
  'categoryiconcover/golfs.svg',
  'categoryiconcover/houseappliances.svg',
  'categoryiconcover/huntings.svg',
  'categoryiconcover/jewelrys.svg',
  'categoryiconcover/ladders.svg',
  'categoryiconcover/laptops.svg',
  'categoryiconcover/lightings.svg',
  'categoryiconcover/livres.svg',
  'categoryiconcover/magasins.svg',
  'categoryiconcover/maisons.svg',
  'categoryiconcover/mechanicaltools.svg',
  'categoryiconcover/mobiliers.svg',
  'categoryiconcover/motos.svg',
  'categoryiconcover/musculations.svg',
  'categoryiconcover/musicals.svg',
  'categoryiconcover/photographies.svg',
  'categoryiconcover/powertools.svg',
  'categoryiconcover/pressurewashers.svg',
  'categoryiconcover/printers.svg',
  'categoryiconcover/riads.svg',
  'categoryiconcover/routers.svg',
  'categoryiconcover/scooters.svg',
  'categoryiconcover/sonorisations.svg',
  'categoryiconcover/surfs.svg',
  'categoryiconcover/tablettes.svg',
  'categoryiconcover/taxiaeroports.svg',
  'categoryiconcover/tennis.svg',
  'categoryiconcover/tentes.svg',
  'categoryiconcover/billiards.svg'
];


const categories = [
  { value: 'apartments', label: 'Apartments' },
  { value: 'cars', label: 'Cars' },
  { value: 'offices', label: 'Offices' },
  { value: 'activities', label: 'Activities' },
  { value: 'engins', label: 'Engins' },
  { value: 'lands', label: 'Lands' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'bicycles', label: 'Bicycles' },
  { value: 'villas', label: 'Villas' },
  { value: 'audio', label: 'Audio' },
  { value: 'boats', label: 'Boats' },
  { value: 'boxing', label: 'Boxing' },
  { value: 'cameras', label: 'Cameras' },
  { value: 'trucks', label: 'Trucks' },
  { value: 'caravans', label: 'Caravans' },
  { value: 'chargers', label: 'Chargers' },
  { value: 'clothes', label: 'Clothes' },
  { value: 'diving', label: 'Diving' },
  { value: 'drones', label: 'Drones' },
  { value: 'eclairage', label: 'Eclairage' },
  { value: 'electrical-tools', label: 'Electrical Tools' },
  { value: 'football', label: 'Football' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'golf', label: 'Golf' },
  { value: 'home-appliances', label: 'Home Appliances' },
  { value: 'hunting', label: 'Hunting' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'ladders', label: 'Ladders' },
  { value: 'laptops', label: 'Laptops' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'books', label: 'Books' },
  { value: 'shops', label: 'Shops' },
  { value: 'houses', label: 'Houses' },
  { value: 'mechanical-tools', label: 'Mechanical Tools' },
  { value: 'mobilier', label: 'Mobilier' },
  { value: 'motorcycles', label: 'Motorcycles' },
  { value: 'gym', label: 'Gym' },
  { value: 'musical', label: 'Musical' },
  { value: 'photography', label: 'Photography' },
  { value: 'power-tools', label: 'Power Tools' },
  { value: 'pressure-washers', label: 'Pressure Washers' },
  { value: 'printers', label: 'Printers' },
  { value: 'riads', label: 'Riads' },
  { value: 'routers', label: 'Routers' },
  { value: 'scooters', label: 'Scooters' },
  { value: 'sound-systems', label: 'Sound Systems' },
  { value: 'surf', label: 'Surf' },
  { value: 'tablets', label: 'Tablets' },
  { value: 'airport-taxis', label: 'Airport Taxis' },
  { value: 'tennis', label: 'Tennis' },
  { value: 'tents', label: 'Tents' },
  { value: 'billiard', label: 'Billiard' }
];


const keywordCategoryMap = {


};


const tours = heroUrl.map((url, index) => ({
  id: index,
  heroUrl: url,
  iconUrl: heroUrlicon[index] || '', // Add icon URL from heroUrlicon

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



export default function HomeViewCity({ params }) {




  const searchParams = useSearchParams();
  const router = useRouter();



  const { t } = useTranslation();

  const { city } = params;

  const getsearchKeyword = searchParams.get('searchKeyword');




  const [favorites, setFavorites] = useState([]);



  const mdUp = useResponsive('up', 'md');

  const { selectedCategory, handleCategoryClick } = useContext(AuthContext);




  const { data: homeData, isLoading: isHomeLoading, error: homeError } = useQuery({
    queryKey: ['searchhome', city, getsearchKeyword],
    queryFn: () => CrudService.getSearchCity(city, getsearchKeyword),
    onError: (error) => {
      console.error('Failed to fetch Home:', error);
    },
  });






  useEffect(() => {
    if (homeData?.favorites) {
      setFavorites(homeData.favorites);

    }
  }, [homeData]);



  // Combine search results or category data
  const InitialListings = useMemo(
    () =>
      homeData?.data.map(item => ({
        type: item.type,
        id: item.id,
        attributes: {
          ...item.attributes,
        },
      })) || homeData?.data || [],
    [homeData]
  );

  console.log('InitialListings:', InitialListings);

  const isLoading = isHomeLoading ;



    const memoizedHomeData = useMemo(() => {

      const apartments = homeData?.data.filter(item => item.type === 'apartments') || [];


      const listingsEmpty = !isLoading && !InitialListings.length;

      return {


        apartments,

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



  const productsEmpty = !InitialListings.length;



  const renderResults = (
    <ProductFiltersResult filters={filters} totalResults={dataFiltered.length} />
  );

  const renderNotFound = <EmptyContent filled sx={{ py: 10 }} />;






  const handleSearch = useCallback((routeparams) => {
    const { searchLocation, searchCategories, searchKeyword } = routeparams;

    // Use "all-cities" as the default if searchLocation is empty
    const location = searchLocation || "all-cities";

    // Construct the base URL path
    let newPath = `/en/${location}`;
    if (searchCategories) {
      newPath += `/${searchCategories}`;
    }

    // Create URLSearchParams for query parameters
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchKeyword) {
      newSearchParams.set('searchKeyword', searchKeyword);
    } else {
      newSearchParams.delete('searchKeyword');
    }

    // Navigate to the new URL with router.push
    router.push(`${newPath}?${newSearchParams.toString()}`);
  }, [searchParams, router]);






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
            paddingLeft: { lg: '80px' },
            paddingRight: { lg: '80px' },

            position: { md: 'absolute' },
          }}
        >




            <ServiceSearch
            colorr="white"
            onCategoryClick={handleCategoryClick}
            onSearch={handleSearch}
            categories={categories}
            keywordCategoryMap={keywordCategoryMap}
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







        {!isLoading  && (notFound || productsEmpty) && renderNotFound}




        <ListingList tours={dataFiltered} loading={isLoading} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />


        <Stack sx={{ my: 5 }} />







      </Container>




    </>
  );
}


HomeViewCity.propTypes = {
  params: PropTypes.shape({
    city: PropTypes.string.isRequired,

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






