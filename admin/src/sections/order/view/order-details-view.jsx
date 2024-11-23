'use client';

import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { ORDER_STATUS_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetOrder } from 'src/actions/order';

import { OrderDetailsInfo } from '../order-details-info';
import { OrderDetailsItems } from '../order-details-item';
import { OrderDetailsToolbar } from '../order-details-toolbar';
import { OrderDetailsHistory } from '../order-details-history';

// ----------------------------------------------------------------------

export function OrderDetailsView({ order }) {


  console.log('order data:', order);

  const userAttributes = order?.data?.attributes || {};

  return (
    <DashboardContent>


      <h1>order Details</h1>
      {Object.entries(userAttributes).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value || 'N/A'}
        </p>
      ))}

    </DashboardContent>
  );
}
