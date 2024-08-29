import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function PostHeroSkeleton() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 20,
        position: 'relative',
        ...bgGradient({
          startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
          endColor: `${theme.palette.common.black} 75%`,
          imgUrl: '', // Empty URL to maintain background gradient structure
        }),
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Stack
              spacing={3}
              alignItems={{
                xs: 'center',
                md: 'flex-start',
              }}
              sx={{
                color: 'common.white',
                textAlign: {
                  xs: 'center',
                  md: 'left',
                },
              }}
            >
              {/* Actor Skeleton */}
              <Skeleton variant="text" width={120} sx={{ bgcolor: 'grey.800', opacity: 0.72 }} />

              {/* Title Skeleton */}
              <Skeleton
                variant="rectangular"
                width={300}
                height={40}
                sx={{ bgcolor: 'grey.800', borderRadius: 1 }}
              />

              {/* Date Skeleton */}
              <Skeleton variant="text" width={180} sx={{ bgcolor: 'grey.800', opacity: 0.72 }} />

              {/* Social Icons Skeleton */}
              <Stack direction="row" spacing={1}>
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} variant="circular" width={40} height={40} sx={{ bgcolor: 'grey.800' }} />
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
