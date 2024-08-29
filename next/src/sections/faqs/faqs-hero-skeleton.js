import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SupportHeroSkeleton() {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/illustrations/illustration_courses_hero.svg`,
        }),
        py: 15,
        px: 2.5,
        alignItems: 'center',
      }}
    >
      <Skeleton variant="text" width={250} height={60} sx={{ mb: 5, bgcolor: 'grey.800' }} />

      <TextField
        fullWidth
        hiddenLabel
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="carbon:search" width={24} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
          sx: { color: 'common.white' },
        }}
        sx={{ maxWidth: 366 }}
      />
    </Stack>
  );
}
