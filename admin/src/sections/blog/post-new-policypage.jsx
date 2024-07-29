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

import { createPolicyPage } from 'src/actions/blog-ssr'; // Import the createPolicyPage function

// ----------------------------------------------------------------------

export const PolicyPageSchema = zod.object({
  privacy: schemaHelper.editor().min(100, { message: 'Privacy Policy must be at least 100 characters' }),
  termcondition: schemaHelper.editor().min(100, { message: 'Terms and Conditions must be at least 100 characters' }),
});

// ----------------------------------------------------------------------

export function PolicyPageForm({ currentPolicyPage }) {
  const router = useRouter();
  const preview = useBoolean();

  const defaultValues = useMemo(
    () => ({
      privacy: currentPolicyPage?.privacy || '',
      termcondition: currentPolicyPage?.termcondition || '',
    }),
    [currentPolicyPage]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(PolicyPageSchema),
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
    if (currentPolicyPage) {
      reset(defaultValues);
    }
  }, [currentPolicyPage, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentPolicyPage) {
        // Create a new policy page
        await createPolicyPage(data);
        toast.success('Create success!');
      } else {
        // Update existing policy page logic here (if needed)
        toast.success('Update success!');
      }
      reset();
      preview.onFalse();
      router.push('/dashboard/');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while creating the policy page');
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader title="Details" subheader="Privacy, terms and conditions..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Privacy Policy</Typography>
          <Field.Editor name="privacy" sx={{ maxHeight: 480 }} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Terms and Conditions</Typography>
          <Field.Editor name="termcondition" sx={{ maxHeight: 480 }} />
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
        {!currentPolicyPage ? 'Create policy page' : 'Save changes'}
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
