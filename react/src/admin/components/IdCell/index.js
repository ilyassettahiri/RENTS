
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

function IdCell({ id, checked }) {
  return (
    <SoftBox display="flex" alignItems="center">
      
      <SoftBox ml={1} maxWidth= "50px">
        <SoftTypography variant="caption" fontWeight="medium" color="text">
          {id}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// settings default value for the props of IdCell
IdCell.defaultProps = {
  checked: false,
};

// Typechecking props for the IdCell
IdCell.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default IdCell;
