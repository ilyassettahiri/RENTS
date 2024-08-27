'use client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ListingFormSkeleton() {
  return (
    <Card>
      <Stack spacing={3} sx={{ p: 2 }}>
        <Stack spacing={1} direction="row" alignItems="center">
          <Skeleton variant="text" width={80} height={32} />
          <Skeleton variant="text" width={40} height={20} sx={{ ml: 1 }} />
        </Stack>

        <Stack spacing={1.5}>
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />

          <Box
            sx={{
              py: 0.5,
              px: 1.5,
              borderRadius: 1,
              bgcolor: (theme) => theme.palette.grey[500_08],
            }}
          >
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          </Box>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      <Stack spacing={3} sx={{ p: 2 }}>
        <Box display="flex">
          <Skeleton variant="text" width="50%" height={24} />
          <Skeleton variant="text" width="30%" height={24} sx={{ textAlign: 'right' }} />
        </Box>

        <Box display="flex">
          <Skeleton variant="text" width="50%" height={24} />
          <Skeleton variant="text" width="30%" height={24} sx={{ textAlign: 'right' }} />
        </Box>

        <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1 }} />
      </Stack>
    </Card>
  );
}
