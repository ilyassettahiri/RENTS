'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useGetReview } from 'src/actions/review';

import { ProductNewEditForm } from 'src/sections/product/product-new-edit-form';

// ----------------------------------------------------------------------

export function ReviewEditView({ review }) {

  console.log('review data:', review);


  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Review', href: paths.dashboard.review.root },
          { name: review?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProductNewEditForm currentProduct={review} />
    </DashboardContent>
  );
}
