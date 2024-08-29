import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';

// ----------------------------------------------------------------------

export default function PostItemSkeleton() {
  return (
    <Stack spacing={2.5}>
      {/* Image Placeholder */}
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ borderRadius: 2, paddingTop: '100%' }} // 1:1 aspect ratio
      />

      {/* Title and Time Block */}
      <Stack spacing={1}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" height={30} />
      </Stack>

      {/* Author Section */}
      <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        <Skeleton variant="text" width={80} sx={{ ml: 1 }} />
      </Stack>
    </Stack>
  );
}
