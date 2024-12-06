'use client';

import { useContext, useState, useMemo } from "react";

import { AuthContext } from 'src/context/AuthContextProvider';
import AuthService from 'src/services/auth-service';
import { useRouter } from 'src/routes/hooks';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from 'react-i18next';

import { paths as getPaths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const authContext = useContext(AuthContext);
  const passwordShow = useBoolean();

  const router = useRouter();

  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    confirmPassError: false,
    emailTaken: false,
  });

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required')
      .min(6, 'Minimum 6 characters')
      .max(15, 'Maximum 15 characters'),
    email: Yup.string().required('Email is required').email('That is not an email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], "Passwords don't match"),
  });

  const defaultValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (data.fullName.trim().length === 0) {
      setErrors((prev) => ({ ...prev, nameError: true }));
      return;
    }

    if (data.email.trim().length === 0 || !data.email.trim().match(mailFormat)) {
      setErrors((prev) => ({ ...prev, emailError: true }));
      return;
    }

    if (data.password.trim().length < 6) {
      setErrors((prev) => ({ ...prev, passwordError: true }));
      return;
    }

    if (data.confirmPassword.trim() !== data.password.trim()) {
      setErrors((prev) => ({ ...prev, confirmPassError: true }));
      return;
    }

    const newUser = { name: data.fullName, email: data.email, password: data.password };
    const myData = {
      data: {
        type: "users",
        attributes: { ...newUser, password_confirmation: newUser.password },
      },
    };

    try {
      const response = await AuthService.register(myData);
      authContext.login(response.access_token);
      router.push(paths.verification);
    } catch (err) {
      setErrors((prev) => ({ ...prev, emailTaken: true }));
      console.error(err);
    }

    reset(); // Reset form fields after submission
  };

  const renderHead = (
    <div>
      <Typography variant="h3" paragraph>
        Get Started
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Already have an account? `}
        <Link
          component={RouterLink}
          href={paths.login}
          variant="subtitle2"
          color="primary"
        >
          Login
        </Link>
      </Typography>
    </div>
  );

  const renderSocials = (
    <Stack direction="row" spacing={2}>
      <Button fullWidth size="large" color="primary" variant="outlined">
        <Iconify icon="logos:google-icon" width={24} />
      </Button>

      <Button fullWidth size="large" color="primary" variant="outlined">
        <Iconify icon="carbon:logo-facebook" width={24} sx={{ color: '#1877F2' }} />
      </Button>

      <Button color="primary" fullWidth variant="outlined" size="large">
        <Iconify icon="carbon:logo-github" width={24} sx={{ color: 'text.primary' }} />
      </Button>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        <RHFTextField name="fullName" label="Full Name" />

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>

        <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          {`I agree to `}
          <Link color="text.primary" href="#" underline="always">
            Terms of Service
          </Link>
          {` and `}
          <Link color="text.primary" href="#" underline="always">
            Privacy Policy.
          </Link>
        </Typography>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      <Divider>
        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          or continue with
        </Typography>
      </Divider>

      {renderSocials}
    </>
  );
}
