import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';

// ----------------------------------------------------------------------

export default function FeaturedPostItemSkeleton({ largePost, ...other }) {
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
      <Skeleton variant="rectangular" width="100%" height={largePost ? 320 : 240} />

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
          ...(largePost && {
            p: { xs: 3, md: 5 },
          }),
        }}
      >
        {/* Time Block Skeleton */}
        <Skeleton variant="text" sx={{ height: 20, width: '40%' }} />

        {/* Title Skeleton */}
        <Skeleton
          variant="text"
          sx={{
            height: largePost ? { xs: 28, md: 40 } : 24,
            width: '80%',
          }}
        />

        {/* Content Skeleton (only for large posts) */}
        {largePost && <Skeleton variant="text" sx={{ height: 16, width: '100%' }} />}

        {/* Author Skeleton */}
        <Stack direction="row" alignItems="center" sx={{ pt: 1.5 }}>
          <Avatar sx={{ mr: 1, width: 32, height: 32 }} />
          <Skeleton variant="text" sx={{ height: 20, width: '30%' }} />
        </Stack>
      </Stack>
    </Box>
  );
}
