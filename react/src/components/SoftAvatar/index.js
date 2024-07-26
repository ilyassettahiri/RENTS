/* eslint-disable react/prop-types */

import { forwardRef } from "react";
import PropTypes from "prop-types";
import SoftAvatarRoot from "components/SoftAvatar/SoftAvatarRoot";

const SoftAvatar = forwardRef(({ bgColor, size, shadow, src, ...rest }, ref) => {
  // Determine if the src is a blob URL or a remote URL
  const isBlobURL = src.startsWith('blob:');

  // Use base URL only for remote URLs
  const imageUrl = isBlobURL
    ? src
    : `${process.env.REACT_APP_IMAGE_BASE_URL}${src}`;

  return (
    <SoftAvatarRoot
      ref={ref}
      ownerState={{ shadow, bgColor, size }}
      src={imageUrl}
      {...rest}
    />
  );
});

// Settings default values for the props of SoftAvatar
SoftAvatar.defaultProps = {
  bgColor: "transparent",
  size: "md",
  shadow: "none",
};

// Typechecking props for the SoftAvatar
SoftAvatar.propTypes = {
  bgColor: PropTypes.oneOf([
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
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.oneOf(["none", "xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
  src: PropTypes.string, // Ensure src is a string
};

export default SoftAvatar;
