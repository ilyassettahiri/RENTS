

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

function DefaultNavbarCategory({ color, icon, title }) {
  return (
    <SoftBox width="100%" display="flex" alignItems="center" py={1}>
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="1.5rem"
        height="1.5rem"
        borderRadius="md"
        color="white"
        bgColor={color}
        variant="gradient"
        mr={1}
      >
        {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
      </SoftBox>
      <SoftTypography variant="button" fontWeight="bold">
        {title}
      </SoftTypography>
    </SoftBox>
  );
}

// settings default value for the props of DefaultNavbarCategory
DefaultNavbarCategory.defaultProps = {
  color: "info",
};

// Typechecking props for the DefaultNavbarCategory
DefaultNavbarCategory.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default DefaultNavbarCategory;
