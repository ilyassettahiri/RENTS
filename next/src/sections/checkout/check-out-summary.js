import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { inputBaseClasses } from '@mui/material/InputBase';
import InputAdornment, { inputAdornmentClasses } from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import { useResponsive } from 'src/hooks/use-responsive';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

import FilterTime from 'src/sections/components/listings/filters/filter-time';

// ----------------------------------------------------------------------

export default function TravelCheckOutSummary({
  tour,
  discount,
  departureDay,
  isSubmitting,
  onChangeDepartureDay,
  onApplyDiscount
}) {
  const smUp = useResponsive('up', 'sm');

  console.log('Tour data:', tour); // Log the tour data to verify

  if (!tour) {
    return <div>Loading...</div>; // Add a loading state
  }

  const { attributes } = tour;
  if (!attributes) {
    return <div>Loading...</div>; // Add a loading state if attributes is not yet available
  }

  const { title, price, picture, category, url } = attributes;

  const ratingNumber = 5;
  const totalReviews = 100;

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
          <Avatar
            variant="rounded"
            alt={title}
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${picture}`}
            sx={{ width: 80, height: 80 }}
          />

          <Stack spacing={0.5}>
            <Typography noWrap variant="h5" sx={{ maxWidth: 240 }}>
              {title}

            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              sx={{ typography: 'body2', color: 'text.secondary' }}
            >
                  <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />

                  <Box sx={{ typography: 'h6' }}>
                    {Number.isInteger(ratingNumber) ? `${ratingNumber}.0` : ratingNumber}
                  </Box>

                  {totalReviews && (
                    <Link variant="body2" sx={{ color: 'text.secondary' }}>
                      ({fShortenNumber(totalReviews)} reviews)
                    </Link>
                  )}


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
            <Iconify icon="carbon:events" width={24} />

            <Stack spacing={0.5}>
              <Typography variant="caption">Departure day</Typography>

              <FilterTime
                departureDay={departureDay}
                onChangeDepartureDay={onChangeDepartureDay}
                sx={{
                  [`& .${inputBaseClasses.input}`]: {
                    typography: 'subtitle1',
                  },
                  [`& .${inputAdornmentClasses.root}`]: {
                    display: 'none',
                  },
                }}
              />
            </Stack>
          </Stack>

          {smUp && <Divider flexItem orientation="vertical" sx={{ borderStyle: 'dashed' }} />}

          <Stack direction="row" spacing={1.5} sx={{ width: 1 }}>
            <Iconify icon="carbon:calendar" width={24} />

            <Stack spacing={0.5}>
              <Typography variant="caption">Guests</Typography>
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
          <Typography component="span" variant="subtitle2">
            {fCurrency(price)}
          </Typography>
        </Box>

        <Box display="flex">
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            Discount
          </Typography>
          <Typography component="span" variant="subtitle2">
            {discount ? fCurrency(-discount) : '-'}
          </Typography>
        </Box>



        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box display="flex">
          <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
            Total
          </Typography>

          <Box sx={{ textAlign: 'right' }}>
            <Typography
              component="span"
              variant="subtitle1"
              sx={{ display: 'block', color: 'error.main' }}
            >
              {fCurrency(price - discount)}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              (VAT included if applicable)
            </Typography>
          </Box>
        </Box>

        {onApplyDiscount && (
          <TextField
            fullWidth
            placeholder="Discount codes / Gifts"
            value="DISCOUNT5"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button color="primary" onClick={() => onApplyDiscount(5)} sx={{ mr: -0.5 }}>
                    Apply
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        )}
        </Stack>







      </Stack>


      <Stack spacing={3} sx={{ p: 3 }}>


        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          loading={isSubmitting}
        >
          Complete Booking
        </LoadingButton>
      </Stack>
    </Card>
  );
}

TravelCheckOutSummary.propTypes = {
  isSubmitting: PropTypes.bool,
  onChangeDepartureDay: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  discount: PropTypes.number.isRequired,

  departureDay: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  tour: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      picture: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
