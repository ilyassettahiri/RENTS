'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useGetReview } from 'src/actions/review';

import { ProductNewEditForm } from 'src/sections/product/product-new-edit-form';

// ----------------------------------------------------------------------

export function ReviewEditView({ review }) {





  console.log('review data:', review);

  const userAttributes = review?.data?.attributes || {};

  return (
    <DashboardContent>


      <h1>review Details</h1>
      {Object.entries(userAttributes).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value ? value : 'N/A'}
        </p>
      ))}

    </DashboardContent>
  );


}
