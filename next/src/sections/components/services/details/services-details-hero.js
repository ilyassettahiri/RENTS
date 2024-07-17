"use client";

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { alpha, useTheme } from '@mui/material/styles';

import { fDate } from 'src/utils/format-time';
import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import CarouselImg from 'src/components/carousel/carousel-img.jsx'; // Add .jsx extension

export default function ServicesDetailsHero({ job }) {
  const theme = useTheme();

  const [favorite, setFavorite] = useState(job.favorited);

  const handleChangeFavorite = useCallback((event) => {
    setFavorite(event.target.checked);
  }, []);

  const images = job.attributes.images.map((url, index) => ({
    id: index,
    title: job.attributes.title,
    coverUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${url}`, // Ensure the correct URL format
  }));

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/background/overlay_2.jpg`,
        }),
        pt: 5,
        pb: 10,
      }}
    >
      <Container sx={{ my: 2 }}>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          sx={{
            mb: 3,
            alignItems: 'flex-start',
          }}
        >
          <Container>
            <Stack spacing={{ xs: 3, md: 2 }} sx={{ color: 'common.white' }}>
              <Typography variant="h3" component="h1">
                {job.attributes.title}
              </Typography>

              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ opacity: 0.48 }}>
                <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                  <Iconify icon="carbon:baggage-claim" sx={{ mr: 1 }} />
                  <Link color="inherit" underline="always">
                    {job.attributes.category}
                  </Link>
                </Stack>

                <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                  <Iconify icon="carbon:view" sx={{ mr: 1 }} /> {`${job.attributes.total_views} views`}
                </Stack>

                <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                  <Iconify icon="carbon:location" sx={{ mr: 1 }} /> {job.attributes.city}
                </Stack>
              </Stack>
            </Stack>

            <Stack
              spacing={2}
              direction="row"
              alignItems="flex-start"
              sx={{ my: 20 }}
            >
              <Stack spacing={2} alignItems="center" sx={{ width: 1 }}>
                <Button fullWidth variant="contained" size="large" color="primary">
                  Apply Now
                </Button>

                <Typography variant="body2" sx={{ color: 'common.white' }}>
                  {`Expiration date: `}
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    {fDate(job.attributes.deadline)}
                  </Box>
                </Typography>
              </Stack>

              <Box sx={{ pt: 0.75 }}>
                <Checkbox
                  color="error"
                  checked={favorite}
                  onChange={handleChangeFavorite}
                  icon={<Iconify icon="carbon:favorite" width={24} />}
                  checkedIcon={<Iconify icon="carbon:favorite-filled" width={24} />}
                />
              </Box>
            </Stack>
          </Container>

          <Card>
            <CarouselImg data={images} />
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

ServicesDetailsHero.propTypes = {
  job: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string,
      favorited: PropTypes.bool,
      category: PropTypes.string,
      city: PropTypes.string,
      total_views: PropTypes.number,
      deadline: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
};
