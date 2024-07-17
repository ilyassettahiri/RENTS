'use client';

import { useState, useEffect, useCallback } from "react";
import { useBoolean } from 'src/hooks/use-boolean';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CrudService from "src/services/cruds-service";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';


import ServiceSearch from 'src/sections/components/services/filters/services-search';

import FilterDialog from 'src/sections/components/services/filters/filter-dialog';


import HomeHero from './home-hero';
import HomeIntroduce from './home-introduce';
import HomeToursByCity from './home-tours-by-city';
import BlogHomeLatestPosts from '../blog/travel/home-posts';
import HomeFavoriteDestinations from './home-favorite-destinations';

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


const tours = heroUrl.map((url, index) => ({
  id: index,
  heroUrl: url,
  categories: categories[index] || 'Uncategorized',
}));





export default function HomeView() {
  const [billiards, setBilliards] = useState([]);
  const [boxings, setBoxings] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [ourclients, setOurclients] = useState([]);

  const [recentarticles, setRecentarticles] = useState([]);




  const [initialListings, setInitialListings] = useState([]); // Store the initial listings fetched

  const [priceFilter, setPriceFilter] = useState([0, 2000]);


  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const applyFilters = (billiardsx, priceFilterx) => {
    const [minPrice, maxPrice] = priceFilterx;
    const filteredListings = billiardsx.filter(
      item => item.attributes.price >= minPrice && item.attributes.price <= maxPrice
    );

    setBilliards(filteredListings);

  };


  const loading = useBoolean(true);



  const fetchListings = async (searchs) => {
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

      const favoritesData = response.favorites;


      setFavorites(favoritesData);
      setInitialListings(listingsData); // Store the fetched listings


       setBilliards(listingsData);

       applyFilters(listingsData, priceFilter);



    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };




  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getHome();


        // Split the data into billiards and boxings
        const billiardsData = response.data.filter(item => item.type === 'billiards');

        const boxingsData = response.data.filter(item => item.type === 'listings');
        const favoritesData = response.favorites;

        const ourclientsData = response.ourclients;


        const recentarticlesData = response.recentarticles;

        console.log('Mapped recentarticlesData :', recentarticlesData);
        console.log('Our clients:', ourclientsData); // Logging the our clients


        setBilliards(billiardsData);
        setBoxings(boxingsData);
        setFavorites(favoritesData);
        setRecentarticles(recentarticlesData);
        setOurclients(ourclientsData);


      } catch (error) {
        console.error('Failed to fetch Home:', error);
      }
    })();
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


  const handleFilterPriceChange = (newPriceFilter) => {
    setPriceFilter(newPriceFilter);
    applyFilters(billiards, newPriceFilter); // Apply price filter to already fetched listings
  };


  const handleResetFilters = () => {
    setPriceFilter([0, 2000]);
    setBilliards(initialListings);
  };

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

          <Stack alignItems="flex-end" sx={{  mr: 3 }}>

              <Button

                sx={{ my: 4, }}
                color="inherit"
                variant="contained"
                startIcon={<Iconify icon="carbon:filter" width={18} />}

                onClick={handleDialogOpen} // Open the dialog when clicked

              >
                Filters
              </Button>



          </Stack>
          <FilterDialog open={dialogOpen} onClose={handleDialogClose} onFilterPriceChange={handleFilterPriceChange}           onResetFilters={handleResetFilters}/>

        <ListingList tours={billiards} loading={loading.value} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />

        <ListingsCarousel tours={billiards} title="Billiards" />
        <ListingsCarousel tours={boxings} title="Boxings" />






      </Container>
      <OurClients brands={ourclients} />


      <BlogHomeLatestPosts posts={recentarticles.slice(2, 6)} />
    </>
  );
}


