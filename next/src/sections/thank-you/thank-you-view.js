'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import CrudService from 'src/services/cruds-service';

import ThankYouSummary from './thank-you-summary';

// ----------------------------------------------------------------------

export default function ThankYouView({ params }) {
  const { checkout_id } = params;

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getThankYou(checkout_id);
        console.log('Response data:', response.data); // Logging the response
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch listing:', error);
        setData({ attributes: { title: 'Error', price: 0, picture: '' } }); // Fallback data
      }
    })();
  }, [checkout_id]);

  const mdUp = useResponsive('up', 'md');

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
      {/* {mdUp && data && data.attributes && (
        <Image
          alt="cover"
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${data.attributes.picture}`}
          ratio="3/4"
          sx={{ borderRadius: 2 }}
        />
      )} */}


        <Stack spacing={5} sx={{

        paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },


          }}>
          <Typography variant="h2" alignItems="center" textAlign="center">Completed 🎉</Typography>

          <Typography variant="h5"  alignItems="center" textAlign="center">Booking Details</Typography>

          <ThankYouSummary tour={data} />

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
