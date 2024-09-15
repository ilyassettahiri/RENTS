 
/* eslint-disable react/prop-types */

 

import { useState, useEffect, useContext } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";
import SoftInput from "components/SoftInput";

// Services and Context
import AuthService from "services/auth-service";
import CrudService from "services/cruds-service";
import { AuthContext } from "context";

function Header({ user, isDemo }) {
  const authContext = useContext(AuthContext);
  const [image, setImage] = useState(user.profile_image || "");
  const [fileState, setFileState] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [notification, setNotification] = useState({ value: false, color: "info", message: "" });
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      const profileImageUrl = user.profile_image;
      setImage(profileImageUrl);
      console.log("User profile image:", profileImageUrl); // Log the profile image URL
      (async () => {
        try {
          const response = await authContext.getRole();
          setRole(response);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [user, authContext]);

  useEffect(() => {
    if (notification.value === true) {
      const timer = setTimeout(() => {
        setNotification({ value: false, color: "info", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const changeHandler = (e) => {
    const formData = new FormData();
    formData.append("attachment", e.target.files[0]);
    setFileState(formData);
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Display selected image immediately
    console.log("File selected:", URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isDemo) {
      setNotification({
        value: true,
        color: "secondary",
        message: "You cannot update the profile image in demo version",
      });
      return;
    }
    try {
      const { url } = await CrudService.imageUpload(fileState);
      const userData = {
        data: {
          type: "profile",
          attributes: {
            profile_image: url,
          },
        },
      };
      await AuthService.updateProfile(JSON.stringify(userData));
      setNotification({
        value: true,
        color: "info",
        message: "Your profile has been updated",
      });
      const profileImageUrl = `${process.env.REACT_APP_IMAGE_BASE_URL}${url}`;
      setImage(profileImageUrl); // Update the image state with the new URL
      setImageUrl(null); // Clear the imageUrl to fallback to image
    } catch (err) {
      setError(err.errors ? err.errors[0].detail : err.message);
    }
  };

  return (
    <>
      <Card id="profile">
        <SoftBox p={2} component="form" onSubmit={submitHandler} encType="multipart/form-data">
          <Grid container spacing={3} display="flex" justifyContent="space-between" alignItems="center" marginTop="0" marginLeft="0" width="100%">
            <Grid item position="relative" style={{ paddingLeft: "0", paddingTop: "0" }}>
              <SoftAvatar src={imageUrl ?? image} alt="profile-image" size="xl" shadow="sm" />
            </Grid>
            <SoftInput type="file" onChange={changeHandler} id="avatar" name="attachment" accept="image/*" sx={{ display: "none", cursor: "pointer" }} />
            <Grid item style={{ paddingTop: "0" }}>
              <SoftBox height="100%" mt={0.5} lineHeight={1}>

              </SoftBox>
            </Grid>
            <SoftBox sx={{ ml: "auto" }} display="flex" flexDirection="column">
              <SoftBox display="flex" justifyContent="flex-end" flexDirection="row">
                <SoftButton variant="gradient" color="info" size="small" component="label" htmlFor="avatar" sx={{ marginRight: "1rem" }}>
                  Change
                </SoftButton>
                <SoftButton variant="gradient" color="dark" size="small" type="submit">
                  Save
                </SoftButton>
              </SoftBox>
              {error && (
                <SoftTypography variant="caption" color="error" fontWeight="light" pt={2}>
                  {error}
                </SoftTypography>
              )}
            </SoftBox>
          </Grid>
        </SoftBox>
      </Card>
      {notification.value && (
        <SoftAlert color={notification.color} mt="20px">
          <SoftTypography variant="body2" color="white">
            {notification.message}
          </SoftTypography>
        </SoftAlert>
      )}
    </>
  );
}

export default Header;
