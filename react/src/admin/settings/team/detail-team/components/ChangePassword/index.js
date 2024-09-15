 
/* eslint-disable react/prop-types */

 

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftAlert from "components/SoftAlert";

import AuthService from "services/auth-service";

function ChangePassword({ user, isDemo }) {
  const passwordRequirements = ["Min 8 characters", "Change it often"];

  const [info, setInfo] = useState({ newPassword: "", confirmPassword: "" });
  const [notification, setNotification] = useState({ value: false, color: "info", message: "" });

  useEffect(() => {
    if (notification.value === true) {
      let timer = setTimeout(() => {
        setNotification({ value: false, color: "info", message: "" });
      }, 5000);
    }
  }, [notification]);

  const [errors, setErrors] = useState({
    newPassError: false,
    confirmPassError: false,
  });

  const changeHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // validation
    if (isDemo) {
      setNotification({
        value: true,
        color: "secondary",
        message: "You can not update the password in demo version",
      });
      return null;
    } else {
      if (info.newPassword.trim().length < 8) {
        setErrors({ ...errors, newPassError: true });
        return;
      }

      if (info.confirmPassword.trim() !== info.newPassword.trim()) {
        setErrors({ ...errors, confirmPassError: true });
        return;
      }

      let userData;
      // set new user data for call
      // issue here in the get profile the password is not coming so can't verify it and the password needs to have the new password set to save it
      userData = {
        data: {
          type: "profile",
          attributes: {
            password: info.newPassword,
            password_confirmation: info.confirmPassword,
            profile_image: user.profile_image ?? null,
          },
        },
      };

      // call api for update
      await AuthService.updateProfile(JSON.stringify(userData));

      setInfo({ newPassword: "", confirmPassword: "" });

      // reset errors
      setErrors({
        newPassError: false,
        confirmPassError: false,
      });

      setNotification({
        value: true,
        color: "info",
        message: "Your profile has been updatedn",
      });
    }
  };

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <SoftBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <SoftTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </SoftTypography>
      </SoftBox>
    );
  });

  return (
    <>
      {notification.value === true && (
        <SoftAlert color={notification.color}>
          <SoftTypography variant="body2" color="white">
            {notification.message}
          </SoftTypography>
        </SoftAlert>
      )}
      <Card id="change-password">
        <SoftBox p={3}>
          <SoftTypography variant="h5">Change Password</SoftTypography>
        </SoftBox>
        <SoftBox component="form" pb={3} px={3} onSubmit={submitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SoftInput
                fullWidth
                label="New Password"
                inputProps={{ type: "password", autoComplete: "" }}
                name="newPassword"
                value={info.newPassword}
                onChange={changeHandler}
                error={errors.newPassError}
              />
              {errors.newPassError && (
                <SoftTypography variant="caption" color="error" fontWeight="light" pl={2}>
                  The new password should have at least 8 characters
                </SoftTypography>
              )}
            </Grid>
            <Grid item xs={12}>
              <SoftInput
                fullWidth
                label="Confirm New Password"
                inputProps={{ type: "password", autoComplete: "" }}
                name="confirmPassword"
                value={info.confirmPassword}
                onChange={changeHandler}
                error={errors.confirmPassError}
              />
              {errors.confirmPassError && (
                <SoftTypography variant="caption" color="error" fontWeight="light" pl={2}>
                  The password confimation should match the new password
                </SoftTypography>
              )}
            </Grid>
          </Grid>
          <SoftBox mt={6} mb={1}>
            <SoftTypography variant="h5">Password requirements</SoftTypography>
          </SoftBox>
          <SoftBox mb={1}>
            <SoftTypography variant="body2" color="text">
              Please follow this guide for a strong password
            </SoftTypography>
          </SoftBox>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            flexWrap="wrap"
          >
            <SoftBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
              {renderPasswordRequirements}
            </SoftBox>
            <SoftBox ml="auto" display="flex" flexDirection="column">
              <SoftButton variant="gradient" color="dark" size="small" type="submit">
                update password
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </>
  );
}

export default ChangePassword;
