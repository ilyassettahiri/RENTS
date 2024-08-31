'use client';

import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import Map from 'src/components/map';

import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import CrudService from 'src/services/cruds-service';

import ThankYouSummarySkeleton from 'src/sections/thank-you/thank-you-summary-skeleton';


import ThankYouSummary from './thank-you-summary';

// ----------------------------------------------------------------------

export default function ThankYouView({ params }) {
  const { checkout_id } = params;
  const mdUp = useResponsive('up', 'md');

  // Fetch thank you data using React Query
  const { data: thankyouData, isLoading, error: thankyouError } = useQuery({
    queryKey: ['thankYou', checkout_id],
    queryFn: () => CrudService.getThankYou(checkout_id),
    onError: (error) => {
      console.error('Failed to fetch listing:', error);
    },
  });

  // Log the thankyouData whenever it changes
useEffect(() => {
  if (thankyouData) {
    console.log('Thank You Data:', thankyouData); // Log thankyouData
  }
}, [thankyouData]);


  // Memorize the processed data to avoid unnecessary recalculations
  const memoizedTourData = useMemo(() => {
    if (thankyouError) {
      return { attributes: { title: 'Error', price: 0, picture: '' } }; // Fallback data
    }
    return thankyouData?.data || null;
  }, [thankyouData, thankyouError]);

  return (


    <Container
      maxWidth={false}

      sx={{

        py: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center the content horizontally
        paddingLeft: { lg: '80px' },
        paddingRight: { lg: '80px' },
      }}


    >

          <Typography variant="h2" align="center">Completed 🎉</Typography>

          <Container

            sx={{
              pt: 5,
              pb: { xs: 2, md: 2 },
              gap: 10,
              display: 'grid',
              alignItems: 'flex-start',
              gridTemplateColumns: { md: 'repeat(2, 1fr)' },

              gridTemplateRows: 'auto 1fr', // Ensure both columns have the same height
              height: '100%', // Make sure the height is 100%

            }}
          >



              <Stack spacing={5} sx={{ height: '100%' }}>


                {isLoading ? (
                  <ThankYouSummarySkeleton />
                ) : (
                  <ThankYouSummary tour={memoizedTourData} />
                )}

              </Stack>

              {thankyouData &&  ( <Map offices={thankyouData?.data} sx={{ borderRadius: 2 , height: '100%'}} />)}

          </Container>

          <Stack spacing={2.5} direction={{ xs: 'column', md: 'row' }} justifyContent="center">
                <Button
                  component={RouterLink}
                  href="/"
                  variant="outlined"
                  size="large"
                  color="inherit"
                  startIcon={<Iconify icon="carbon:chevron-left" />}
                >
                  Back Home
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  color="inherit"
                  startIcon={<Iconify icon="carbon:package" />}
                >
                  Download Invoice
                </Button>
          </Stack>


    </Container>
  );
}

ThankYouView.propTypes = {
  params: PropTypes.shape({
    checkout_id: PropTypes.string.isRequired,
  }).isRequired,
};
