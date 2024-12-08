'use client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function HomeHeroSkeleton() {
  return (
    <Card>
      <Box
        sx={{
          minHeight: '58vh', // Use real height size
          position: 'relative',
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{
            height: '58vh', // Real height for the skeleton
            borderRadius: 1,
          }}
        />
      </Box>
      <Stack
        spacing={2}
        justifyContent="center"
        sx={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: 1,
          paddingLeft: { lg: '50px' },
          paddingRight: { lg: '50px' },
          mt: { xs: -4, md: -8 },
        }}
      >
        <Skeleton variant="text" width="80%" height={32} sx={{ mx: 'auto' }} />
        <Skeleton variant="text" width="60%" height={24} sx={{ mx: 'auto' }} />

      </Stack>
    </Card>
  );
}
