
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

function FormField({ label, ...rest }) {
  return (
    <>
      <SoftBox p={2} ml={0.5} lineHeight={0} >
        
      
        <SoftInput {...rest} />

      </SoftBox>
    </>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormField;
