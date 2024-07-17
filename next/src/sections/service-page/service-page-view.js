'use client';

import { useState, useEffect } from 'react';
import CrudService from 'src/services/cruds-service';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import Review from 'src/sections/review/review';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import ListingSummary from 'src/sections/listing-page/listing-summary';
import ListingForm from 'src/sections/listing-page/listing-form';
import ListingsCarouselService from 'src/sections/home/lisings-carousel-service';

import { SplashScreen } from 'src/components/loading-screen';
import PostSocialsShare from 'src/sections/blog/common/post-socials-share';

import ServicesDetailsHero from '../components/services/details/services-details-hero';

// ----------------------------------------------------------------------

export default function ServicePageView({ params }) {
  const mdUp = useResponsive('up', 'md');

  const [specifications, setSpecifications] = useState(null);
  const [socials, setSocials] = useState(null);
  const [recentlistings, setRecentlistings] = useState(null);

  const { url } = params;

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getService(url);

        setData(response.data);
        setSocials(response.data.attributes.socials);
        setSpecifications(response.data.attributes.specifications);
        setRecentlistings(response.data.attributes.recentlistings);

        console.log('Response data:', response.data); // Logging the response
      } catch (error) {
        console.error('Failed to fetch listing:', error);
      }
    })();
  }, [url]);

  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <>
      <ServicesDetailsHero job={data} />

      <Container
        maxWidth={false}
        sx={{
          overflow: 'hidden',
          pt: { xs: 5, md: 10 },
          pb: 10,
          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
        }}
      >
        <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
          <Grid xs={12} md={5} lg={4}>
            {data && <ListingForm tour={data} />}
          </Grid>

          <Grid xs={12} md={7} lg={8}>
            {data && (
              <ListingSummary
                specifications={specifications}
                description={data.attributes.description}
                category="services"
              />
            )}

            <Stack direction="row" flexWrap="wrap" sx={{ mt: 5 }}>
              <PostSocialsShare />
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 10 }} />

        {data && (
          <Review
            category="services"
            url={url}
            reviews={data.attributes.reviewslistings}
            seller={data.attributes.seller}
          />
        )}

        {data && <ListingsCarouselService tours={recentlistings} title="Billiards" />}
      </Container>
    </>
  );
}

ServicePageView.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
