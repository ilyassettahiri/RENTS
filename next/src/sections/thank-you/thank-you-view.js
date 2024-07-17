/* eslint-disable import/no-named-as-default, class-methods-use-this */


'use client';

import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';


import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import ThankYouInfo from './thank-you-info';
import ThankYouSummary from './thank-you-summary';

import CrudService from 'src/services/cruds-service';

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
    <Container maxWidth={false}
      sx={{
        pt: 5,
        pb: { xs: 8, md: 15 },
        gap: 10,
        display: 'grid',
        alignItems: 'flex-start',
        gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },
      }}
    >
      {mdUp && data && data.attributes && (
        <Image
          alt="cover"
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${data.attributes.picture}`}
          ratio="3/4"
          sx={{ borderRadius: 2 }}
        />
      )}

      <Stack spacing={5}>
        <Typography variant="h2">Completed 🎉</Typography>

        <ThankYouInfo tour={data} />

        <ThankYouSummary />

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
