

import { useEffect, useState, useContext } from "react";
import { useTranslation } from 'react-i18next';  // Import useTranslation for language change

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
import Nav from 'examples/Navbars/DashboardNavbar/nav';


// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard PRO React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { useTextDirection, setTextDirection } from "context/useTextDirection"; // Import TextDirectionContext


const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic path for the image
const team1 = `${imagePath}/team-1.jpg`;

export {
  team1
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

} from "context";


// Images
 
 

function DashboardNavbar({ absolute, light, isMini }) {
  
  const authContext = useContext(AuthContext);
  const { t, i18n } = useTranslation(); 
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar,   } = controller;
  const [openMenu, setOpenMenu] = useState(false);

  const [navOpen, setNavOpen] = useState(false); 

  const [openLanguage, setOpenLanguage] = useState(false);


  const route = useLocation().pathname.split("/").slice(1);

  // Access text direction context
  const { state: textDirectionState, dispatch: textDirectionDispatch } = useTextDirection();
  const { textDirection } = textDirectionState;

  


  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);






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


  const handleNavOpen = () => setNavOpen(true);  // Set navOpen to true to open the Nav
  const handleCloseNav = () => setNavOpen(false);  // Set navOpen to false to close the Nav


  const handleOpenLanguage = (event) => setOpenLanguage(event.currentTarget);
  const handleCloseLanguage = () => setOpenLanguage(false);

  const changeLanguageDirection = (language, direction) => {
    i18n.changeLanguage(language);  // Change the language
    setTextDirection(textDirectionDispatch, direction);  // Change the text direction
    document.body.setAttribute('dir', direction);  // Set the direction attribute on the body
    handleCloseLanguage(); // Close language menu after selecting a language
  };

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
        image="/icons/flags/US.png"
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image="/icons/flags/US.png"
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image="/icons/flags/US.png"
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );



  const renderLanguage = () => (
    <Menu
      anchorEl={openLanguage}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openLanguage)}
      onClose={handleCloseLanguage}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image="/icons/flags/AU.png"
        title={["English"]}
        onClick={() => changeLanguageDirection("en", "ltr")}
      />
      <NotificationItem
        image="/icons/flags/GB.png"
        title={["Arabic"]}
        onClick={() => changeLanguageDirection("ar", "rtl")}
      />
      <NotificationItem
        image="/icons/flags/US.png"
        title={["French"]}
        onClick={() => changeLanguageDirection("fr", "ltr")}
      />
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>


          <SoftBox color="inherit" display={{ xs: 'none', md: 'block'  }} mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
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
                <Icon className={light ? "text-white" : "text-dark"}>language</Icon>
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
                onClick={handleNavOpen} 
              >
                <SoftAvatar src={"/team-1.jpg"} alt="profile-image" size="xs" shadow="sm" />

              </IconButton>
              <Nav open={navOpen} onClose={handleCloseNav} />


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