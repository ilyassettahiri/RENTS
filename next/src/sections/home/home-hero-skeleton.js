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
          minHeight: { md: '58vh' },
          position: 'relative',
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{
            height: { xs: '100%', md: '58vh' },
            borderRadius: 1,
          }}
        />
      </Box>

      <Stack
        spacing={2}
        justifyContent="center"
        sx={{
          top: 0,
          height: 1,
          width: '100%',
          position: 'absolute',
          paddingLeft: { lg: '50px' },
          paddingRight: { lg: '50px' },
          mt: { xs: -4, md: -8 },
        }}
      >
        <Skeleton variant="text" width="80%" height={32} />
        <Skeleton variant="text" width="60%" height={24} />
      </Stack>
    </Card>
  );
}
