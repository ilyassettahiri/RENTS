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
          minHeight: {xs: '54vh', md: '58vh' },
          position: 'relative',
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{
            height: { xs: '53vh', md: '58vh' },
            borderRadius: 1,
          }}
        />
      </Box>


    </Card>
  );
}
