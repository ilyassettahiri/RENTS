import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';

// ----------------------------------------------------------------------

export default function FeaturedPostItemSkeleton({ ...other }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        ...other,
      }}
    >
      {/* Image Skeleton */}
      <Skeleton variant="rectangular" width="100%" height={240} />

      {/* Content Skeleton */}
      <Stack
        spacing={1}
        sx={{
          p: 3,
          bottom: 0,
          zIndex: 9,
          position: 'absolute',
          width: '100%',
          color: 'common.white',
        }}
      >
        {/* Time Block Skeleton */}
        <Skeleton variant="text" sx={{ height: 20, width: '40%' }} />

        {/* Title Skeleton */}
        <Skeleton variant="text" sx={{ height: 24, width: '80%' }} />

        {/* Author Skeleton */}
        <Stack direction="row" alignItems="center" sx={{ pt: 1.5 }}>
          <Avatar sx={{ mr: 1, width: 32, height: 32 }} />
          <Skeleton variant="text" sx={{ height: 20, width: '30%' }} />
        </Stack>
      </Stack>
    </Box>
  );
}
