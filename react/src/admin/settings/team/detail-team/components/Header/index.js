 
/* eslint-disable react/prop-types */

 

import { useState, useEffect, useContext } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Icon, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";
import SoftInput from "components/SoftInput";
import colors from "assets/theme/base/colors";

import AuthService from "services/auth-service";
import CrudService from "services/cruds-service";
import { AuthContext } from "context";

function Header({ user, isDemo }) {
  const authContext = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [fileState, setFileState] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [notification, setNotification] = useState({ value: false, color: "info", message: "" });
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");

  const [id, setId] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    setImage(user.profile_image);
    setId(user.id);
    (async () => {
      try {
        const response = await authContext.getRole();
        setRole(response);
      } catch (err) {
        console.error(err);
        return null;
      }
    })();
  }, [user]);

  useEffect(() => {
    if (notification.value === true) {
      let timer = setTimeout(() => {
        setNotification({ value: false, color: "info", message: "" });
      }, 5000);
    }
  }, [notification]);

  const changeHandler = (e) => {
    const forSoftata = new ForSoftata();
    forSoftata.append("attachment", e.target.files[0]);
    setFileState(forSoftata);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isDemo) {
        setNotification({
          value: true,
          color: "secondary",
          message: "You can not update the profile image in demo version",
        });
        return null;
      }
      const { url } = await CrudService.imageUpload(fileState, id);
      let userData;
      // set new user data for call
      userData = {
        data: {
          type: "profile",
          attributes: {
            profile_image: `${process.env.REACT_APP_IMAGES}${url}`,
          },
        },
      };
      // call api for update
      try {
        await AuthService.updateProfile(JSON.stringify(userData));
        setNotification({
          value: true,
          color: "info",
          message: "Your profile has been updated",
        });
      } catch (err) {
        setError(err.errors[0].detail);
      }
    } catch (err) {
      setError(err.message);
      return null;
    }
    setError(null);
  };

  return (
    <>
      <Card id="profile">
        <SoftBox p={2} component="form" onSubmit={submitHandler} encType="multipart/form-data">
          <Grid
            container
            spacing={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="0"
            marginLeft="0"
            width="100%"
          >
            <Grid item position="relative" style={{ paddingLeft: "0", paddingTop: "0" }}>
              <SoftAvatar src={imageUrl ?? image} alt="profile-image" size="xl" shadow="sm" />
            </Grid>
            <SoftInput
              type="file"
              onChange={changeHandler}
              id="avatar"
              name="attachment"
              accept="image/*"
              sx={{ display: "none", cursor: "pointer" }}
            ></SoftInput>
            <Grid item style={{ paddingTop: "0" }}>
              <SoftBox height="100%" mt={0.5} lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  {user.name ?? "Alex Thompson"}
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="medium">
                  {role}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <SoftBox sx={{ ml: "auto" }} display="flex" flexDirection="column">
              <SoftBox display="flex" justifyContent="flex-end" flexDirection="row">
                <SoftButton
                  variant="gradient"
                  color="info"
                  size="small"
                  component="label"
                  htmlFor="avatar"
                  sx={{ marginRight: "1rem" }}
                >
                  change
                </SoftButton>
                <SoftButton variant="gradient" color="dark" size="small" type="submit">
                  save
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
      {notification.value === true && (
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
