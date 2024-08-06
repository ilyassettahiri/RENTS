"use client";

import { useState, useEffect, useContext } from "react";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useBoolean } from 'src/hooks/use-boolean';
import { countries } from 'src/assets/data';
import Iconify from 'src/components/iconify';
import AuthService from "src/services/auth-service";
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { AuthContext } from 'src/context/AuthContextProvider';
import CrudService from 'src/services/cruds-service';
import { format } from 'date-fns';

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

export default function DashboardPersonalView() {
  const { getCurrentUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    birthday: null,
    gender: 'Male',
    streetAddress: '',
    zipCode: '',
    city: '',
    country: 'United States',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await AuthService.getProfile();
      setUserId(response.data.id);
      setUser((prevUser) => ({
        ...prevUser,
        firstName: response.data.attributes.first_name,
        lastName: response.data.attributes.last_name,
        emailAddress: response.data.attributes.email,
        profile_image: response.data.attributes.profile_image,
        phoneNumber: response.data.attributes.phone_number,
        birthday: response.data.attributes.birthday ? new Date(response.data.attributes.birthday) : null,
        gender: response.data.attributes.gender,
        streetAddress: response.data.attributes.address,
        zipCode: response.data.attributes.zip,
        city: response.data.attributes.city,
        country: response.data.attributes.country,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    })();
  }, []);

  const passwordShow = useBoolean();

  const personalInfoSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    birthday: Yup.mixed().nullable().required('Birthday is required'),
    gender: Yup.string().required('Gender is required'),
    streetAddress: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
  });

  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string().required('New password is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm new password is required'),
  });

  const personalInfoMethods = useForm({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: user,
  });

  const passwordMethods = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: user,
  });

  useEffect(() => {
    personalInfoMethods.reset(user);
    passwordMethods.reset(user);
  }, [user, personalInfoMethods, passwordMethods]);

  const onSubmitPersonalInfo = personalInfoMethods.handleSubmit(async (data) => {
    try {
      if (data.birthday) {
        data.birthday = format(data.birthday, 'yyyy-MM-dd');
      }
      await CrudService.updateUser(data, userId);
      const response = await AuthService.getProfile();
      setUser((prevUser) => ({
        ...prevUser,
        ...response.data.attributes,
        birthday: response.data.attributes.birthday ? new Date(response.data.attributes.birthday) : null,
      }));
      personalInfoMethods.reset();
      console.log('Personal Info Data:', data);
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitPassword = passwordMethods.handleSubmit(async (data) => {
    try {
      // Implement password update logic here
      console.log('Password Data:', data);
      passwordMethods.reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormProvider methods={personalInfoMethods} onSubmit={onSubmitPersonalInfo}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Personal
        </Typography>

        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <RHFTextField name="firstName" label="First Name" />
          <RHFTextField name="lastName" label="Last Name" />
          <RHFTextField name="emailAddress" label="Email Address" />
          <RHFTextField name="phoneNumber" label="Phone Number" />

          <Controller
            name="birthday"
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                label="Birthday"
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    error: !!error?.message,
                  },
                }}
                {...field}
                value={field.value}
              />
            )}
          />

          <RHFSelect native name="gender" label="Gender">
            {GENDER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </RHFSelect>

          <RHFTextField name="streetAddress" label="Street Address" />
          <RHFTextField name="zipCode" label="Zip Code" />
          <RHFTextField name="city" label="City" />
          <RHFAutocomplete
            name="country"
            type="country"
            label="Country"
            placeholder="Choose a country"
            fullWidth
            options={countries.map((option) => option.label)}
            getOptionLabel={(option) => option}
          />
        </Box>
        <LoadingButton
          sx={{ mt: 5 }}
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={personalInfoMethods.formState.isSubmitting}
        >
          Save Changes
        </LoadingButton>
      </FormProvider>

      <FormProvider methods={passwordMethods} onSubmit={onSubmitPassword}>
        <Stack spacing={3} sx={{ my: 5 }}>
          <Typography variant="h5"> Change Password </Typography>

          <Stack spacing={2.5}>
            <RHFTextField
              name="oldPassword"
              label="Old Password"
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
              name="newPassword"
              label="New Password"
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
              name="confirmNewPassword"
              label="Confirm New Password"
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
          </Stack>

        </Stack>
          <LoadingButton
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={passwordMethods.formState.isSubmitting}
          >
            Change Password
          </LoadingButton>
      </FormProvider>
    </LocalizationProvider>
  );
}
