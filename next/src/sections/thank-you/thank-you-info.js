/* eslint-disable import/no-named-as-default, class-methods-use-this */


import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ThankYouInfo({ tour }) {



  if (!tour) {
    return <div>Loading...</div>; // Add a loading state
  }

  const { attributes } = tour;
  if (!attributes) {
    return <div>Loading...</div>; // Add a loading state if attributes is not yet available
  }

  const { title, price,  } = attributes;

  const ratingNumber = 5;
  const totalReviews = 100;

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', md: 'row' }}
      justifyContent={{ md: 'space-between' }}
    >
      <Stack spacing={2}>
        <Typography variant="h5">{title}</Typography>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
          <Box sx={{ typography: 'h6' }}>
            {Number.isInteger(ratingNumber) ? `${ratingNumber}.0` : ratingNumber}
          </Box>

          {totalReviews && (
            <Link variant="body2" sx={{ color: 'text.secondary' }}>
              ({fShortenNumber(totalReviews)} reviews)
            </Link>
          )}
        </Stack>
      </Stack>


    </Stack>
  );
}

ThankYouInfo.propTypes = {
  tour: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,


  }),
};
