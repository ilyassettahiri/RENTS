import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

export default function ShippingFormSkeleton() {
  return (
    <Stack spacing={5}>
      <div>
        <Stack spacing={2.5}>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            <Skeleton variant="rectangular" width="100%" height={56} />
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Stack>
          <Skeleton variant="rectangular" width="100%" height={56} />
          <Skeleton variant="rectangular" width="100%" height={56} />
        </Stack>
      </div>
    </Stack>
  );
}
