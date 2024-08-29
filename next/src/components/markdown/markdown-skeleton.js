import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function MarkdownSkeleton() {
  return (
    <Stack spacing={2}>
      {/* Title Skeleton */}
      <Skeleton variant="text" width="60%" height={40} />

      {/* Paragraph Skeletons */}
      <Skeleton variant="text" width="90%" height={24} />
      <Skeleton variant="text" width="100%" height={24} />
      <Skeleton variant="text" width="95%" height={24} />
      <Skeleton variant="text" width="80%" height={24} />

      {/* Another Title Skeleton */}
      <Skeleton variant="text" width="50%" height={36} sx={{ mt: 3 }} />

      {/* More Paragraph Skeletons */}
      <Skeleton variant="text" width="100%" height={24} />
      <Skeleton variant="text" width="100%" height={24} />
      <Skeleton variant="text" width="85%" height={24} />

      {/* Additional Paragraph Skeletons to fill out the content */}
      <Skeleton variant="text" width="95%" height={24} />
      <Skeleton variant="text" width="70%" height={24} />
      <Skeleton variant="text" width="60%" height={24} />
    </Stack>
  );
}
