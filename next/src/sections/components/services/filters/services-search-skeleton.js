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
      <Box sx={{ py: 4, display: { xs: 'none', md: 'block' } }}>
        <Grid container spacing={2.5} alignItems="center">
          {/* Keyword Search Skeleton */}
          <Grid item xs={12} md={5}>
            <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
          </Grid>

          {/* Categories Search Skeleton */}
          <Grid item xs={12} md={3}>
            <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
          </Grid>

          {/* Location Search Skeleton */}
          <Grid item xs={12} md={3}>
            <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
          </Grid>

          {/* Search Button Skeleton */}
          <Grid item xs={12} md={1}>
            <Skeleton variant="rectangular" width={80} height={80} />
          </Grid>
        </Grid>


      </Box>
    </>
  );
}
