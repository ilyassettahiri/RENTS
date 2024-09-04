'use client';

import { useState, useEffect, useCallback,useMemo   } from 'react';
import CrudService from "src/services/cruds-service";
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { paths } from 'src/routes/paths';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';


import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { OrderDetailsInfo } from 'src/sections/reservation-detail/order-details-info';
import { OrderDetailsItems } from 'src/sections/reservation-detail/order-details-item';
import { OrderDetailsHistory } from 'src/sections/reservation-detail/order-details-history';


export default function DashboardReservationPage({ params }) {

  const { id } = params;


  const { data: orderData, isLoading: isOrderLoading, error: orderError } = useQuery({
    queryKey: ['order', id], // Including id in queryKey for caching
    queryFn: () => CrudService.getReservation(id), // Assuming getReservation accepts id as parameter
    onError: (error) => {
      console.error('Failed to fetch order data:', error);
    },
  });




  // Log orderData whenever it changes
  useEffect(() => {
    if (orderData) {
      console.log('Fetched Order Data:', orderData);
    }
  }, [orderData]);

  // Memorize processed orderData
  const memoizedOrderData = useMemo(() => {
    if (!orderData) return null;

    return {
      id: orderData.id,
      details: orderData.attributes,
      customer: {
        name: orderData.data.attributes.name,
        avatarUrl: orderData.data.attributes.picture, // Assuming you have a picture field
      },
      items: [
        {
          id: orderData.id,
          name: orderData.data.attributes.title,
          price: orderData.data.attributes.price,
          quantity: 1, // Assuming 1 item for this example
          coverUrl: orderData.data.attributes.picture, // Assuming picture is coverUrl for item
        },
      ],
      history: {
        timeline: [
          {
            title: 'Reservation Start',
            time: orderData.data.attributes.reservationstart,
          },
          {
            title: 'Reservation End',
            time: orderData.data.attributes.reservationsend,
          },
        ],
      },
    };
  }, [orderData]);



  const [status, setStatus] = useState(memoizedOrderData?.status);

  const handleChangeStatus = useCallback((newValue) => {
    setStatus(newValue);
  }, []);


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Reservations
      </Typography>





      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <OrderDetailsItems
              items={memoizedOrderData?.items}
              taxes={0} // Assuming no taxes for now
              shipping={0} // Assuming no shipping cost
              discount={0} // Assuming no discount
              subtotal={memoizedOrderData?.items[0]?.price}
              totalAmount={memoizedOrderData?.items[0]?.price}
            />

            <OrderDetailsHistory history={memoizedOrderData?.history} />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
         <OrderDetailsInfo
            customer={memoizedOrderData?.customer}
            delivery={null} // Delivery info is not provided in fetched data
            payment={null} // Payment info is not provided in fetched data
            shippingAddress={null} // Shipping info is not provided in fetched data
          />
        </Grid>
      </Grid>


    </LocalizationProvider>
  );
}


DashboardReservationPage.propTypes = {
  params: PropTypes.shape({

    id: PropTypes.number.isRequired,
  }).isRequired,
};
