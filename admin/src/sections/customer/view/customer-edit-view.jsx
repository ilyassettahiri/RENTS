'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductNewEditForm } from 'src/sections/product/product-new-edit-form';
import { useGetCustomer } from 'src/actions/customer';

// ----------------------------------------------------------------------

export function CustomerEditView({ customer }) {

  console.log('customer data:', customer);


  return (
    <DashboardContent/>



  );
}
