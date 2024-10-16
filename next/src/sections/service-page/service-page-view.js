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

export default function ServicePageView({ params }) {
  const mdUp = useResponsive('up', 'md');
  const { t } = useTranslation();


  const [favorites, setFavorites] = useState([]);


  const { url } = params;



  const { data: serviceData, isLoading: isServiceLoading, error: serviceError } = useQuery({
    queryKey: ['service', url],
    queryFn: () => CrudService.getService(url),
    onError: (error) => {
      console.error('Failed to fetch service:', error);
    },
  });

  useEffect(() => {
    if (serviceData?.favorites) {
      setFavorites(serviceData.favorites);
    }
  }, [serviceData]);

  const memoizedServiceData = useMemo(() => {
    const specifications = serviceData?.data?.attributes?.specifications || [];
    const recentListings = serviceData?.data?.attributes?.recentlistings || [];
    const sellerlistings = serviceData?.data?.attributes?.sellerlistings || [];

    const serviceEmpty = !isServiceLoading && !recentListings.length;

    return {
      specifications,
      recentListings,
      sellerlistings,

      favorites: serviceData?.favorites || [],
      serviceLoading: isServiceLoading,
      serviceError,
      serviceEmpty,
    };
  }, [serviceData, isServiceLoading, serviceError]);



  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);





  return (


    <>
          {isServiceLoading ? (
            <ServicesDetailsHeroSkeleton />
          ) : (
            <ServicesDetailsHero job={serviceData.data} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />
          )}

        <Container
          maxWidth={false}
          sx={{
            overflow: 'hidden',
            paddingLeft: { lg: '80px' },
            paddingRight: { lg: '80px' },

            mb: 10,

          }}
        >


            <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse" sx={{ mt: { xs: 1, },  }}>
              <Grid xs={12} md={5} lg={4}>




                {mdUp && (
                  <Grid xs={12} md={5} lg={4}>
                    {isServiceLoading ? (
                      <ListingFormSkeleton />
                    ) : (
                      <ListingForm tour={serviceData.data} />
                    )}
                  </Grid>
                )}

              </Grid>

              <Grid xs={12} md={7} lg={8}>


                {isServiceLoading ? (
                  <ListingHeaderSkeleton />
                ) : (
                  <ListingSummary
                  specifications={memoizedServiceData.specifications}
                  description={serviceData?.data?.attributes?.description}
                  category="services"
                  />
                )}


              </Grid>
            </Grid>





            <Stack spacing={3} sx={{ my: 10 }}>
              <Typography variant="h5">{t('Location')}</Typography>

              {serviceData && <Map offices={serviceData.data} sx={{ borderRadius: 2 }} />}
            </Stack>




            {!mdUp && (
              <Box sx={{ my: 5 }}>
                {isServiceLoading ? (
                  <ListingFormSkeleton />
                ) : (
                  <ListingForm tour={serviceData.data} />
                )}
              </Box>
            )}



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


            {serviceData && <ListingsCarouselService tours={memoizedServiceData.sellerlistings} title={t('Other listings from this store')} />}



            {serviceData && <ListingsCarouselService tours={memoizedServiceData.recentListings} title={t('Recommendedforyou')} />}


        </Container>


    </>
  );
}

ServicePageView.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
