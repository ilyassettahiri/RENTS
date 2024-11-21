'use client';

import { useState, useEffect, useCallback, useMemo  } from 'react';
import CrudService from 'src/services/cruds-service';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';

import Review from 'src/sections/review/review';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import ListingSummary from 'src/sections/listing-page/listing-summary';
import ListingForm from 'src/sections/listing-page/listing-form';
import ListingsCarouselService from 'src/sections/home/lisings-carousel-service';
import Map from 'src/components/map';


import ListingHeaderSkeleton from 'src/sections/listing-page/listing-header-skeleton';
import ServicesDetailsHeroSkeleton from 'src/sections/components/services/details/services-details-hero-skeleton';
import ListingFormSkeleton from 'src/sections/listing-page/listing-form-skeleton';
import ServicesDetailsHero from '../components/services/details/services-details-hero';

// ----------------------------------------------------------------------

export default function ServicePageView({ params, serviceData }) {
  const mdUp = useResponsive('up', 'md');
  const { t } = useTranslation();


  const [favorites, setFavorites] = useState(serviceData?.favorites || []);


  const { url } = params;








  const memoizedserviceData = useMemo(() => {
    const specifications = serviceData?.data?.attributes?.specifications || [];
    const recentListings = serviceData?.data?.attributes?.recentlistings || [];
    const sellerlistings = serviceData?.data?.attributes?.sellerlistings || [];

    const serviceEmpty = !recentListings.length;

    return {
      specifications,
      recentListings,
      sellerlistings,
      favorites: serviceData?.favorites || [],
      serviceEmpty,
    };
  }, [serviceData]);



  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);





  return (


    <>
          {!serviceData ? (
            <ServicesDetailsHeroSkeleton />
          ) : (

            <ServicesDetailsHero job={serviceData.data} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />


          )}

        <Container
          maxWidth={false}
          sx={{
            overflow: 'hidden',
            paddingLeft: { lg: '50px' },
            paddingRight: { lg: '50px' },

            mb: 10,

          }}
        >


            <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse" sx={{ mt: { xs: 1, },  }}>
              <Grid xs={12} md={5} lg={4}>





                  <Grid xs={12} md={5} lg={4}

                  sx={{
                    display: { xs: 'none', md: 'block' }, // Hide on extra-small screens, show on medium screens and up
                  }}

                  >
                    {!serviceData ? (
                      <ListingFormSkeleton />
                    ) : (
                      <ListingForm tour={serviceData.data} />
                    )}
                  </Grid>


              </Grid>

              <Grid xs={12} md={7} lg={8}>


                {!serviceData ? (
                  <ListingHeaderSkeleton />
                ) : (
                  <ListingSummary
                  specifications={memoizedserviceData.specifications}
                  description={serviceData?.data?.attributes?.description}
                  category="services"
                  />
                )}


              </Grid>
            </Grid>





            <Stack spacing={3} sx={{ my: 6 }}>


              {serviceData && <Map offices={serviceData.data} sx={{ borderRadius: 2 }} />}
            </Stack>





              <Box sx={{ my: 5, display: { xs: 'block', md: 'none' }, }}>
                {!serviceData ? (
                  <ListingFormSkeleton />
                ) : (
                  <ListingForm tour={serviceData.data} />
                )}
              </Box>




            <Divider sx={{ my: 10 }} />

            {serviceData && (
              <Review
                category="services"
                url={url}
                reviews={serviceData.data.attributes.reviewslistings}
                seller={serviceData.data.attributes.seller}
              />
            )}


            <Divider sx={{ my: 10 }} />


            {serviceData && <ListingsCarouselService tours={memoizedserviceData.sellerlistings} title={t('Other listings from this store')} />}



            {serviceData && <ListingsCarouselService tours={memoizedserviceData.recentListings} title={t('Recommendedforyou')} />}


        </Container>


    </>
  );
}

ServicePageView.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  serviceData: PropTypes.object, // Expect job data or null
};
