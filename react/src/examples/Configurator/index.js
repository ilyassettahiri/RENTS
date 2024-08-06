/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

// react-github-btn
import GitHubButton from "react-github-btn";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import SoftAvatar from "components/SoftAvatar";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";
import AuthService from "services/auth-service";


// Soft UI Dashboard PRO React context
import {
  useSoftUIController,
  setOpenConfigurator,
  
 
 
} from "context";

function Configurator({user}) {


  const [info, setInfo] = useState({
    
    name: '',
    
    email: '',

    profile_image: '',
   
  });

  useEffect(() => {
    setInfo({
      
      name: user.name,
      
      email: user.email,
      profile_image: user.profile_image,
      
    });
    
  }, [user]);


  const handleLogOut = async () => {
    try {
      await AuthService.logout();
      authContext.logout();
    } catch (err) {
      console.error(err);
      return null;
    }
  };


  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } =
    controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    boxShadows: { buttonBoxShadow },
  }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: dark.main,
            strokeWidth: "4px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </SoftBox>

      

      <SoftBox pt={1.25} pb={3} px={3}>
        <SoftBox >
          
          

          <SoftBox mb={0.5} display="flex" justifyContent="center">
            {info.profile_image &&  <SoftAvatar src={info.profile_image} alt="profile-image" size="xl" shadow="sm" /> } 


            
          </SoftBox>

            <SoftTypography variant="h6" color="text" fontWeight="regular" display="flex" justifyContent="center">
                {info.name} 
            </SoftTypography>
            <SoftTypography variant="button" color="text" fontWeight="regular" display="flex" justifyContent="center">
              {info.email} 
            </SoftTypography>

        </SoftBox>

       

        

        <Divider />

        

        <Divider />

        <SoftBox mt={3} mb={2}>
          <SoftBox mb={2}>
            <SoftButton
              onClick={handleLogOut}
              color="info"
              variant="gradient"
              fullWidth
            >
              Sign Out
            </SoftButton>
          </SoftBox>
          
        </SoftBox>
        
      </SoftBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
