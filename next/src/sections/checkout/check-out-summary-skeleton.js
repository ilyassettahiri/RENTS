import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

export default function CheckOutSummarySkeleton() {
  return (
    <Card>
      <Box
        sx={{
          p: 4,
          pb: 0,
          gap: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(1, 1fr)',
            lg: 'repeat(2, 1fr)',
          },
        }}
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Skeleton variant="rounded" width={80} height={80} />

          <Stack spacing={0.5}>
            <Skeleton variant="text" width={240} height={30} />

            <Stack
              direction="row"
              alignItems="center"
              sx={{ typography: 'body2', color: 'text.secondary' }}
            >
              <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
              <Skeleton variant="text" width={40} />
              <Skeleton variant="text" width={60} sx={{ ml: 1 }} />
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Divider sx={{ borderStyle: 'dashed', mt: 2.5 }} />

      <Stack sx={{ p: 4, pb: 3 }}>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            p: 2.5,
            borderRadius: 2,
            color: 'text.disabled',
            bgcolor: 'background.neutral',
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ width: 1 }}>
            <Skeleton variant="rectangular" width={24} height={24} />

            <Stack spacing={0.5}>
              <Typography variant="caption">Departure day</Typography>
              <Skeleton variant="text" width="100%" height={40} />
            </Stack>
          </Stack>

          <Divider flexItem orientation="vertical" sx={{ borderStyle: 'dashed' }} />

          <Stack direction="row" spacing={1.5} sx={{ width: 1 }}>
            <Skeleton variant="rectangular" width={24} height={24} />

            <Stack spacing={0.5}>
              <Typography variant="caption">Guests</Typography>
              <Skeleton variant="text" width="100%" height={40} />
            </Stack>
          </Stack>
        </Stack>

        <Stack spacing={2} sx={{ pt: 3 }}>
          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              Sub total
            </Typography>
            <Skeleton variant="text" width={80} />
          </Box>

          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              Discount
            </Typography>
            <Skeleton variant="text" width={80} />
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box display="flex">
            <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
              Total
            </Typography>

            <Box sx={{ textAlign: 'right' }}>
              <Skeleton variant="text" width={100} />
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (VAT included if applicable)
              </Typography>
            </Box>
          </Box>

          <TextField
            fullWidth
            placeholder="Discount codes / Gifts"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button color="primary" sx={{ mr: -0.5 }}>
                    Apply
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>

      <Stack spacing={3} sx={{ p: 3 }}>
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          color="inherit"
          loading
        >
          Complete Booking
        </LoadingButton>
      </Stack>
    </Card>
  );
}
