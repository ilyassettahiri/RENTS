
import { useState, useEffect } from "react";
import CrudService from "services/cruds-service";
import { useQuery } from '@tanstack/react-query';

import SoftAlert from "components/SoftAlert";
import AuthService from "services/auth-service";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Security page components
import FormField from "admin/components/FormField";

function ChangePassword() {
  const { t } = useTranslation();



  // User state to store the fetched user profile data
  const [user, setUser] = useState({
    id: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [notification, setNotification] = useState({ value: false, color: "info", message: "" });
  const [errors, setErrors] = useState({
    oldPasswordError: false,
    newPasswordError: false,
    confirmNewPasswordError: false,
  });

  // Fetch user profile on component mount
  useEffect(() => {
    (async () => {
      const response = await AuthService.getProfile();
      setUser((prevUser) => ({
        ...prevUser,
        id: response.data.id,
      }));
    })();
  }, []);

  // Reset notification after 5 seconds
  useEffect(() => {
    if (notification.value) {
      const timer = setTimeout(() => {
        setNotification({ value: false, color: "info", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    // Validate input fields
    if (!user.oldPassword || !user.newPassword || !user.confirmNewPassword) {
      setErrors({
        oldPasswordError: !user.oldPassword,
        newPasswordError: !user.newPassword,
        confirmNewPasswordError: !user.confirmNewPassword,
      });
      return;
    }
  
    // Check if new password matches confirm password
    if (user.newPassword !== user.confirmNewPassword) {
      setErrors({ ...errors, confirmNewPasswordError: true });
      setNotification({ value: true, color: "error", message: "Passwords do not match" });
      return;
    }
  
    try {
      // Include confirmNewPassword in the request body
      const passwordData = {
        oldPassword: user.oldPassword,
        newPassword: user.newPassword,
        confirmNewPassword: user.confirmNewPassword,
      };
  
      // Use the updateUser method with the user's id
      await CrudService.updateUser(passwordData, user.id);
  
      setNotification({
        value: true,
        color: "success",
        message: "Password updated successfully",
      });
      setUser({
        ...user,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (error) {
      console.error("Failed to change password:", error);
      setNotification({
        value: true,
        color: "error",
        message: "Failed to update password. Please try again.",
      });
    }
  };
  


  return (
    <Card id="change-password">
      <SoftBox pt={2} px={2} lineHeight={1}>
        <SoftTypography variant="h6" fontWeight="medium">
          {t('Change Password')}
        </SoftTypography>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          {t('We will send you an email with the verification code.')}
        </SoftTypography>
      </SoftBox>
      <SoftBox component="form" p={2} onSubmit={submitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              label={t("Current Password")}
              placeholder={t("Current Password")}
              inputProps={{ type: "password" }}
              name="oldPassword"
              value={user.oldPassword}
              onChange={changeHandler}
              error={errors.oldPasswordError}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label={t("New Password")}
              placeholder={t("New Password")}
              inputProps={{ type: "password" }}
              name="newPassword"
              value={user.newPassword}
              onChange={changeHandler}
              error={errors.newPasswordError}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label={t("Confirm New Password")}
              placeholder={t("Confirm New Password")}
              inputProps={{ type: "password" }}
              name="confirmNewPassword"
              value={user.confirmNewPassword}
              onChange={changeHandler}
              error={errors.confirmNewPasswordError}
            />
          </Grid>
        </Grid>
        <SoftBox mt={2}>
          <SoftButton sx={{ py: 1.8 }} variant="gradient" color="info" fullWidth type="submit">
            {t("Update Password")}
          </SoftButton>
        </SoftBox>
        {notification.value && (
          <SoftAlert color={notification.color} mt="20px">
            <SoftTypography variant="body2" color="white">
              {notification.message}
            </SoftTypography>
          </SoftAlert>
        )}
      </SoftBox>
    </Card>
  );

}

export default ChangePassword;
