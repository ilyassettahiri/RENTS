'use client';

import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import Iconify from 'src/components/iconify';
import { SplashScreen } from 'src/components/loading-screen';

import Review from '../review/review';
import ElearningCourseListSimilar from '../components/business/list/business-list-similar';
import ElearningCourseDetailsHero from '../components/business/details/business-details-hero';
import ElearningCourseDetailsInfo from '../components/business/details/business-details-info';
import ElearningCourseDetailsSummary from '../components/business/details/business-details-summary';
import ElearningCourseDetailsTeachersInfo from '../components/business/details/business-details-teachers-info';

// ----------------------------------------------------------------------

export default function BusinessPageView({ params }) {
  const mdUp = useResponsive('up', 'md');
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
      <ElearningCourseDetailsHero course={_mockCourse} />

      <Container
        maxWidth={false}
        sx={{
          overflow: 'hidden',
          pt: { xs: 5, md: 10 },
          pb: { xs: 15, md: 10 },
          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
        }}
      >
        <Grid container spacing={{ xs: 5, md: 8 }}>
          {!mdUp && (
            <Grid xs={12}>
              <ElearningCourseDetailsInfo course={_mockCourse} />
            </Grid>
          )}

          <Grid xs={12} md={7} lg={8}>
            <ElearningCourseDetailsSummary course={_mockCourse} />

            <Stack direction="row" flexWrap="wrap" sx={{ mt: 5 }}>
              <Typography variant="subtitle2" sx={{ mt: 0.75, mr: 1.5 }}>
                Share:
              </Typography>
            </Stack>

            <Divider sx={{ my: 5 }} />

            <ElearningCourseDetailsTeachersInfo teachers={_mockCourse.teachers} />
          </Grid>

          <Grid xs={12} md={5} lg={4}>
            <Stack spacing={5}>
              {mdUp && <ElearningCourseDetailsInfo course={_mockCourse} />}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {mdUp && <Divider />}

      <Review />

      <ElearningCourseListSimilar courses={courseSimilar} />
    </>
  );
}

BusinessPageView.propTypes = {
  params: PropTypes.shape({
    // Define the expected shape of params if necessary
  }),
};
