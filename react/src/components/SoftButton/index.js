

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import SoftTypography from "components/SoftTypography";

// Custom styles for SoftButton
import SoftButtonRoot from "components/SoftButton/SoftButtonRoot";

const SoftButton = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => (
    <SoftButtonRoot
      {...rest}
      ref={ref}
      color={color}
      variant={variant === "gradient" ? "contained" : variant}
      size={size}
      ownerState={{ color, variant, size, circular, iconOnly }}
    >


         {children}
      


    </SoftButtonRoot>
  )
);

// settings default values for the props of SoftButton
SoftButton.defaultProps = {
  size: "medium",
  variant: "gradient",
  color: "white",
  circular: false,
  iconOnly: false,
};

// Typechecking props for the SoftButton
SoftButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default SoftButton;
