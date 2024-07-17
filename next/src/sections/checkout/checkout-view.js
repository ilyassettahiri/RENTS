'use client';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, useCallback, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import CrudService from 'src/services/cruds-service';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import FormProvider from 'src/components/hook-form';

import CheckOutSummary from './check-out-summary';
import CheckOutPaymentForm from './check-out-payment-form';
import CheckOutShippingForm from './check-out-shipping-form';

// ----------------------------------------------------------------------

export default function CheckoutView({ params }) {
  const router = useRouter();

  const { category, url } = params;

  const [data, setData] = useState(null);

  const sameBilling = useBoolean();

  const [departureDay, setDepartureDay] = useState([null, null]);

  useEffect(() => {
    (async () => {
      try {
        console.log('Fetching data for:', category, url); // Logging before fetching
        const response = await CrudService.getReservationFront(category, url);
        console.log('Response data:', response.data); // Logging the response
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch listing:', error);
        setData({ attributes: { title: 'Error', price: 0, picture: '', category: '', url: '' } }); // Fallback data
      }
    })();
  }, [category, url]);

  useEffect(() => {
    const storedStartDate = sessionStorage.getItem('startDate');
    const storedEndDate = sessionStorage.getItem('endDate');
    if (storedStartDate && storedEndDate) {
      setDepartureDay([new Date(storedStartDate), new Date(storedEndDate)]);
    }
  }, []);

  const CheckoutSchema = Yup.object().shape({
    billingAddress: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required').email('Email is invalid'),
      fullAddress: Yup.string().required('Full address is required'),
    }),
  });

  const defaultValues = {
    billingAddress: {
      name: '',
      email: '',
      fullAddress: '',
      fullAddress2: '',
    },
    shippingAddress: {
      firstName: '',
      lastName: '',
      fullAddress: '',
      fullAddress2: '',
    },
    paymentMethods: {
      methods: 'paypal',
      card: {
        cardNumber: '',
        cardHolder: '',
        expirationDate: '',
        ccv: '',
      },
    },
  };

  const methods = useForm({
    resolver: yupResolver(CheckoutSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const payload = {
        ...formData.billingAddress,
        reservationstart: departureDay[0].toISOString(),
        reservationsend: departureDay[1].toISOString(),
      };

      // Send data to the backend using createReservationFront method
      const response = await CrudService.createReservationFront(payload, category, url);

      const checkout_id = response.data.attributes.checkout_id;

      // Reset the form and navigate to the order completed page
      reset();
      router.push(`${paths.travel.orderCompleted}/${checkout_id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  const handleChangeDepartureDay = useCallback((newValue) => {
    setDepartureDay(newValue);
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 8, md: 15 },
        paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },
      }}
    >
      <Typography variant="h2" sx={{ mb: 5 }}>
        Confirm and Pay
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={7}>
            <Stack>
              <StepLabel title="Shipping Information" step="1" />

              <CheckOutShippingForm
                sameBilling={sameBilling.value}
                onChangeSameBilling={sameBilling.onToggle}
              />

              <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

              <StepLabel title="Payment Methods" step="2" />

              <CheckOutPaymentForm />
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            <CheckOutSummary
              tour={data}
              departureDay={departureDay}
              isSubmitting={isSubmitting}
              onChangeDepartureDay={handleChangeDepartureDay}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

CheckoutView.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

// ----------------------------------------------------------------------

function StepLabel({ step, title }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h5' }}>
      <Box
        sx={{
          mr: 1.5,
          width: 28,
          height: 28,
          flexShrink: 0,
          display: 'flex',
          typography: 'h6',
          borderRadius: '50%',
          alignItems: 'center',
          bgcolor: 'primary.main',
          justifyContent: 'center',
          color: 'primary.contrastText',
        }}
      >
        {step}
      </Box>
      {title}
    </Stack>
  );
}

StepLabel.propTypes = {
  step: PropTypes.string,
  title: PropTypes.string,
};
