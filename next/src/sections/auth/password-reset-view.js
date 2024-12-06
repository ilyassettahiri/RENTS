'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import AuthService from 'src/services/auth-service';
import { RouterLink } from 'src/routes/components';
import PropTypes from 'prop-types';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { paths as getPaths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';

export default function PasswordResetView({ searchParams }) {
  const { token, email } = searchParams; // Extract token and email from URL

  const { t } = useTranslation();
  const paths = useMemo(() => getPaths(t('en')), [t]);

  // Validation schema
  const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(255, 'Password cannot exceed 255 characters'),
    confirmNewPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // API call to reset the password
      await AuthService.resetPassword({
        token,
        email,
        password: data.newPassword,
        password_confirmation: data.confirmNewPassword, // Ensure password confirmation is included
      });


      // Redirect to login page
      window.location.href = paths.login;
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  });


  return (
    <Stack sx={{ textAlign: 'center' }}>
      <Image
        alt="reset password"
        src="/assets/icons/ic_lock_password.svg"
        sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
      />

      <Typography variant="h3" paragraph>
        Reset Your Password
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
        Please enter your new password below to reset your account password.
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3}>
          <RHFTextField
            name="newPassword"
            label="New Password"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Iconify icon="carbon:view-off" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Iconify icon="carbon:view-off" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Reset Password
          </LoadingButton>
        </Stack>
      </FormProvider>

      <Typography variant="body2" sx={{ mt: 3 }}>
        Remembered your password?{' '}
        <RouterLink href={paths.login} color="primary">
          Login
        </RouterLink>
      </Typography>
    </Stack>
  );
}


PasswordResetView.propTypes = {
  searchParams: PropTypes.shape({
    token: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
