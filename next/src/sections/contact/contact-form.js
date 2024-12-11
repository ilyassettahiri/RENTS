'use client';


import {useState, useMemo } from "react";

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import CrudService from "src/services/cruds-service";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ContactForm() {
  const mdUp = useResponsive('up', 'md');

  const urlPattern = /(https?:\/\/[^\s]+)/; // Regular expression to check for URLs
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const ElearningContactSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required')
      .max(255, 'Full name cannot exceed 255 characters')
      .test('no-url', 'Full name cannot contain a URL', (value) => !urlPattern.test(value)),
    email: Yup.string()
      .required('Email is required')
      .email('That is not a valid email')
      .max(255, 'Email cannot exceed 255 characters'),
    subject: Yup.string()
      .required('Subject is required')
      .max(255, 'Subject cannot exceed 255 characters')
      .test('no-url', 'Subject cannot contain a URL', (value) => !urlPattern.test(value)),
    message: Yup.string()
      .required('Message is required')
      .max(255, 'Message cannot exceed 255 characters')
      .test('no-url', 'Message cannot contain a URL', (value) => !urlPattern.test(value)),
  });


  const defaultValues = {
    fullName: '',
    subject: '',
    email: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(ElearningContactSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Construct the payload in JSON:API format
      const payload = {
        data: {
          type: 'contacts',
          attributes: {
            fullName: data.fullName,
            email: data.email,
            subject: data.subject,
            message: data.message,
          },
        },
      };

      // Send the form data to the API
      await CrudService.createContact(payload);


      reset();

      setSuccessMessage('Thank you for reaching out. Your message has been successfully sent. We will get back to you shortly.');

      setTimeout(() => setSuccessMessage(''), 9000); // Clear the message after 5 seconds


    } catch (error) {
      console.error('Error sending message:', error);
    }
  });


  return (
    <Box
      sx={{
        bgcolor: 'background.neutral',
        py: { xs: 5, md: 5 },
      }}
    >
      <Container>
        <Grid container spacing={3} justifyContent="center">


          <Grid xs={12} md={10} lg={10}>
            <Stack
              spacing={2}
              sx={{
                mb: 5,
                textAlign: { xs: 'center', md: 'center' },
              }}
            >
              <Typography variant="h3">Drop Us A Line</Typography>


            </Stack>


            {successMessage && ( // Conditionally render success message
              <Typography
                variant="subtitle1"
                sx={{ mb: 3, textAlign: 'center', color: 'success.main' }}
              >
                {successMessage}
              </Typography>
            )}

            <FormProvider methods={methods} onSubmit={onSubmit}>
              <Stack spacing={2.5} alignItems="flex-start">
                <RHFTextField name="fullName" label="Full name" />

                <RHFTextField name="email" label="Email" />

                <RHFTextField name="subject" label="Subject" />

                <RHFTextField name="message" multiline rows={4} label="Message" sx={{ pb: 2.5 }} />

                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{
                    mx: { xs: 'auto !important', md: 'unset !important' },
                  }}
                >
                  Send Request
                </LoadingButton>
              </Stack>
            </FormProvider>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
