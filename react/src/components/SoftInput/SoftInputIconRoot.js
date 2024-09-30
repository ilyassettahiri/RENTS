

// @mui material components
import Icon from "@mui/material/Icon";
import { styled } from "@mui/material/styles";

export default styled(Icon)(({ theme, ownerState }) => {
  const { typography, palette } = theme;
  const { size } = ownerState;

  const { fontWeightBold, size: fontSize } = typography;
  const { grey } = palette;
  return {
    fontWeight: fontWeightBold,
    fontSize: size === "small" && `${fontSize.md} !important`,
    backgroundColor: `${grey[100]} !important`, 
  };
});
