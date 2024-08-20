
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";

// Custom styles for the SidenavItem
import { item, itemContent, itemArrow } from "examples/Sidenav/styles/sidenavItem";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController } from "context";

function SidenavItem({ name, active, nested, children, open, ...rest }) {
  const [controller] = useSoftUIController();
  const { miniSidenav } = controller;

  return (
    <>
      <ListItem {...rest} component="li" sx={item}>
        <SoftBox sx={(theme) => itemContent(theme, { active, miniSidenav, name, nested })}>
          <ListItemText primary={name} />
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
};

export default SidenavItem;
