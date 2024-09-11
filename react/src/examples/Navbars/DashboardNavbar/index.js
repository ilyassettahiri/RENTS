

import { useEffect, useState, useContext,useCallback } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import SoftAvatar from "components/SoftAvatar";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard PRO React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";


const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic path for the image
const team1 = `${imagePath}/team-1.jpg`;

export {
  team1
};

const flagUrls = {
  us: 'https://flagcdn.com/us.svg',
  fr: 'https://flagcdn.com/fr.svg',
  sa: 'https://flagcdn.com/sa.svg',
};

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard PRO React context
import {
  setMiniSidenav,
  AuthContext,
  useSoftUIController,
  setTransparentNavbar,
  
  setDirection 


} from "context";


// Images
 
 

function DashboardNavbar({ absolute, light, isMini }) {
  
  const authContext = useContext(AuthContext);

  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav,direction, transparentNavbar, fixedNavbar  } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  const [openLanguage, setOpenLanguage] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({ code: 'us', label: 'English' });

  
  useEffect(() => {
    // Save current direction to revert back on cleanup
    const currentDirection = direction;

    // Set the direction based on the selected language
    setDirection(dispatch, currentLanguage.code === "sa" ? "rtl" : "ltr");

    // Cleanup function to revert direction to its initial state when component unmounts
    return () => setDirection(dispatch, currentDirection);
  }, [currentLanguage, dispatch, direction]);

  

  useEffect(() => {
    // settings the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);


  

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleOpenLanguage = (event) => setOpenLanguage(event.currentTarget);
  const handleCloseLanguage = () => setOpenLanguage(false);


  const handleChangeLanguage = useCallback((language) => {
    if (currentLanguage.code !== language.code) {
      setCurrentLanguage(language);
      setDirection(dispatch, language.code === "sa" ? "rtl" : "ltr"); // Update direction based on language
    }
    handleCloseLanguage();
  }, [dispatch, currentLanguage.code]);


  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team1} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={team1} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );



  const renderLanguage = () => (
    <Popover
      anchorEl={openLanguage}
      open={Boolean(openLanguage)}
      onClose={handleCloseLanguage}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{ mt: 2 }}
    >
      <MenuList sx={{ width: 160, minHeight: 72 }}>
        <MenuItem onClick={() => handleChangeLanguage({ code: 'us', label: 'English' })}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <img
              src={flagUrls.us}
              alt="English"
              style={{ width: 24, height: 24, borderRadius: '50%' }}
            />
            English
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => handleChangeLanguage({ code: 'fr', label: 'French' })}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <img
              src={flagUrls.fr}
              alt="French"
              style={{ width: 24, height: 24, borderRadius: '50%' }}
            />
            French
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => handleChangeLanguage({ code: 'sa', label: 'Arabic' })}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <img
              src={flagUrls.sa}
              alt="Arabic"
              style={{ width: 24, height: 24, borderRadius: '50%' }}
            />
            Arabic
          </Stack>
        </MenuItem>
      </MenuList>
    </Popover>
  );


  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>


          <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
            <Breadcrumbs  icon="home" title={route[route.length - 1]} route={route} light={light} /> 
            
          </SoftBox>
          
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox pr={1}>
              <SoftInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
              />
            </SoftBox>
            <SoftBox color={light ? "white" : "inherit"}>
              
                
              
              <IconButton
                size="large"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>



              <IconButton
                size="large"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="language-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenLanguage}
              >
                <img
                  src={flagUrls[currentLanguage.code]}
                  alt={currentLanguage.label}
                  style={{ width: 24, height: 24, borderRadius: '50%' }}
                />
              </IconButton>

              {renderLanguage()}


              
              <IconButton
                size="large"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
              </IconButton>

              <IconButton
                size="large"
                color="inherit"
                sx={navbarIconButton}
                
              >
                              <SoftAvatar src={"/team-1.jpg"} alt="profile-image" size="xs" shadow="sm" />

              </IconButton>


              {renderMenu()}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>

      
    </AppBar>
  );
}

// settings default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
