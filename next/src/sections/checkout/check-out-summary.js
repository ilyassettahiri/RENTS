'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';

import PropTypes from 'prop-types';
import CrudService from 'src/services/cruds-service';

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
import ProductPriceSample from 'src/sections/store/common/product-price-sample';
import ProductPrice from 'src/sections/store/common/product-price';
import { capitalizeFirstLetter } from 'src/utils/format-time';

import TextField from '@mui/material/TextField';

import { useResponsive } from 'src/hooks/use-responsive';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

import FilterTime from 'src/sections/components/listings/filters/filter-time';

// ----------------------------------------------------------------------

export default function CheckOutSummary({
  tour,
  departureDay,
  isSubmitting,

  setDepartureDay,
}) {
  const smUp = useResponsive('up', 'sm');


  const { attributes } = tour || {};
  const { title, price, picture, url, per } = attributes || {};

  const [discountCode, setDiscountCode] = useState(''); // State for the discount code input
  const [discountValue, setDiscountValue] = useState(0); // State to store the discount percentage
  const [error, setError] = useState(null); // State to store any errors

  const [subtotal, setSubtotal] = useState(price || 0); // State for subtotal
  const [discountedPrice, setDiscountedPrice] = useState(subtotal); // State for discounted price

  const handleChangeDepartureDay = useCallback(
    (newValue) => {
      setDepartureDay(newValue);
    },
    [setDepartureDay]
  );


  useEffect(() => {
    if (!departureDay[0] || !departureDay[1]) {
      return; // Skip calculation if dates are not selected
    }

    const days =
      Math.ceil((departureDay[1] - departureDay[0]) / (1000 * 60 * 60 * 24)) || 1;

    const calculatedSubtotal = price * days;
    setSubtotal(calculatedSubtotal);
    setDiscountedPrice(calculatedSubtotal - (calculatedSubtotal * discountValue) / 100);
  }, [departureDay, discountValue, price]);


  const applyDiscount = useCallback(async () => {
    const formData = new FormData();
    formData.append('discount_code', discountCode);
    formData.append('url', url);

    try {
      const response = await CrudService.checkDiscountFront(formData);
      setDiscountValue(response.discount_value || 0);
      setError(null);
    } catch (err) {
      setDiscountValue(0);
      setError(err.response?.data?.error || 'An error occurred');
    }
  }, [discountCode, url]);


  if (!tour) {
    return <div>Loading...</div>; // Add a loading state
  }

  if (!attributes) {
    return <div>Loading...</div>; // Add a loading state if attributes is not yet available
  }








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









        <Stack spacing={4} direction={{ xs: 'row', md: 'row' }} >




            <Box
              sx={{
                flexGrow:  1,
                gap: 1,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                  md: 'repeat(1, 1fr)',
                  lg: 'repeat(1, 1fr)',
                },
              }}
            >



              <Stack spacing={1} direction="row" alignItems="center">
                <Avatar
                  variant="rounded"
                  alt={title}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_LISTING_SMALL}${picture}`}
                  sx={{ width: 80, height: 80 }}
                />

                <Stack spacing={0}>





                    <TextMaxLine variant="subtitle2" line={1}>

                      {capitalizeFirstLetter(title)}
                    </TextMaxLine>



                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ typography: 'body2', color: 'text.secondary' }}
                  >



                        <Box sx={{ typography: 'caption' }}>

                          <ProductPrice

                            price={price}

                            per={per}
                            sx={{ typography: 'caption' }}

                          />

                        </Box>



                  </Stack>
                </Stack>

              </Stack>

            </Box>










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
                onChangeDepartureDay={handleChangeDepartureDay}
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
          <ProductPriceSample

                    price={subtotal}


                    sx={{ typography: 'subtitle1' }}

          />
        </Box>

          <Box display="flex">
            <Typography component="span" variant="body2" sx={{ flexGrow: 1, color: 'text.secondary' }}>
              Discount
            </Typography>
            <Typography component="span" variant="subtitle2">
              {discountValue ? `${discountValue}%` : '-'}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box display="flex">
            <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
              Total
            </Typography>
            <Box sx={{ textAlign: 'right' }}>
                <ProductPriceSample
                  price={discountedPrice} // Total: Subtotal - (Subtotal × discount%)
                  sx={{ typography: 'subtitle1', color: 'error.main' }}
                />
            </Box>
          </Box>

          <TextField
            fullWidth
            placeholder="Discount codes / Gifts"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button color="primary" onClick={applyDiscount}>
                    Apply
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
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

CheckOutSummary.propTypes = {
  isSubmitting: PropTypes.bool,

  setDepartureDay: PropTypes.func.isRequired,
  departureDay: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  tour: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      picture: PropTypes.string.isRequired,
      per: PropTypes.string.isRequired,

      category: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
