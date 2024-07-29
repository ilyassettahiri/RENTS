import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';
import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { createBlogTag } from 'src/actions/blog-ssr'; // Import the createBlogTag function

// ----------------------------------------------------------------------

export const BlogTagSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
});

// ----------------------------------------------------------------------

export function BlogTagForm({ currentTag }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: currentTag?.name || '',
    }),
    [currentTag]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(BlogTagSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  useEffect(() => {
    if (currentTag) {
      reset(defaultValues);
    }
  }, [currentTag, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentTag) {
        // Create a new blog tag
        await createBlogTag(data);
        toast.success('Tag created successfully!');
      } else {
        // Update existing tag logic here (if needed)
        toast.success('Tag updated successfully!');
      }
      reset();
      router.push('/dashboard/');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while creating the tag');
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader title=" Create Tag " subheader="Name..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Tag Name" />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="flex-end">
      <div>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentTag ? 'Create tag' : 'Save changes'}
        </LoadingButton>
      </div>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto',mb:5, maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}

        {renderActions}
      </Stack>
    </Form>
  );
}
