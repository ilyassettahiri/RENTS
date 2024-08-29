import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// Skeleton Components for General Layout
export default function GeneralSkeleton() {
  return (
    <>
      {/* Breadcrumb Skeleton */}
      <Container>
        <Skeleton variant="text" sx={{ height: 40, width: 200, my: 3 }} />
      </Container>

      <Divider sx={{ mb: { xs: 6, md: 10 } }} />

      {/* Main Content Skeleton */}
      <Container>
        <Grid container spacing={{ md: 8 }}>
          {/* Main Content Section */}
          <Grid xs={12} md={8}>
            {/* Skeleton for Markdown Content */}
            <Stack spacing={2}>
              <Skeleton variant="rectangular" sx={{ height: 300, width: '100%' }} />
              <Skeleton variant="text" sx={{ height: 20, width: '70%' }} />
              <Skeleton variant="text" sx={{ height: 20, width: '80%' }} />
              <Skeleton variant="text" sx={{ height: 20, width: '60%' }} />
            </Stack>

            {/* Skeleton for Post Tags */}
            <Box sx={{ mt: 4 }}>
              <Skeleton variant="text" sx={{ height: 30, width: 150 }} />
              <Skeleton variant="rectangular" sx={{ height: 40, width: 100, mt: 2 }} />
            </Box>

            {/* Skeleton for Social Share Buttons */}
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
              <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
              <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
            </Box>

            <Divider sx={{ mt: 8 }} />

            {/* Skeleton for Post Author */}
            <Box sx={{ mt: 4 }}>
              <Skeleton variant="circular" sx={{ width: 60, height: 60, mb: 2 }} />
              <Skeleton variant="text" sx={{ height: 20, width: 120 }} />
              <Skeleton variant="text" sx={{ height: 20, width: 180 }} />
            </Box>
          </Grid>

          {/* Sidebar Section */}
          <Grid xs={12} md={4}>
            {/* Skeleton for Sidebar Content */}
            <Stack spacing={2}>
              {/* Tags and Author */}
              <Skeleton variant="rectangular" sx={{ height: 50, width: '80%' }} />
              <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
              <Skeleton variant="text" sx={{ height: 20, width: 120 }} />

              {/* Categories and Recent Posts */}
              <Skeleton variant="rectangular" sx={{ height: 40, width: '100%' }} />
              <Skeleton variant="rectangular" sx={{ height: 40, width: '90%' }} />
              <Skeleton variant="rectangular" sx={{ height: 40, width: '85%' }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Latest Posts Section */}
      <Container sx={{ mt: 10 }}>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" sx={{ height: 200, width: '100%' }} />
          <Skeleton variant="rectangular" sx={{ height: 200, width: '100%' }} />
        </Stack>
      </Container>
    </>
  );
}
