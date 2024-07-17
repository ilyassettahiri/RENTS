import { useState } from "react";
import PropTypes from 'prop-types';

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import EditIcon from "@mui/icons-material/Edit";

// Images

const imagePath = process.env.REACT_APP_IMAGE_PATH;


function Header({ profileImage, backgroundImage, onProfileImageChange, onBackgroundImageChange }) {
  const defaultImage = `${imagePath}/curved-images/curved0.jpg`;

  const profileImgSrc = profileImage ? URL.createObjectURL(profileImage) : defaultImage;
  const backgroundImgSrc = backgroundImage ? URL.createObjectURL(backgroundImage) : defaultImage;

  return (
    <SoftBox position="relative">
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
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
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
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
                  width: 100,
                  height: 100,
                  borderRadius: '8px',
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
