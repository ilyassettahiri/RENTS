/* eslint-disable react/prop-types */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import colors from "assets/theme/base/colors";
import styles from "components/SoftSelect/styles";
import SoftBox from "components/SoftBox";

const IconOption = (props) => (
  <components.Option {...props}>
    {props.data.icon && (
      <SoftBox component="img" src={props.data.icon} alt="" sx={{ width: 30, height: 30, marginRight: 1}} />
    )}
    {props.data.label}
  </components.Option>
);

const SoftSelect = forwardRef(({ size, error, success, ...rest }, ref) => {
  const { light } = colors;

  return (
    <Select
      {...rest}
      ref={ref}
      styles={styles(size, error, success)}
      components={{ Option: IconOption }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: light.main,
          primary: light.main,
        },
      })}
    />
  );
});

SoftSelect.defaultProps = {
  size: "large",
  error: false,
  success: false,
};

SoftSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default SoftSelect;
