'use client';

import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import CrudService from 'src/services/cruds-service';

import ThankYouSummarySkeleton from 'src/sections/thank-you/thank-you-summary-skeleton';


import ThankYouSummary from './thank-you-summary';

// ----------------------------------------------------------------------

export default function ThankYouView({ params }) {
  const { checkout_id } = params;

  // Fetch thank you data using React Query
  const { data: thankyouData, isLoading, error: thankyouError } = useQuery({
    queryKey: ['thankYou', checkout_id],
    queryFn: () => CrudService.getThankYou(checkout_id),
    onError: (error) => {
      console.error('Failed to fetch listing:', error);
    },
  });

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
        pt: 5,
        pb: { xs: 8, md: 15 },

        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },
      }}
    >



        <Stack spacing={5} sx={{

        paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },


          }}>
          <Typography variant="h2" alignItems="center" textAlign="center">Completed 🎉</Typography>

          <Typography variant="h5"  alignItems="center" textAlign="center">Booking Details</Typography>

          {isLoading ? (
            <ThankYouSummarySkeleton />
          ) : (
            <ThankYouSummary tour={memoizedTourData} />
          )}
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
        </Stack>


    </Container>
  );
}

ThankYouView.propTypes = {
  params: PropTypes.shape({
    checkout_id: PropTypes.string.isRequired,
  }).isRequired,
};
