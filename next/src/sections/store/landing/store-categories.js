/* eslint-disable import/no-named-as-default, class-methods-use-this */


import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    label: 'Men Clothes',
    icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_men_clothes.svg`,
    path: '#',
  },
  {
    label: 'Women Clothes',
    icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_women_clothes.svg`,
    path: '#',
  },
  {
    label: 'Watches',
    icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_watches.svg`,
    path: '#',
  },
  {
    label: 'Home Appliances',
    icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_home_appliances.svg`,
    path: '#',
  },
  {
    label: 'Sport & Outdoor',
    icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_sport.svg`,
    path: '#',
  },
  {
    label: 'Books & Stationery',
    icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_book.svg`,
    path: '#',
  },
  {
    label: 'Home & Living',
    icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_home_living.svg`,
    path: '#',
  },
  { label: 'Health', icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_health.svg`, path: '#' },
  { label: 'Mobile', icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_mobile.svg`, path: '#' },
  { label: 'Laptop', icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_laptop.svg`, path: '#' },
  { label: 'Tablet', icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_tablet.svg`, path: '#' },
  {
    label: 'Headphones',
    icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/icons/ecommerce/ic_headphones.svg`,
    path: '#',
  },
];


// ----------------------------------------------------------------------

export default function StoreCategories() {
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
        Categories
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(4, 1fr)',
          md: 'repeat(6, 1fr)',
        }}
      >
        {CATEGORIES.map((category) => (
          <Stack
            key={category.label}
            alignItems="center"
            justifyContent="center"
            sx={{
              px: 1,
              py: 3,
              borderRadius: 2,
              cursor: 'pointer',
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
              '&:hover': {
                boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
              },
            }}
          >
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                bgcolor: 'background.neutral',
                borderRadius: '50%',
              }}
            >
              <Image src={category.icon} sx={{ width: 40, height: 40 }} />
            </Box>

            <TextMaxLine variant="subtitle2" line={1}>
              {category.label}
            </TextMaxLine>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
