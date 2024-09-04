'use client';

import { useState, useEffect, useCallback } from "react";
import CrudService from "src/services/cruds-service";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


import EcommerceAccountPaymentCard from '../components/dashboard/account/dashboard-payment-card';
import EcommerceAccountNewCardForm from '../components/dashboard/account/dashboard-new-card-form';

// ----------------------------------------------------------------------

const CARD_OPTIONS = [
  {
    id: 1,
    value: 'paypal',
    label: 'Paypal',
    cardNumber: '2904 1902 1802 1234',
    cardHolder: 'ilyass ettahiri',
    expirationDate: '08/24',
    isPrimary: false,
  },
  {
    id: 2,
    value: 'mastercard',
    label: 'Mastercard',
    cardNumber: '2904 1902 1802 5678',
    cardHolder: 'ilyass ettahiri',
    expirationDate: '08/24',
    isPrimary: true,
  },
  {
    id: 3,
    value: 'visa',
    label: 'Visa',
    cardNumber: '2904 1902 1802 7890',
    cardHolder: 'ilyass ettahiri',
    expirationDate: '08/24',
    isPrimary: false,
  },
];

// ----------------------------------------------------------------------

export default function DashboardPaymentView() {





  const [data, setData] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getPaymentfronts();

        setData(response.data);

        console.log('Response data:', response.data); // Logging the response


      } catch (error) {
        console.error('Failed to fetch Home:', error);
      }
    })();
  }, []);







  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Typography variant="h5">Payment Method</Typography>

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          {CARD_OPTIONS.map((card) => (
            <EcommerceAccountPaymentCard key={card.id} card={card} />
          ))}
        </Box>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

      <Stack spacing={3}>
        <Typography variant="h5">Add New Card</Typography>

        <EcommerceAccountNewCardForm />

        <Button color="primary" size="large" variant="contained" sx={{ alignSelf: 'flex-end' }}>
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
