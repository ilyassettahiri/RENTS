import { forwardRef } from "react";
import PropTypes from "prop-types";
import ReactCountryFlag from "react-country-flag";

// @mui material components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

// custom styles for the DefaultItem
import { defaultItemIconBox } from "examples/Items/DefaultItem/styles";

const DefaultItem = forwardRef(({ color, countryCode, title, ...rest }, ref) => (
  <SoftBox 
    {...rest} 
    ref={ref} 
    display="flex" 
    alignItems="center" 
    sx={{ 
      cursor: 'pointer',  // Add cursor pointer
      '&:hover': { 
        backgroundColor: '#f9f9f9'  // Change background color on hover
      },
      borderRadius: '8px',  // Optional: Add border-radius to enhance hover effect
      p: 0  // Optional: Add padding for spacing
    }}
  >
    <SoftBox sx={(theme) => defaultItemIconBox(theme, { color })}>
      <ReactCountryFlag 
        countryCode={countryCode}
        svg
        style={{
          width: '2em',
          height: '2em',
          borderRadius: '10px',
        }}
      />
    </SoftBox>
    <SoftBox  > {/* Add margin-left for spacing */}
      <SoftTypography display="block" variant="button" fontWeight="medium">
        {title}
      </SoftTypography>
    </SoftBox>
  </SoftBox>
));

// settings default values for the props of DefaultItem
DefaultItem.defaultProps = {
  color: "info",
};

// Typechecking props for the DefaultItem
DefaultItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  countryCode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DefaultItem;
