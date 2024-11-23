'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductNewEditForm } from 'src/sections/product/product-new-edit-form';
import { useGetCustomer } from 'src/actions/customer';

// ----------------------------------------------------------------------

export function CustomerEditView({ customer }) {




  console.log('customer data:', customer);

  const userAttributes = customer?.data?.attributes || {};

  return (
    <DashboardContent>


      <h1>customer Details</h1>
      {Object.entries(userAttributes).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value || 'N/A'}
        </p>
      ))}

    </DashboardContent>
  );


}
