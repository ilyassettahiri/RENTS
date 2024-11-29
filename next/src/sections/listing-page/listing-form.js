'use client';

import { useState, useCallback , useMemo} from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';


import { paths as getPaths } from 'src/routes/paths';
import { fCurrency } from 'src/utils/format-number';
import ProductPrice from 'src/sections/store/common/product-price';
import ProductPriceSample from 'src/sections/store/common/product-price-sample';


import FilterTime from 'src/sections/components/listings/filters/filter-time';
import FilterGuests from 'src/sections/components/listings/filters/filter-guests';

export default function ListingForm({ tour }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { t } = useTranslation();

  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);

  const { attributes } = tour;
  const { price,per, category, url, startdate, enddate, reservations } = attributes;




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
      if (guest === 'children') {
        setGuests({ ...guests, children: guests.children + 1 });
      } else {
        setGuests({ ...guests, adults: guests.adults + 1 });
      }
    },
    [guests]
  );

  const handleDecreaseGuests = useCallback(
    (guest) => {
      if (guest === 'children') {
        setGuests({ ...guests, children: guests.children - 1 });
      } else {
        setGuests({ ...guests, adults: guests.adults - 1 });
      }
    },
    [guests]
  );

  const totalDays = startDate && endDate ? (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) : 0;
  const totalPrice = totalDays * price;

  return (
    <Card>
      <Stack spacing={3} sx={{ px: 1.5, py: 2 }}>



              <ProductPrice

                price={price}

                per={per}
                sx={{ typography: 'h4' }}

              />



        <Stack spacing={1.5}>
          <FilterTime
            departureDay={[startDate, endDate]}
            onChangeDepartureDay={handleChangeDepartureDay}
            minDate={new Date(startdate)}
            maxDate={new Date(enddate)}
            disabledDateRanges={disabledDateRanges}
            sx={{

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
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      <Stack spacing={3} sx={{ p: 2,  }}>
        {startDate && endDate && (
          <>
            <Box display="flex">
              <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>

                {t('TotalDays')}
              </Typography>

              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  sx={{ display: 'block', color: 'error.main' }}
                >
                  {totalDays} {t('Day')}
                </Typography>
              </Box>
            </Box>

            <Box display="flex">
              <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>

                {t('Total')}
              </Typography>

              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  sx={{ display: 'block', color: 'error.main' }}
                >




                  <ProductPriceSample

                    price={totalPrice}


                    sx={{ typography: 'subtitle1' }}

                  />

                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  (VAT included if applicable)
                </Typography>
              </Box>
            </Box>
          </>
        )}

        <Button
          href={`${paths.travel.checkout}/${category}/${url}`}
          size="large"
          variant="contained"
          color="primary"
          onClick={() => {
            sessionStorage.setItem('startDate', startDate);
            sessionStorage.setItem('endDate', endDate);
          }}
        >

          {t('Reserve')} ( <ProductPrice

                price={price}

                per={per}
                sx={{ typography: 'body2' }}

                /> )
        </Button>
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
      per: PropTypes.string.isRequired,

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
