

import { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";
import { useLocation, NavLink } from "react-router-dom";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import Iconify from 'components/iconify';
import Badge from '@mui/material/Badge';

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// DefaultNavbar dropdown menus
import PagesMenu from "examples/Navbars/DefaultNavbar/Menus/PagesMenu";

const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic path for the image
const brand = `${imagePath}/logo-ct.png`;

export {
  brand
};


function DefaultNavbar({ routes, transparent, light, action }) {
  const [pagesMenu, setPagesMenu] = useState(false);
  
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openPagesMenu = ({ currentTarget }) => setPagesMenu(currentTarget);
  const closePagesMenu = () => setPagesMenu(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <Container>
      <SoftBox
        py={1}
        px={{ xs: transparent ? 4 : 5, sm: transparent ? 2 : 5, lg: transparent ? 0 : 5 }}
        my={2}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="section"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({ palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <SoftBox component={Link} to="/" py={transparent ? 1.5 : 0.75} lineHeight={1}>
          
          <SoftBox component={NavLink} to="/home" display="flex" alignItems="center">
          {brand && <SoftBox component="img" src={brand} alt="Soft UI Logo" width="4rem" />}
          
          </SoftBox> 
        </SoftBox>
        <SoftBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>


          
            <SoftBox
              
              mx={1}
              p={1.3}
              gap={4}
              display="flex"
              alignItems="baseline"
              color={light ? "white" : "dark"}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              <SoftTypography
                variant="button"
                fontWeight="regular"
                textTransform="capitalize"
                color="inherit"
                sx={{ fontWeight: "100%" }}
              >
                Home
              </SoftTypography>

              <SoftTypography
                variant="button"
                fontWeight="regular"
                textTransform="capitalize"
                color="inherit"
                sx={{ fontWeight: "100%" }}
              >
                Services
              </SoftTypography>

              <SoftTypography
                variant="button"
                fontWeight="regular"
                textTransform="capitalize"
                color="inherit"
                sx={{ fontWeight: "100%" }}
              >
                Business
              </SoftTypography>

             
              
            </SoftBox>




          <DefaultNavbarLink
            name="Categories"
            openHandler={openPagesMenu}
            closeHandler={closePagesMenu}
            light={light}
          />
         
        </SoftBox>
        {action &&
          (action.type === "internal" ? (
            <SoftBox display={{ xs: "none", lg: "inline-block" }}>
              <SoftButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                circular
              >
                {action.label}
              </SoftButton>
            </SoftBox>
          ) : (
            <SoftBox display={{ xs: "none", lg: "inline-block" }}>


                    <Stack spacing={3} direction="row" alignItems="center" flexGrow={1} justifyContent="flex-end">
                      <Badge badgeContent={2} color="info">

                        <IconButton
                         


                          size="small"
                          color="inherit"
                          sx={{ p: 0 }}
                        >
                          <Iconify icon="carbon:favorite" width={24} />
                        </IconButton>
                      
                      </Badge>

                      <IconButton
                        
                        size="small"
                        color="inherit"
                        sx={{ p: 0 }}
                      >
                        <Iconify icon="carbon:user" width={24} />
                      </IconButton>
                    </Stack>





            </SoftBox>
          ))}
        <SoftBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
        </SoftBox>
      </SoftBox>


      <PagesMenu routes={routes} open={pagesMenu} close={closePagesMenu} />


      


      
      {mobileView && (
        <DefaultNavbarMobile routes={routes} open={mobileNavbar} close={closeMobileNavbar} />
      )}
    </Container>
  );
}

// settings default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
