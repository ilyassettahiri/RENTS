'use client';


import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconifyy';

// ----------------------------------------------------------------------

export function OrderDetailsInfo({ customer, delivery, payment, shippingAddress }) {


  const renderDelivery = (
    <>
      <CardHeader
        title="Delivery"

      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Ship by
          </Box>
          {delivery?.shipBy}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Speedy
          </Box>
          {delivery?.speedy}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Tracking No.
          </Box>
          <Link underline="always" color="inherit">
            {delivery?.trackingNumber}
          </Link>
        </Stack>
      </Stack>
    </>
  );

  const renderShipping = (
    <>
      <CardHeader
        title="Shipping"

      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Address
          </Box>
          {shippingAddress?.fullAddress}
        </Stack>

        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Phone number
          </Box>
          {shippingAddress?.phoneNumber}
        </Stack>
      </Stack>
    </>
  );

  const renderPayment = (
    <>
      <CardHeader
        title="Payment"

      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ p: 3, gap: 0.5, typography: 'body2' }}
      >
        {payment?.cardNumber}
        <Iconify icon="logos:mastercard" width={24} />
      </Box>
    </>
  );

  return (
    <Card>



      {renderDelivery}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderShipping}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderPayment}
    </Card>
  );
}


OrderDetailsInfo.propTypes = {
  customer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    email: PropTypes.string.isRequired,
    ipAddress: PropTypes.string,
  }),
  delivery: PropTypes.shape({
    shipBy: PropTypes.string,
    speedy: PropTypes.string,
    trackingNumber: PropTypes.string,
  }),
  payment: PropTypes.shape({
    cardNumber: PropTypes.string,
  }),
  shippingAddress: PropTypes.shape({
    fullAddress: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};
