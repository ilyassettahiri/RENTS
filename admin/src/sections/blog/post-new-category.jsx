import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { createBlogCategory } from 'src/actions/blog-ssr'; // Import the createBlogCategory function

// ----------------------------------------------------------------------

export const BlogCategorySchema = zod.object({
  name: zod.string().min(1, { message: 'name is required!' }),
  thumb: schemaHelper.file({ message: { required_error: 'Cover is required!' } }),
});

// ----------------------------------------------------------------------

export function BlogCategoryForm({ currentCategory }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: currentCategory?.name || '',
      thumb: currentCategory?.thumb || null,
    }),
    [currentCategory]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(BlogCategorySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentCategory) {
      reset(defaultValues);
    }
  }, [currentCategory, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentCategory) {
        // Create a new Category
        await createBlogCategory(data);
        toast.success('Create success!');
      } else {
        // Update existing Category logic here (if needed)
        toast.success('Update success!');
      }
      reset();
      router.push('/dashboard/');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while creating the Category');
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('thumb', null);
  }, [setValue]);

  const renderDetails = (
    <Card>
      <CardHeader title="Create Category" subheader="Title and cover image..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Category name" />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Cover</Typography>
          <Field.Upload name="thumb" maxSize={3145728} onDelete={handleRemoveFile} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="flex-end">
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        sx={{ ml: 2 }}
      >
        {!currentCategory ? 'Create Category' : 'Save changes'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto', mb:5, maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}
        {renderActions}
      </Stack>
    </Form>
  );
}
