'use client';

import { useState, useEffect, useCallback, useContext, useMemo } from "react";
import PropTypes from 'prop-types';

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


export default function HomeView({ homeData }) {



  const router = useRouter();


  const { t } = useTranslation();






  const [favorites, setFavorites] = useState(homeData?.favorites || []);




  const { handleCategoryClick } = useContext(AuthContext);



  const isLoading = !homeData ;












  const memoizedHomeData = useMemo(() => {
    if (!homeData) return {};

    const attributes = homeData.data || [];
    const recentarticles = homeData?.recentarticles || [];
    const favorites = homeData?.favorites || [];

    return {
      billiards: attributes.filter((item) => item.type === 'billiards'),
      velos: attributes.filter((item) => item.type === 'velos'),
      apartments: attributes.filter((item) => item.type === 'apartments'),
      recentarticles,
      favorites,
    };
  }, [homeData]);

  const {
    billiards = [],
    velos = [],
    apartments = [],
    recentarticles = [],
  } = memoizedHomeData;






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
















        <ListingList tours={apartments} favorites={favorites} loading={isLoading}  onFavoriteToggle={handleFavoriteToggle} />




        <Stack sx={{ my: 5 }} >
           <ListingsCarousel tours={billiards} title={t('newBilliardListings')} />

        </Stack>


        <Stack sx={{ my: 5 }} >
        <ListingsCarousel tours={velos} title={t('newBicycleListings')} />

        </Stack>



        <Stack sx={{ my: 5 }} >
        <ListingsCarousel tours={apartments} title={t('newApartmentListings')} />

        </Stack>


      </Container>


      <Stack sx={{ mt: 10 }} >
      <BlogHomeLatestPosts posts={recentarticles.slice(0, 4)} />

      </Stack>

    </>
  );
}



HomeView.propTypes = {
  homeData: PropTypes.shape({
    data: PropTypes.array,
    recentarticles: PropTypes.array,
    favorites: PropTypes.array,
  }),
};






