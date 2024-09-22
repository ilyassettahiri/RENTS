
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

function CustomerCell({ image, name, color, linkPath }) {
  return (
    <SoftBox display="flex" alignItems="center" component={NavLink} to={linkPath}>
      <SoftBox mr={1}>
        <SoftAvatar bgColor={color} src={`${process.env.REACT_APP_IMAGE_BASE_URL}${image}`} alt={name} size="xs" />
      </SoftBox>
      <SoftTypography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        {name}
      </SoftTypography>
    </SoftBox>
  );
}

// settings default value for the props of CustomerCell
CustomerCell.defaultProps = {
  image: "/team-1.jpg",
  color: "info",
};

// Typechecking props for the CustomerCell
CustomerCell.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
    linkPath: PropTypes.string.isRequired,


  color: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
};

export default CustomerCell;
