import React from 'react';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// ----------------------------------------------------------------------

export default function StoreHeroSkeleton() {
  return (
    <Container
      maxWidth={false}
      sx={{
        pt: { xs: 5, md: 3 },
        mb: { md: -4 },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          height: '400px',
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: 'grey.300', // Placeholder background
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>

      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: (theme) => theme.palette.background.paper,
          boxShadow: (theme) => theme.shadows[3],
          bottom: -60,
          left: '50%',
          transform: 'translateX(-50%)',
          position: 'relative',
          mt: -12,
          py: 2,
          px: 2,
        }}
      >
        <Stack spacing={4} direction={{ xs: 'column', md: 'row' }}>
          <Box
            sx={{
              flexGrow: 1,
              gap: 1,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)',
                lg: 'repeat(1, 1fr)',
              },
            }}
          >
            <Stack spacing={1} direction="row" alignItems="center">
              <Skeleton variant="circular">
                <Avatar sx={{ width: 64, height: 64 }} />
              </Skeleton>

              <Stack spacing={0.8}>
                <Skeleton variant="text" sx={{ height: 28, width: '60%' }} />
                <Stack spacing={0.5} direction="row" alignItems="center">
                  <Skeleton variant="text" sx={{ height: 20, width: '40%' }} />
                  <Skeleton variant="text" sx={{ height: 20, width: '20%' }} />
                </Stack>
              </Stack>
            </Stack>
          </Box>

          <Stack spacing={3} direction="row" alignItems="center" flexShrink={0}>
            <Skeleton variant="text" sx={{ height: 22, width: 22 }} />
            <Skeleton variant="text" sx={{ height: 22, width: 22 }} />
            <Skeleton variant="text" sx={{ height: 22, width: 22 }} />
            <Skeleton variant="text" sx={{ height: 22, width: 22 }} />
            <Skeleton variant="circular" sx={{ width: 22, height: 22 }} />
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
