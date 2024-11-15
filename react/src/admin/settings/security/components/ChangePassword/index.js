
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


  


  const [userId, setUserId] = useState(null);

  const [oldPassword, setOldPassword] = useState({
    text: "",
    error: false,
    textError: "",
  });

  const [newPassword, setNewPassword] = useState({
    text: "",
    error: false,
    textError: "",
  });

  const [confirmNewPassword, setConfirmNewPassword] = useState({
    text: "",
    error: false,
    textError: "",
  });


  

  useEffect(() => {
    (async () => {
      try {
        const response = await AuthService.getProfile();

        // Set the user ID and reset password states
        setUserId(response.data.id);

        setOldPassword((prev) => ({
          ...prev,
          text: "",
          error: false,
          textError: "",
        }));

        setNewPassword((prev) => ({
          ...prev,
          text: "",
          error: false,
          textError: "",
        }));

        setConfirmNewPassword((prev) => ({
          ...prev,
          text: "",
          error: false,
          textError: "",
        }));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    })();
  }, []);


  const [notification, setNotification] = useState({ value: false, color: "info", message: "" });


  // Reset notification after 5 seconds
  useEffect(() => {
    if (notification.value) {
      const timer = setTimeout(() => {
        setNotification({ value: false, color: "info", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);



  const changeOldPasswordHandler = (e) => {
    const newValue = e.target.value;
    setOldPassword({
      ...oldPassword,
      text: newValue,
      error: newValue.trim().length < 1 || newValue.length > 255,
      textError:
        newValue.trim().length < 1
          ? "The Old Password is required."
          : newValue.length > 255
          ? "The Old Password cannot exceed 255 characters."
          : "",
    });
  };
  
  const changeNewPasswordHandler = (e) => {
    const newValue = e.target.value;
    setNewPassword({
      ...newPassword,
      text: newValue,
      error: newValue.trim().length < 1 || newValue.length > 255,
      textError:
        newValue.trim().length < 1
          ? "The New Password is required."
          : newValue.length > 255
          ? "The New Password cannot exceed 255 characters."
          : "",
    });
  };
  
  const changeConfirmNewPasswordHandler = (e) => {
    const newValue = e.target.value;
    setConfirmNewPassword({
      ...confirmNewPassword,
      text: newValue,
      error: newValue.trim().length < 1 || newValue.length > 255,
      textError:
        newValue.trim().length < 1
          ? "The Confirm New Password is required."
          : newValue.length > 255
          ? "The Confirm New Password cannot exceed 255 characters."
          : "",
    });
  };
  



  const [isSubmitting, setIsSubmitting] = useState(false);


  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

        // Validation
    if (oldPassword.text.trim().length < 1 || oldPassword.text.length > 255) {
      setOldPassword({
        ...oldPassword,
        error: true,
        textError:
          oldPassword.text.trim().length < 1
            ? "The Old Password is required."
            : "The Old Password cannot exceed 255 characters.",
      });
      setIsSubmitting(false);
      return;
    }

    if (newPassword.text.trim().length < 1 || newPassword.text.length > 255) {
      setNewPassword({
        ...newPassword,
        error: true,
        textError:
          newPassword.text.trim().length < 1
            ? "The New Password is required."
            : "The New Password cannot exceed 255 characters.",
      });
      setIsSubmitting(false);
      return;
    }

    if (confirmNewPassword.text.trim().length < 1 || confirmNewPassword.text.length > 255) {
      setConfirmNewPassword({
        ...confirmNewPassword,
        error: true,
        textError:
          confirmNewPassword.text.trim().length < 1
            ? "The Confirm New Password is required."
            : "The Confirm New Password cannot exceed 255 characters.",
      });
      setIsSubmitting(false);
      return;
    }

    // Check if the new password matches confirm new password
    if (newPassword.text !== confirmNewPassword.text) {
      setConfirmNewPassword({
        ...confirmNewPassword,
        error: true,
        textError: "The New Password and Confirm New Password must match.",
      });
      setIsSubmitting(false);
      return;
    }


    try {
      // Prepare the request body using the updated state values
      const passwordData = {
        oldPassword: oldPassword.text,
        newPassword: newPassword.text,
        confirmNewPassword: confirmNewPassword.text,
      };
    
      // Use the updateUser method with the user's id
      await CrudService.updateUser(passwordData, userId);
    
      setNotification({
        value: true,
        color: "success",
        message: "Password updated successfully.",
      });
    
      // Reset fields on success
      setOldPassword({ text: "", error: false, textError: "" });
      setNewPassword({ text: "", error: false, textError: "" });
      setConfirmNewPassword({ text: "", error: false, textError: "" });
    } catch (error) {

      setIsSubmitting(false);

      console.error("Failed to change password:", error);
      
      setNotification({
        value: true,
        color: "error",
        message: "Failed to update password. Please try again.",
      });
    }
    

    setIsSubmitting(false);

  };
  


  return (
    <Card id="change-password">
      
      


      <SoftBox component="form" p={2} onSubmit={submitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              label={t("Current Password")}
              placeholder={t("Current Password")}
              inputProps={{ type: "password" }}
              name="oldPassword"
              value={oldPassword.text}
              onChange={changeOldPasswordHandler}
              error={oldPassword.error}
            />
            {oldPassword.error && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                {oldPassword.textError}
              </SoftTypography>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormField
              label={t("New Password")}
              placeholder={t("New Password")}
              inputProps={{ type: "password" }}
              name="newPassword"
              value={newPassword.text}
              onChange={changeNewPasswordHandler}
              error={newPassword.error}
            />
            {newPassword.error && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                {newPassword.textError}
              </SoftTypography>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormField
              label={t("Confirm New Password")}
              placeholder={t("Confirm New Password")}
              inputProps={{ type: "password" }}
              name="confirmNewPassword"
              value={confirmNewPassword.text}
              onChange={changeConfirmNewPasswordHandler}
              error={confirmNewPassword.error}
            />
            {confirmNewPassword.error && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                {confirmNewPassword.textError}
              </SoftTypography>
            )}
          </Grid>
        </Grid>
        <SoftBox mt={2}>
          <SoftButton
            sx={{ py: 1.8 }}
            variant="gradient"
            color="info"
            fullWidth
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Update Password"}
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
