import { useState, useEffect } from "react";


import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";





function ListActionHeader({ title, clickAddHandler }) {



    const { t } = useTranslation();

  // menu

    
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
        <>

                <SoftBox display="flex" justifyContent="flex-end" mb={5}>
                        
                    <SoftBox display="flex" alignItems="center">

                        <SoftBox mr={2}>
                            <SoftButton   sx={{ px:3, py: 1.5 }} variant="gradient" type="submit" onClick={clickAddHandler} color="info">

                            
                            <SoftTypography color="white" variant="caption" fontWeight="medium" >
                                {t(title)} 
                            </SoftTypography>

                            </SoftButton>
                        </SoftBox>

                        <SoftBox display="flex">
                            <SoftButton sx={{ px:3, py: 1.5 }} variant="outlined" color="white" onClick={openMenu}>
                            
                            


                                <SoftBox display="flex" alignItems="center" gap={1}> {/* Flexbox to align icon and text */}
                                <SoftTypography color="dark" variant="caption" fontWeight="medium">
                                {t('More Action')} 
                                </SoftTypography>
                                <Icon>keyboard_arrow_down</Icon>
                                </SoftBox>
                            </SoftButton>
                            {renderMenu}
                            
                        </SoftBox>
                    

                    </SoftBox>


                </SoftBox>



          
        </>
      );



}


    // Typechecking props for the FaqCollapse
ListActionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    clickAddHandler: PropTypes.func.isRequired,
};
  
  export default ListActionHeader;
  