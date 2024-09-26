
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React components
import borders from "assets/theme/base/borders";
import SuiAvatar from "components/SoftAvatar";
import Basket from "examples/Icons/Basket";
import SoftAvatar from "components/SoftAvatar";



function CollapseList({ title, open, image, children, ...rest }) {
  const { borderWidth, borderColor } = borders;

  return (
    <SoftBox mb={2} border={`${borderWidth[1]} solid ${borderColor}`} borderRadius={10}>
      <SoftBox
        {...rest}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        
        sx={{ cursor: "pointer" }}
      >
        
        <SoftTypography variant="h5" color={open ? "dark" : "text"} sx={{ userSelect: "none" }}>
            
              
              <SoftBox display="flex" >
                <SoftBox display="flex" sx={{ mr: 1}} > 
                
                  {image}
                

                </SoftBox>
                <SoftBox display="flex" sx={{ mt: 1, fontSize: '14px'}} >{title} </SoftBox>
              </SoftBox>
        </SoftTypography>
        
        <SoftBox color={open ? "dark" : "text"} >
          <Icon sx={{ fontWeight: "bold" }} fontSize="small">
            {open ? "remove" : "add"}
          </Icon>
        </SoftBox>
      </SoftBox>
      <Collapse timeout={10} in={open} >
        <SoftBox p={1} lineHeight={1} >
          <SoftTypography variant="button" color="text" opacity={0.8} fontWeight="regular" >
            {children}
          </SoftTypography>
        </SoftBox>
      </Collapse>
    </SoftBox>
  );
}

// Typechecking props for the FaqCollapse
CollapseList.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  image: PropTypes.node.isRequired,
};

export default CollapseList;
