'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useGetProduct } from 'src/actions/product';

import { ProductNewEditForm } from '../product-new-edit-form';

// ----------------------------------------------------------------------

export function ProductEditView({ product }) {


  console.log('product data:', product);

  const userAttributes = product?.data?.attributes || {};

  return (
    <DashboardContent>


      <h1>product Details</h1>
      {Object.entries(userAttributes).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value ? value : 'N/A'}
        </p>
      ))}

    </DashboardContent>
  );
}
