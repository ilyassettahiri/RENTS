
import { useState } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';

function DefaultNavbarMenu({ open, close, placement, children, style }) {
  const [anchor, setAnchor] = useState(false);

  const openMenu = () => setAnchor(open);
  const closeMenu = () => setAnchor(false);
  return (
    <Popper
      anchorEl={anchor || open}
      popperRef={null}
      open={Boolean(anchor) || Boolean(open)}
      placement={placement}
      transition
      style={{ zIndex: 10, ...style }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} sx={{ transformOrigin: "left top" }}>
          <SoftBox
            bgColor="white"
            shadow="lg"
            borderRadius="xl"
            p={2}
            onMouseEnter={openMenu}
            onMouseLeave={(close, closeMenu)}
          >
            {children}
          </SoftBox>
        </Grow>
      )}
    </Popper>
  );
}

// settings default values for the props of DefaultNavbarMenu
DefaultNavbarMenu.defaultProps = {
  placement: "bottom-start",
  style: {},
};

// Typechecking props for the DefaultNavbarMenu
DefaultNavbarMenu.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
  placement: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default DefaultNavbarMenu;
