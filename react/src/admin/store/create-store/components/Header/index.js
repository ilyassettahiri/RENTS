import { useState, useMemo } from "react";
import PropTypes from 'prop-types';

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import EditIcon from "@mui/icons-material/Edit";

// Images

const imagePath = process.env.REACT_APP_IMAGE_BASE_URL;


function Header({ profileImage, backgroundImage, onProfileImageChange, onBackgroundImageChange }) {
  const defaultImage = `${imagePath}/curved9.jpg`;


    // Memoize the profile and background image sources
    const profileImgSrc = useMemo(() => {
      return profileImage ? (typeof profileImage === 'object' ? URL.createObjectURL(profileImage) : `${imagePath}${profileImage}`) : defaultImage;
    }, [profileImage]);

    

    const backgroundImgSrc = useMemo(() => {
      return backgroundImage ? (typeof backgroundImage === 'object' ? URL.createObjectURL(backgroundImage) : `${imagePath}${backgroundImage}`) : defaultImage;
    }, [backgroundImage]);
  
  return (
    <SoftBox position="relative">
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="24rem"
        borderRadius="xl"
        sx={{
          backgroundImage: `url(${backgroundImgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById('background-image-upload').click()}
      >
        <input
          accept="image/*"
          id="background-image-upload"
          type="file"
          style={{ display: "none" }}
          onChange={onBackgroundImageChange}
        />
        <IconButton
          component="span"
          sx={{ position: "absolute", top: 16, right: 16, color: "white" }}
        >
          <EditIcon />
        </IconButton>
      </SoftBox>

      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -5,
          mx: 3,
          pt: 1,
          

          px: 1,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftBox
              position="relative"
              display="inline-block"
              onClick={() => document.getElementById('profile-image-upload').click()}
              sx={{ cursor: "pointer" }}
            >
              <img
                src={profileImgSrc}
                alt="profile-image"
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: '15px',
                  objectFit: 'cover',
                }}
              />
              <input
                accept="image/*"
                id="profile-image-upload"
                type="file"
                style={{ display: "none" }}
                onChange={onProfileImageChange}
              />
              <IconButton
                component="span"
                sx={{ position: "absolute", top: 0, right: 0, color: "white" }}
              >
                <EditIcon />
              </IconButton>
            </SoftBox>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}

Header.propTypes = {
  profileImage: PropTypes.object,
  backgroundImage: PropTypes.object,
  onProfileImageChange: PropTypes.func.isRequired,
  onBackgroundImageChange: PropTypes.func.isRequired,
};

export default Header;
