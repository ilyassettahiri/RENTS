

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

import PageLayout from "examples/LayoutContainers/PageLayout";



// Images

function CoverLayout({ image, color, header, title, description, illustration, children }) {
  return (
    <PageLayout background="white">
      
      <Grid container>




        <Grid item xs={11} sm={8} md={6} lg={5} xl={4} sx={{ mx: "auto" }}>
          
            
            <SoftBox sx={{pt: {xs: 11, md:11 }}}>{children}</SoftBox>
          
        </Grid>




      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of IllustrationLayout
CoverLayout.defaultProps = {
  color: "info",
  header: "",
  title: "",
  description: "",
  illustration: {},
};

// Typechecking props for the IllustrationLayout
CoverLayout.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  header: PropTypes.node,
  title: PropTypes.string,
  image: PropTypes.string.isRequired,

  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  illustration: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default CoverLayout;
