'use client';

import { useState, useEffect, useCallback, useContext, useMemo } from "react";

import { useTranslation } from 'react-i18next';

import { AuthContext } from 'src/context/AuthContextProvider';

import { useRouter } from 'src/routes/hooks';
import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CrudService from "src/services/cruds-service";
import Stack from '@mui/material/Stack';


import ServiceSearch from 'src/sections/components/services/filters/services-search';


import ListingsCarousel from 'src/sections/home/listings-carousel';



import HomeHero from './home-hero';

import BlogHomeLatestPosts from '../blog/travel/home-posts';


import ListingList from '../components/listings/list/listings-list';




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





const tours = categories.map((category, index) => ({
  id: index,
  categories: category,
}));




const keywordCategoryMap = {


};


export default function HomeView() {



  const router = useRouter();


  const { t } = useTranslation();






  const [favorites, setFavorites] = useState([]);




  const { handleCategoryClick } = useContext(AuthContext);




    const { data: homeData, isLoading: isHomeLoading, error: homeError } = useQuery({
      queryKey: ['home'],
      queryFn: CrudService.getHome,
      onError: (error) => {
        console.error('Failed to fetch Home:', error);
      },
    });







  useEffect(() => {
    if (homeData?.favorites) {
      setFavorites(homeData.favorites);

    }
  }, [homeData]);



  const InitialListings = useMemo(
    () =>
      homeData?.data.map(item => ({
        type: item.type,
        id: item.id,
        attributes: {
          ...item.attributes,
        },
      })) || homeData?.data.filter(item => item.type === 'apartments') || [],
    [homeData]
  );



  const isLoading = isHomeLoading ;



    const memoizedHomeData = useMemo(() => {
      const billiards = homeData?.data.filter(item => item.type === 'billiards') || [];
      const velos = homeData?.data.filter(item => item.type === 'velos') || [];
      const apartments = homeData?.data.filter(item => item.type === 'apartments') || [];


      const listingsEmpty = !isLoading && !InitialListings.length;

      return {

        billiards,
        velos,
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






  const handleSearch = useCallback((routeparams) => {
    const { searchLocation, searchCategories, searchKeyword } = routeparams;

    // Use "all-cities" as the default if searchLocation is empty
    const location = searchLocation || "all-cities";

    // Construct the base URL path
    let newPath = `/en/${location}`;
    if (searchCategories) {
      newPath += `/${searchCategories}`;
    }

    // Only add the searchKeyword if it's provided
    const searchQuery = searchKeyword ? `?searchKeyword=${searchKeyword}` : '';

    // Navigate to the new URL with router.push
    router.push(`${newPath}${searchQuery}`);
  }, [router]);



  return (
    <>

      <Box sx={{ position: 'relative' }}>



            <HomeHero tours={tours} categoryy="apartments"/>






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

          paddingLeft: { lg: '80px' },
          paddingRight: { lg: '80px' },
          backgroundColor: 'white',
        }}
      >


        <Stack sx={{ py: 4,  }}/>
















        <ListingList tours={memoizedHomeData.apartments} loading={isLoading} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />




        <Stack sx={{ my: 5 }} >
          {memoizedHomeData.billiards && <ListingsCarousel tours={memoizedHomeData.billiards} title={t('newCarsListings')}/>}

        </Stack>


        <Stack sx={{ my: 5 }} >
        {memoizedHomeData.velos && <ListingsCarousel tours={memoizedHomeData.velos} title={t('newBicycleListings')} />}

        </Stack>



        <Stack sx={{ my: 5 }} >
          {memoizedHomeData.apartments && <ListingsCarousel tours={memoizedHomeData.apartments} title={t('newApartmentListings')} />}

        </Stack>


      </Container>




    </>
  );
}









