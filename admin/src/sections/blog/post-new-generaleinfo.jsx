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

import { createGeneraleInfo } from 'src/actions/blog-ssr'; // Import the createGeneraleInfo function

// ----------------------------------------------------------------------

export const GeneraleInfoSchema = zod.object({
  name: zod.string().optional(),
  address: zod.string().optional(),
  city: zod.string().optional(),
  state: zod.string().optional(),
  country: zod.string().optional(),
  zip: zod.string().optional(),
  phone: zod.string().optional(),
  email: zod.string().email({ message: 'Invalid email address' }).optional(),
  website: zod.string().url({ message: 'Invalid URL' }).optional(),
  facebook: zod.string().url({ message: 'Invalid URL' }).optional(),
  twitter: zod.string().url({ message: 'Invalid URL' }).optional(),
  instagram: zod.string().url({ message: 'Invalid URL' }).optional(),
  linkedin: zod.string().url({ message: 'Invalid URL' }).optional(),
  pinterest: zod.string().url({ message: 'Invalid URL' }).optional(),
  telegram: zod.string().url({ message: 'Invalid URL' }).optional(),
  tiktok: zod.string().url({ message: 'Invalid URL' }).optional(),
  youtube: zod.string().url({ message: 'Invalid URL' }).optional(),
  picture1: zod.string().optional(),
  picture2: zod.string().optional(),
  picture3: zod.string().optional(),
  picture4: zod.string().optional(),
  description: schemaHelper.editor().min(100, { message: 'Description must be at least 100 characters' }).optional(),
});

// ----------------------------------------------------------------------

export function GeneraleInfoForm({ currentGeneraleInfo }) {
  const router = useRouter();
  const preview = useBoolean();

  const defaultValues = useMemo(
    () => ({
      name: currentGeneraleInfo?.name || '',
      address: currentGeneraleInfo?.address || '',
      city: currentGeneraleInfo?.city || '',
      state: currentGeneraleInfo?.state || '',
      country: currentGeneraleInfo?.country || '',
      zip: currentGeneraleInfo?.zip || '',
      phone: currentGeneraleInfo?.phone || '',
      email: currentGeneraleInfo?.email || '',
      website: currentGeneraleInfo?.website || '',
      facebook: currentGeneraleInfo?.facebook || '',
      twitter: currentGeneraleInfo?.twitter || '',
      instagram: currentGeneraleInfo?.instagram || '',
      linkedin: currentGeneraleInfo?.linkedin || '',
      pinterest: currentGeneraleInfo?.pinterest || '',
      telegram: currentGeneraleInfo?.telegram || '',
      tiktok: currentGeneraleInfo?.tiktok || '',
      youtube: currentGeneraleInfo?.youtube || '',
      picture1: currentGeneraleInfo?.picture1 || '',
      picture2: currentGeneraleInfo?.picture2 || '',
      picture3: currentGeneraleInfo?.picture3 || '',
      picture4: currentGeneraleInfo?.picture4 || '',
      description: currentGeneraleInfo?.description || '',
    }),
    [currentGeneraleInfo]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(GeneraleInfoSchema),
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
    if (currentGeneraleInfo) {
      reset(defaultValues);
    }
  }, [currentGeneraleInfo, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentGeneraleInfo) {
        // Create a new generale info
        await createGeneraleInfo(data);
        toast.success('Create success!');
      } else {
        // Update existing generale info logic here (if needed)
        toast.success('Update success!');
      }
      reset();
      preview.onFalse();
      router.push('/dashboard/'); // Adjust this path as necessary
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while creating the generale info');
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader title="Details" subheader="General information..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Name" />
        <Field.Text name="address" label="Address" />
        <Field.Text name="city" label="City" />
        <Field.Text name="state" label="State" />
        <Field.Text name="country" label="Country" />
        <Field.Text name="zip" label="Zip Code" />
        <Field.Text name="phone" label="Phone" />
        <Field.Text name="email" label="Email" />
        <Field.Text name="website" label="Website" />
        <Field.Text name="facebook" label="Facebook" />
        <Field.Text name="twitter" label="Twitter" />
        <Field.Text name="instagram" label="Instagram" />
        <Field.Text name="linkedin" label="LinkedIn" />
        <Field.Text name="pinterest" label="Pinterest" />
        <Field.Text name="telegram" label="Telegram" />
        <Field.Text name="tiktok" label="TikTok" />
        <Field.Text name="youtube" label="YouTube" />
        <Field.Text name="picture1" label="Picture 1" />
        <Field.Text name="picture2" label="Picture 2" />
        <Field.Text name="picture3" label="Picture 3" />
        <Field.Text name="picture4" label="Picture 4" />
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Description</Typography>
          <Field.Editor name="description" sx={{ maxHeight: 480 }} />
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
        {!currentGeneraleInfo ? 'Create generale info' : 'Save changes'}
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
