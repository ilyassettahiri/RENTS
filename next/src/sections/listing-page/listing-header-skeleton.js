'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

const StyledButtonSkeleton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
  marginRight: theme.spacing(1),
}));

export default function ListingHeaderSkeleton() {
  return (
    <Card sx={{ p: 2 }}>
      <Stack spacing={3} direction="row" sx={{ mb: 2 }}>
        <Skeleton variant="text" width="60%" height={40} />
        <Stack direction="row" alignItems="center" flexShrink={0}>
          <IconButton disabled>
            <Skeleton variant="circular" width={40} height={40} />
          </IconButton>
          <Checkbox disabled icon={<Skeleton variant="circular" width={40} height={40} />} />
        </Stack>
      </Stack>

      <Stack spacing={3} direction="row">
        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Skeleton variant="rectangular" width={20} height={20} sx={{ mr: 0.4 }} />
          <Skeleton variant="text" width={100} />
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Skeleton variant="rectangular" width={20} height={20} sx={{ mr: 0.4 }} />
          <Skeleton variant="text" width={100} />
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Skeleton variant="rectangular" width={20} height={20} sx={{ mr: 0.4 }} />
          <Skeleton variant="text" width={100} />
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 3 }} />

      <Stack spacing={3} direction="row">
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 45, height: 45, mr: 1 }} />
          <Stack spacing={0.5}>
            <Skeleton variant="text" width={120} />
            <Skeleton variant="text" width={80} />
          </Stack>
        </Box>

        <Stack direction="row" alignItems="center" flexShrink={0}>
          <StyledButtonSkeleton>
            <Skeleton variant="rectangular" width={24} height={24} />
            <Skeleton variant="text" width={60} sx={{ ml: 1 }} />
          </StyledButtonSkeleton>
          <StyledButtonSkeleton>
            <Skeleton variant="rectangular" width={24} height={24} />
            <Skeleton variant="text" width={60} sx={{ ml: 1 }} />
          </StyledButtonSkeleton>
          <StyledButtonSkeleton>
            <Skeleton variant="rectangular" width={24} height={24} />
            <Skeleton variant="text" width={60} sx={{ ml: 1 }} />
          </StyledButtonSkeleton>
        </Stack>
      </Stack>
    </Card>
  );
}
