

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TeamProfileCard from "examples/Cards/TeamCards/TeamProfileCard";

import SoftButton from "components/SoftButton";

import Icon from "@mui/material/Icon";

import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";




function EditCompleted() {
  const { t } = useTranslation();



  const [menu, setMenu] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <SoftTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </SoftTypography>
      </MenuItem>
    </Menu>
  );




  // TeamProfileCard dropdown menu state
  const [marketingMenu, setMarketingMenu] = useState(null);
  const [designMenu, setDesignMenu] = useState(null);

  // TeamProfileCard dropdown menu handlers
  const openMarketingMenu = (event) => setMarketingMenu(event.currentTarget);
  const closeMarketingMenu = () => setMarketingMenu(null);
  const openDesignMenu = (event) => setDesignMenu(event.currentTarget);
  const closeDesignMenu = () => setDesignMenu(null);

  // Dropdown menu for the digital marketing TeamProfileCard
  const renderMarketingMenu = (
    <Menu
      anchorEl={marketingMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(marketingMenu)}
      onClose={closeMarketingMenu}
      keepMounted
    >
      <MenuItem onClick={closeMarketingMenu}>Action</MenuItem>
      <MenuItem onClick={closeMarketingMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMarketingMenu}>Something else here</MenuItem>
    </Menu>
  );

  // Dropdown menu for the design TeamProfileCard
  const renderDesignMenu = (
    <Menu
      anchorEl={designMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(designMenu)}
      onClose={closeDesignMenu}
      keepMounted
    >
      <MenuItem onClick={closeDesignMenu}>Action</MenuItem>
      <MenuItem onClick={closeDesignMenu}>Another action</MenuItem>
      <MenuItem onClick={closeDesignMenu}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
     
      
      <SoftBox mb={3}>

        <SoftBox display="flex" justifyContent="flex-end" mb={2}>

          <SoftBox mr={3}>
            <SoftButton variant="gradient" color="info" >
              New Listing
            </SoftButton>
          </SoftBox>

          <SoftBox display="flex">
            <SoftButton variant={menu ? "contained" : "gradient"} color="white" onClick={openMenu}>
              More Action &nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </SoftButton>
            {renderMenu}
            
          </SoftBox>
        </SoftBox>


        <Grid container spacing={3}>


          <Grid item xs={12} lg={8}>
            Hii
          </Grid>




          <Grid item xs={12} lg={4}>


            <Grid item xs={12}>
              <SoftBox mb={3}>
                <TeamProfileCard
                  title="digital marketing"
                  description="A group of people who collectively are responsible for all of the work necessary to produce working, validated assets."
                  industry="marketing team"
                  rating={4.5}
                  
                  dropdown={{
                    action: openMarketingMenu,
                    menu: renderMarketingMenu,
                  }}
                />
              </SoftBox>
            </Grid>


            <Grid item xs={12}>
              <SoftBox mb={3}>
                <TeamProfileCard
                  title="design"
                  description="Because it's about motivating the doers. Because I’m here to follow my dreams and inspire other people to follow their dreams, too."
                  industry="design team"
                  rating={5}
                  
                  dropdown={{
                    action: openDesignMenu,
                    menu: renderDesignMenu,
                  }}
                />
              </SoftBox>
            </Grid>
            
          </Grid>


        </Grid>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default EditCompleted;
