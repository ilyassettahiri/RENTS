import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function ProductCell({ image, name, checked, linkPath }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} />
      <SoftBox mx={2} width="3.75rem" component={NavLink}  to={linkPath}>
        <SoftBox component="img" src={`${process.env.REACT_APP_IMAGE_BASE_URL}${image}`} alt={name} width="100%" />
      </SoftBox>
      <SoftTypography variant="button" fontWeight="medium" component={NavLink}  to={linkPath}>
        {name}
      </SoftTypography>
    </SoftBox>
  );
}

// settings default value for the props of ProductCell
ProductCell.defaultProps = {
  checked: false,
};

// Typechecking props for the ProductCell
ProductCell.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  linkPath: PropTypes.string.isRequired,
};

export default ProductCell;
