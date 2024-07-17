
import { styled } from "@mui/material/styles";
import grey from "@mui/material/colors/grey"; // Import the grey color


export default styled("div")(({ theme, ownerState }) => {
  const { palette, borders, typography } = theme;
  const { darkMode } = ownerState;

  const { borderRadius } = borders;
  const { size } = typography;
  const { text, white, dark } = palette;

  return {
    "& .ql-toolbar": {
      borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,

      "& .ql-picker, & .ql-stroke": {
        stroke: `${darkMode ? white.main : dark.main} !important`,
        color: `${darkMode ? white.main : dark.main} !important`,
      },
    },

    "& .ql-container": {
      borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`,
    },

    "& .ql-editor": {
      color: darkMode ? white.main : text.main,

      paddingBottom: "7rem", // Add bottom padding here
      borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`,

      paddingTop: "2rem", // Add bottom padding here

      backgroundColor: darkMode ? grey[900] : grey[100], // Add light gray background
      "&::placeholder": {
        color: darkMode ? grey[500] : grey[600], // Placeholder text color
        fontStyle: "italic", // Optional: make placeholder italic
      },

      "& p": {
        fontSize: size.md,
        color: darkMode ? white.main : text.main,
      },

      "& ul li": {
        color: darkMode ? white.main : text.main,
      },
    },
  };
});
