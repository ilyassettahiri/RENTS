

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


        
        <Grid item xs={12} lg={6}>
          <SoftBox
            display={{ xs: "none", lg: "flex" }}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            position="relative"
            borderRadius="lg"
            textAlign="center"
            bgColor={color}
            variant="gradient"
            m={2}
            px={13}
            sx={{ overflow: "hidden" }}
          >
            <SoftBox
              component="img"
              src={image}
              alt="pattern-lines"
              width="120rem"
              position="absolute"
              topl={0}
              left={0}
              opacity={0.4}
            />
            {illustration.image && (
              <SoftBox
                component="img"
                src={illustration.image}
                alt="chat-illustration"
                width="100%"
                maxWidth="31.25rem"
              />
            )}
            {illustration.title && (
              <SoftBox mt={6} mb={1}>
                <SoftTypography variant="h4" color="white" fontWeight="bold">
                  {illustration.title}
                </SoftTypography>
              </SoftBox>
            )}
            {illustration.description && (
              <SoftBox mb={1}>
                <SoftTypography variant="body2" color="white">
                  {illustration.description}
                </SoftTypography>
              </SoftBox>
            )}
          </SoftBox>
        </Grid>



        <Grid item xs={11} sm={8} md={6} lg={5} xl={4} sx={{ mx: "auto" }}>
          <SoftBox display="flex" flexDirection="column" justifyContent="center" height="100%">
            
            <SoftBox sx={{pt: {xs: 11, md:4 }}}>{children}</SoftBox>
          </SoftBox>
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
