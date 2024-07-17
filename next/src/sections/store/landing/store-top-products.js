/* eslint-disable import/no-named-as-default, class-methods-use-this */


import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


import StoreItemTop from '../product/item/store-item-top';
import StoreItemHot from '../product/item/store-item-hot';

// ----------------------------------------------------------------------

export default function StoreTopProducts() {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        Top Products
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        sx={{ mb: { xs: 3, md: 8 } }}
      >

      </Box>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >


        <Box
          gap={3}
          display="grid"
          gridTemplateRows={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >

        </Box>
      </Box>
    </Container>
  );
}
