'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function ServicesDetailsHeroSkeleton() {
  const theme = useTheme();

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
      }}
      sx={{
        alignItems: 'flex-start',
        px: {  md: 10 },

        mt: {  md: 15 },
      }}
    >
      <CarouselSkeleton />

      <Container>
        <Skeleton variant="rectangular" width="100%" height={50} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rectangular" width="100%" height={100} sx={{ mt: 3 }} />
      </Container>
    </Box>
  );
}

// Skeleton for the carousel component
function CarouselSkeleton() {
  const theme = useTheme();

  const carousel = useCarousel({
    autoplay: false,
    ...CarouselDots({
      rounded: true,
      sx: { mt: -3 },
    }),
  });

  return (
    <Card
      sx={{
        position: 'relative',
        '& .slick-list': {
          borderRadius: 2,
          boxShadow: theme.customShadows.z16,
        },
      }}
    >
      <CarouselArrows filled shape="rounded" onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              sx={{ width: '100%', height: 300, borderRadius: 2 }}
            />
          ))}
        </Carousel>
      </CarouselArrows>
    </Card>
  );
}
