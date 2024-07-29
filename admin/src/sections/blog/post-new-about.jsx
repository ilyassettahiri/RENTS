import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { createAbout } from 'src/actions/blog-ssr'; // Import the createAbout function

// ----------------------------------------------------------------------

export const AboutSchema = zod.object({
  large_picture: zod.string().optional(),
  profile_picture: zod.string().optional(),
  title: zod.string().optional(),
  content: schemaHelper.editor().min(100, { message: 'Content must be at least 100 characters' }).optional(),
  job: zod.number().int().optional(),
  successful_hiring: zod.number().int().optional(),
  partner: zod.number().int().optional(),
  employee: zod.number().int().optional(),
});

// ----------------------------------------------------------------------

export function AboutForm({ currentAbout }) {
  const router = useRouter();
  const preview = useBoolean();

  const defaultValues = useMemo(
    () => ({
      large_picture: currentAbout?.large_picture || '',
      profile_picture: currentAbout?.profile_picture || '',
      title: currentAbout?.title || '',
      content: currentAbout?.content || '',
      job: currentAbout?.job || 0,
      successful_hiring: currentAbout?.successful_hiring || 0,
      partner: currentAbout?.partner || 0,
      employee: currentAbout?.employee || 0,
    }),
    [currentAbout]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(AboutSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentAbout) {
      reset(defaultValues);
    }
  }, [currentAbout, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentAbout) {
        // Create a new about
        await createAbout(data);
        toast.success('Create success!');
      } else {
        // Update existing about logic here (if needed)
        toast.success('Update success!');
      }
      reset();
      preview.onFalse();
      router.push('/dashboard/'); // Adjust this path as necessary
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while creating the about');
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader title="Details" subheader="About information..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="large_picture" label="Large Picture" />
        <Field.Text name="profile_picture" label="Profile Picture" />
        <Field.Text name="title" label="Title" />
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Content</Typography>
          <Field.Editor name="content" sx={{ maxHeight: 480 }} />
        </Stack>
        <Field.Text name="job" label="Job" type="number" />
        <Field.Text name="successful_hiring" label="Successful Hiring" type="number" />
        <Field.Text name="partner" label="Partner" type="number" />
        <Field.Text name="employee" label="Employee" type="number" />
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
        {!currentAbout ? 'Create about' : 'Save changes'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto', mb: 5, maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}
        {renderActions}
      </Stack>
    </Form>
  );
}
