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
import ServicesDetailsHero from '../components/services/details/jobs-details-hero';

// ----------------------------------------------------------------------

export default function JobPageView({ params, jobData }) {
  const mdUp = useResponsive('up', 'md');
  const { t } = useTranslation();



  const [favorites, setFavorites] = useState(jobData?.favorites || []);


  const { url } = params;



  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Directly set loading to false on component mount
    setIsLoading(false);
  }, []);



  const memoizedJobData = useMemo(() => {
    const specifications = jobData?.data?.attributes?.specifications || [];
    const recentListings = jobData?.data?.attributes?.recentlistings || [];
    const sellerlistings = jobData?.data?.attributes?.sellerlistings || [];

    const serviceEmpty = !recentListings.length;

    return {
      specifications,
      recentListings,
      sellerlistings,
      favorites: jobData?.favorites || [],
      serviceEmpty,
    };
  }, [jobData]);

  const handleFavoriteToggle = useCallback((id, isFavorite) => {
    setFavorites(prevFavorites =>
      isFavorite ? [...prevFavorites, id] : prevFavorites.filter(favId => favId !== id)
    );
  }, []);





  return (


    <>


          {isLoading ? (
            <ServicesDetailsHeroSkeleton aa = {3} bb = {480}/>
          ) : (


            <ServicesDetailsHero
              job={jobData.data}
              favorites={favorites}
              onFavoriteToggle={handleFavoriteToggle}
            />

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


            <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse" sx={{ mt: { xs: 1, }, }}>
              <Grid xs={12} md={5} lg={4}>





                  <Grid xs={12} md={5} lg={4}

                  sx={{
                    display: { xs: 'none', md: 'block' }, // Hide on extra-small screens, show on medium screens and up
                  }}
                  >
                    {isLoading ? (
                      <ListingFormSkeleton />
                    ) : (
                      <ListingForm tour={jobData.data} />
                    )}
                  </Grid>


              </Grid>

              <Grid xs={12} md={7} lg={8}>


                {isLoading ? (
                  <ListingHeaderSkeleton />
                ) : (
                  <ListingSummary
                  specifications={memoizedJobData.specifications}
                  description={jobData?.data?.attributes?.description}
                  category="jobs"
                  />
                )}


              </Grid>
            </Grid>





            <Stack spacing={3} sx={{ my: 6 }}>


              {jobData && <Map offices={jobData.data} sx={{ borderRadius: 2 }} />}
            </Stack>





              <Box sx={{ my: 5, display: { xs: 'block', md: 'none' }, }}>
                {isLoading ? (
                  <ListingFormSkeleton />
                ) : (
                  <ListingForm tour={jobData.data} />
                )}
              </Box>




            <Divider sx={{ my: 10 }} />

            {jobData && (
              <Review
                category="jobs"
                url={url}
                reviews={jobData.data.attributes.reviewslistings}
                seller={jobData.data.attributes.seller}
              />
            )}

            <Divider sx={{ my: 10 }} />


            {jobData && <ListingsCarouselService tours={memoizedJobData.sellerlistings} title={t('Other listings from this store')} />}



            {jobData && <ListingsCarouselService tours={memoizedJobData.recentListings} title={t('Recommendedforyou')} />}


        </Container>


    </>
  );
}

JobPageView.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  jobData: PropTypes.object, // Expect job data or null
};
