'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function ListingImageSkeleton() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        gap: 1,
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)', // Single column on extra small screens
          md: 'repeat(2, 1fr)', // Two columns on medium screens and up
        },
        mb: { xs: 5, md: 5 },
      }}
    >
      {/* Main Image Skeleton */}
      <Skeleton
        variant="rectangular"
        sx={{ width: '100%', height: { xs: 240, md: 400 }, borderRadius: 2 }}
      />

      {/* Additional Thumbnails Skeleton for Desktop */}
      <Box
        sx={{
          gap: 1,
          display: {
            xs: 'none',  // Hide on mobile
            md: 'grid',  // Show grid layout on medium and up
          },
          gridTemplateColumns: 'repeat(2, 1fr)',
          position: 'relative',
        }}
      >
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{ width: '100%', height: 192, borderRadius: 2 }}
          />
        ))}

        {/* More Images Overlay Skeleton */}
        <Box
          sx={{
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{ width: '100%', height: 192, borderRadius: 2 }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >
            <Skeleton variant="text" width={50} height={50} />
          </Box>
        </Box>
      </Box>


    </Box>
  );
}

// ----------------------------------------------------------------------

