import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

import ListingsItem from './listings-item';

// ----------------------------------------------------------------------

export default function ListingsListSimilar({ tours }) {
  const mdUp = useResponsive('up', 'md');

  const viewAllBtn = (
    <Button
      component={RouterLink}
      href={paths.travel.tour}
      color="inherit"
      endIcon={<Iconify icon="carbon:chevron-right" />}
    >
      View All
    </Button>
  );

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container maxWidth={false}
        sx={{
          py: { xs: 10, md: 15 },
                  paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{
            mb: { xs: 8, md: 10 },
          }}
        >
          <Typography variant="h3">You Might Like</Typography>

          {mdUp && viewAllBtn}
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 4, md: 3 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {tours.map((tour) => (
            <ListingsItem key={tour.id} tour={tour} />
          ))}
        </Box>

        {!mdUp && (
          <Stack alignItems="center" sx={{ mt: 8 }}>
            viewAllBtn
          </Stack>
        )}
      </Container>
    </Box>
  );
}

ListingsListSimilar.propTypes = {
  tours: PropTypes.array,
};
