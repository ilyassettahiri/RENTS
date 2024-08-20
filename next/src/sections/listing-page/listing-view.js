"use client";

import { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { SplashScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Review from 'src/sections/review/review';
import ListingSummary from 'src/sections/listing-page/listing-summary';
import CrudService from 'src/services/cruds-service';
import StorePopularProducts from 'src/sections/store/landing/store-popular-products';
import ListingsCarousel from 'src/sections/home/listings-carousel';
import Map from 'src/components/map';

import ListingHeader from './listing-header';
import ListingImage from './listing-image';
import ListingForm from './listing-form';
import TourListSimilar from '../components/listings/list/listings-list-similar';
import ListingList from '../components/listings/list/listings-list';


export default function ListingView({ params }) {
  const router = useRouter();
  const { category, url } = params;
  const loading = useBoolean(true);

  const [data, setData] = useState(null);
  const [recentListingsElJadida, setRecentListingsElJadida] = useState(null);
  const [specifications, setSpecifications] = useState(null);

  const mdUp = useResponsive('up', 'md');

  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getListingsFront(category, url);

        const favoritesData = response.favorites;

        setData(response.data);
        setRecentListingsElJadida(response.data.attributes.recentListingsElJadida);
        setSpecifications(response.data.attributes.specifications);
        setFavorites(favoritesData);

        console.log('recentlistings :', response.data.attributes.recentlistings);

      } catch (error) {
        console.error('Failed to fetch listing:', error);
      }
    })();
  }, [category, url]);

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



  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        overflow: 'hidden',
        paddingLeft: { lg: '80px' },
        paddingRight: { lg: '80px' },
      }}
    >
      {mdUp && (

          <CustomBreadcrumbs
            links={[
              { name: 'Home', href: '/' },
              { name: params.category, href: paths.travel.tour },
              { name: params.url },
            ]}
            sx={{ mt: 1, mb: 3 }}
          />
      )}


      {data && <ListingImage images={data.attributes.images}  />}

      <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse" sx={{ mt: { xs: 1, }, }}>
        <Grid xs={12} md={5} lg={4}>
          {data && <ListingForm tour={data} />}
        </Grid>

        <Grid xs={12} md={7} lg={8}>
          {data && <ListingHeader tour={data} seller={data.attributes.seller} favorites={favorites} onFavoriteToggle={handleFavoriteToggle}/>}
          <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

          {data && <ListingSummary
            specifications={specifications}
            description={data.attributes.description}
            category={data.attributes.category}
          />}


        </Grid>
      </Grid>


      <Stack spacing={3} sx={{ my: 10 }}>
        <Typography variant="h5">Location</Typography>

        {data &&<Map offices={data} sx={{ borderRadius: 2 }} />}
      </Stack>

      <Divider sx={{ my: 10 }} />


      {data && <Review
        category={category}
        url={url}
        reviews={data.attributes.reviewslistings}
        seller={data.attributes.seller}
      />}

      <Divider sx={{ my: 10 }} />

      {data && <ListingsCarousel tours={data.attributes.recentlistings} title="Billiards" />}

      {data && <StorePopularProducts
        recentListingsCasablanca={data.attributes.recentlistingscasablanca}
        recentListingsMarrakech={data.attributes.recentlistingsmarrakech}
        recentListingsTanger={data.attributes.recentlistingstanger}
        recentListingsRabat={data.attributes.recentlistingsrabat}
        recentListingsFes={data.attributes.recentlistingsfes}
        recentListingsAgadir={data.attributes.recentlistingsagadir}
        recentListingsMeknes={data.attributes.recentlistingsmeknes}
        recentListingsOujda={data.attributes.recentlistingsojuda}
        recentListingsKenitra={data.attributes.recentlistingskenitra}
        recentListingsTetouan={data.attributes.recentlistingstetouan}
        recentListingsSale={data.attributes.recentlistingssale}
        recentListingsTemara={data.attributes.recentlistingstemara}
        recentListingsSafi={data.attributes.recentlistingssafi}
        recentListingsMohammedia={data.attributes.recentlistingsmohammedia}
        recentListingsKhouribga={data.attributes.recentlistingskhouribga}
        recentListingsElJadida={recentListingsElJadida}
        recentListingsBeniMellal={data.attributes.recentlistingsbenimellal}
      />}

    </Container>
  );
}

ListingView.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
