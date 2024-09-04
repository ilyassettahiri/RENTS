"use client";

import { useState, useEffect, useContext, useMemo } from "react";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

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



  const { data: rawUserData, isLoading: isUserLoading, error: userError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => AuthService.getProfile(),
    onError: (error) => {
      console.error('Failed to fetch user profile:', error);
    },
  });


  const userData = useMemo(() => {
    if (!rawUserData) return {
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

    };

    const userAttributes = rawUserData.data.attributes;
    return {
      id: rawUserData.data.id,
      firstName: userAttributes.first_name,
      lastName: userAttributes.last_name,
      emailAddress: userAttributes.email,
      profile_image: userAttributes.profile_image,
      phoneNumber: userAttributes.phone_number,
      birthday: userAttributes.birthday ? new Date(userAttributes.birthday) : null,
      gender: userAttributes.gender,
      streetAddress: userAttributes.address,
      zipCode: userAttributes.zip,
      city: userAttributes.city,
      country: userAttributes.country,

    };
  }, [rawUserData]);


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
    defaultValues: userData || {},
  });

  const passwordMethods = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });


    // Reset forms when userData changes using useEffect
    useEffect(() => {
      if (userData && !isUserLoading) {
        personalInfoMethods.reset(userData);
        passwordMethods.reset(userData);
        passwordMethods.reset({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      }
    }, [userData, isUserLoading, personalInfoMethods, passwordMethods]);



  const onSubmitPersonalInfo = personalInfoMethods.handleSubmit(async (data) => {
    try {
      if (data.birthday) {
        data.birthday = format(data.birthday, 'yyyy-MM-dd');
      }
      await CrudService.updateUser(data, userData.id);
      const response = await AuthService.getProfile();
      const updatedUser = response.data.attributes;

      personalInfoMethods.reset({
        ...userData,
        ...updatedUser,
        birthday: updatedUser.birthday ? new Date(updatedUser.birthday) : null,
      });


    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitPassword = passwordMethods.handleSubmit(async (data) => {
    try {
      await CrudService.updateUser(data, userData.id);
      passwordMethods.reset({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      alert('Password changed successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to change password. Please try again.');
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

        <Box sx={{ textAlign: 'right' }}>


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

        </Box>



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


        <Box sx={{ textAlign: 'right' }}>

              <LoadingButton
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={passwordMethods.formState.isSubmitting}
              >
                Change Password
              </LoadingButton>

        </Box>

      </FormProvider>
    </LocalizationProvider>
  );
}
