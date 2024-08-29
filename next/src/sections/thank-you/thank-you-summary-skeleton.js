import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ThankYouSummarySkeleton() {
  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      {/* Skeleton for ThankYouInfo */}
      <Skeleton variant="rectangular" width="100%" height={80} />

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* Skeleton for Line Items */}
      <LineItemSkeleton />
      <LineItemSkeleton />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <LineItemSkeleton />
      <LineItemSkeleton />
      <LineItemSkeleton />
      <LineItemSkeleton />
    </Stack>
  );
}

// ----------------------------------------------------------------------

function LineItemSkeleton() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ typography: 'body2', color: 'text.secondary' }}
    >
      {/* Icon Skeleton */}
      <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
      {/* Label Skeleton */}
      <Skeleton variant="text" width="30%" height={24} />
      {/* Value Skeleton */}
      <Typography
        variant="subtitle2"
        sx={{ color: 'text.primary', flexGrow: 1, textAlign: 'right' }}
      >
        <Skeleton variant="text" width="20%" height={24} />
      </Typography>
    </Stack>
  );
}
