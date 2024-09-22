 
/* eslint-disable react/prop-types */

 

import { useState, useEffect, useContext } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Iconify from 'components/iconify';

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";
import SoftInput from "components/SoftInput";
import  Image  from 'components/image';
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
  const [isImageSelected, setIsImageSelected] = useState(false);
  const { t } = useTranslation();

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
    setIsImageSelected(true);

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
      setIsImageSelected(false);

    } catch (err) {
      setError(err.errors ? err.errors[0].detail : err.message);
    }
  };



    // Conditional rendering for Edit and Save buttons
    const renderEditOrSaveButton = isImageSelected ? (
      <>
        <Stack
          direction="row"
          alignItems="center"
          onClick={() => document.getElementById('profile-image-upload').click()}
          sx={{
            typography: 'caption',
            cursor: 'pointer',
            '&:hover': { opacity: 0.72 },
          }}
        >
          <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
          {t('Edit')}
        </Stack>
  
        <SoftButton
          color="info"
          size="small"
          type="submit"
          variant="gradient"
          onClick={submitHandler}
          sx={{ ml: 2 }}
        >
          {t('Save')}
        </SoftButton>
      </>
    ) : (
      <Stack
        direction="row"
        alignItems="center"
        onClick={() => document.getElementById('profile-image-upload').click()}
        sx={{
          typography: 'caption',
          cursor: 'pointer',
          '&:hover': { opacity: 0.72 },
        }}
      >
        <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
        {t('Edit')}
      </Stack>
    );
  
  

  return (
    <>
      <Card id="profile">
        <SoftBox p={2} component="form" onSubmit={submitHandler} encType="multipart/form-data">
          <Grid container spacing={3} display="flex" alignItems="center">
            <Grid item>



              <SoftBox width="4rem" >

                  <Image
                      src={imageUrl ?? image}
                    
                      ratio="1/1"
                      width="100%"
                      sx={{ borderRadius: '10px' }}
                      
                  />
              </SoftBox>

              <input
                type="file"
                accept="image/*"
                onChange={changeHandler}
                id="profile-image-upload"
                style={{ display: 'none' }}
              />
            </Grid>
            <Grid item xs>
              <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ ml: 2 }}>
                {renderEditOrSaveButton}
              </Stack>
            </Grid>
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
