import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

import  Image  from 'components/image';


function ProductCell({ image, name, checked, linkPath }) {
  return (
    <SoftBox display="flex" alignItems="center">
      
      <SoftBox mx={2} width="4rem" component={NavLink}  to={linkPath}>
        <Image
          src={image}
          alt={name}
          ratio="1/1"
          width="100%"
          sx={{ borderRadius: '10px' }}
          
        />
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
