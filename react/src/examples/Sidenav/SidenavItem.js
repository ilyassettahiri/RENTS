
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';

// Custom styles for the SidenavItem
import { item, itemContent, itemArrow } from "examples/Sidenav/styles/sidenavItem";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController } from "context";

function SidenavItem({ name, active, nested, children, count, open, ...rest }) {
  const [controller] = useSoftUIController();
  const { miniSidenav } = controller;

  return (
    <>
      <ListItem {...rest} component="li" sx={item}>
        <SoftBox sx={(theme) => itemContent(theme, { active, miniSidenav, name, nested })}>
          <ListItemText primary={name} />


          {count !== undefined && (
            <SoftTypography  
            
            variant="caption"
            fontWeight="bold"
            sx={{
              ml: 2,
              backgroundColor: 'lightblue', // Add light blue background color
              padding: '2px 8px', // Add padding for better appearance
              borderRadius: '4px', // Round the corners
              display: 'inline-block' // Ensure it displays correctly
            }}
            >
              {count} 
            </SoftTypography>
          )}


          {children && (
            <Icon component="i" sx={(theme) => itemArrow(theme, { open, miniSidenav })}>
              expand_less
            </Icon>
          )}
        </SoftBox>
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// settings default values for the props of SidenavItem
SidenavItem.defaultProps = {
  active: false,
  nested: false,
  children: false,
  open: false,
};

// Typechecking props for the SidenavItem
SidenavItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  nested: PropTypes.bool,
  children: PropTypes.node,
  open: PropTypes.bool,
  count: PropTypes.number,
};

export default SidenavItem;
