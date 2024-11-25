'use client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function ServiceSearchSkeleton() {
  return (
    <>
      <Box sx={{ py: 5, display: { xs: 'none', md: 'block' } }}>
        <Grid container spacing={2.5} alignItems="center">
          {/* Keyword Search Skeleton */}
          <Grid item xs={12} md={5}>
            <Skeleton variant="rectangular" height={70} sx={{ borderRadius: 1 }} />
          </Grid>

          {/* Categories Search Skeleton */}
          <Grid item xs={12} md={3}>
            <Skeleton variant="rectangular" height={70} sx={{ borderRadius: 1 }} />
          </Grid>

          {/* Location Search Skeleton */}
          <Grid item xs={12} md={3}>
            <Skeleton variant="rectangular" height={70} sx={{ borderRadius: 1 }} />
          </Grid>

          {/* Search Button Skeleton */}
          <Grid item xs={12} md={1}>
            <Skeleton variant="rectangular" width={80} height={70} />
          </Grid>
        </Grid>


      </Box>


      <Box
        sx={{
          py: 7,
          px: 2,
          mt: { xs: -17 },
          display: { xs: 'block', md: 'none' }, // Visible only on mobile
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            width: '100%',
            height: 54, // Matches a typical button height
            borderRadius: 1, // Rounded edges for the button look
          }}
        />
      </Box>

    </>
  );
}
