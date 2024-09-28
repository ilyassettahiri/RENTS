import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

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

  const { title, price,picture } = attributes;



  return (

  <Box

    sx={{

      pb: 0,
      gap: 3,
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(1, 1fr)',
        lg: 'repeat(2, 1fr)',
      },
    }}
  >



    <Stack spacing={2} direction="row" alignItems="center">
      <Avatar
        variant="rounded"
        alt={title}
        src={`${process.env.NEXT_PUBLIC_IMAGE_LISTING_SMALL}${picture}`}
        sx={{ width: 80, height: 80 }}
      />

      <Stack spacing={0.5}>
        <Typography noWrap variant="h5" sx={{ maxWidth: 240 }}>
          {title}

        </Typography>


      </Stack>

    </Stack>

  </Box>


  );
}

ThankYouInfo.propTypes = {
  tour: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,

      price: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
