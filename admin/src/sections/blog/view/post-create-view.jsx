'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostNewEditForm } from '../post-new-edit-form';

import { BlogCategoryForm } from '../post-new-category';
import { BlogTagForm } from '../post-new-tag';

import { AuthorForm } from '../post-new-author';

import { PolicyPageForm } from '../post-new-policypage';

import { GeneraleInfoForm } from '../post-new-generaleinfo';

import { AboutForm } from '../post-new-about';





// ----------------------------------------------------------------------

export function PostCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new post"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Blog', href: paths.dashboard.post.root },
          { name: 'Create' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

          <PostNewEditForm />


          <BlogCategoryForm />


          <BlogTagForm />

          <AuthorForm />

          <PolicyPageForm />

          <GeneraleInfoForm />

          <AboutForm />





    </DashboardContent>
  );
}
