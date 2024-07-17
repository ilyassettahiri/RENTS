'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { paths } from 'src/routes/paths';
import { fCurrency } from 'src/utils/format-number';
import FilterTime from 'src/sections/components/listings/filters/filter-time';
import FilterGuests from 'src/sections/components/listings/filters/filter-guests';

export default function ListingForm({ tour }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { attributes } = tour;
  const { price, category, url, startdate, enddate, reservations } = attributes;

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
  });

  const disabledDateRanges = reservations.map(reservation => ({
    start: new Date(reservation.start),
    end: new Date(reservation.end)
  }));

  const handleChangeDepartureDay = useCallback((newValue) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      setStartDate(newValue[0] ? newValue[0].toISOString() : null);
      setEndDate(newValue[1] ? newValue[1].toISOString() : null);
      console.log(newValue[0], newValue[1]); // Ensure these are logged for debugging
    } else {
      console.error('Invalid date range value');
    }
  }, []);

  const handleIncrementGuests = useCallback(
    (guest) => {
      setGuests((prevGuests) => ({
        ...prevGuests,
        [guest]: prevGuests[guest] + 1
      }));
    },
    []
  );

  const handleDecreaseGuests = useCallback(
    (guest) => {
      setGuests((prevGuests) => ({
        ...prevGuests,
        [guest]: prevGuests[guest] - 1
      }));
    },
    []
  );

  return (
    <Card>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1} direction="row" alignItems="center" sx={{ typography: 'h4' }}>
          {fCurrency(price)}
          <Typography variant="body2" component="span" sx={{ color: 'text.disabled', ml: 1 }}>
            /Tour
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          <FilterTime
            departureDay={[startDate, endDate]}
            onChangeDepartureDay={handleChangeDepartureDay}
            minDate={new Date(startdate)}
            maxDate={new Date(enddate)}
            disabledDateRanges={disabledDateRanges}
            sx={{
              px: 1.5,
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
            }}
          />

          <Box
            sx={{
              py: 0.5,
              px: 1.5,
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
            }}
          >
            <FilterGuests
              guests={guests}
              onDecreaseGuests={handleDecreaseGuests}
              onIncrementGuests={handleIncrementGuests}
            />
          </Box>
        </Stack>

        <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Service charge
          </Typography>
        </Stack>

        <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Discount
          </Typography>
          <Typography variant="body2"> - </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Total</Typography>
        </Stack>

        <Link href={`${paths.travel.checkout}/${category}/${url}`}>
          <Button
            size="large"
            variant="contained"
            color="inherit"
            onClick={() => {
              sessionStorage.setItem('startDate', startDate);
              sessionStorage.setItem('endDate', endDate);
            }}
          >
            Reserve
          </Button>
        </Link>
      </Stack>
    </Card>
  );
}

ListingForm.propTypes = {
  tour: PropTypes.shape({
    attributes: PropTypes.shape({
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      startdate: PropTypes.string.isRequired,
      enddate: PropTypes.string.isRequired,
      reservations: PropTypes.arrayOf(
        PropTypes.shape({
          start: PropTypes.string.isRequired,
          end: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
