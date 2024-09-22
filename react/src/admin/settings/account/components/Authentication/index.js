
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftBadge from "components/SoftBadge";

function Authentication() {
  const { t } = useTranslation();

  return (
    <Card id="2fa" sx={{ overflow: "visible" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftTypography variant="h5">Two-factor authentication</SoftTypography>
        <SoftBadge variant="contained" color="success" badgeContent="enabled" container />
      </SoftBox>
      <SoftBox p={3}>
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <SoftTypography variant="body2" color="text">
            Security keys
          </SoftTypography>
          <SoftBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <SoftBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <SoftTypography variant="button" color="text" fontWeight="regular">
                No Security keys
              </SoftTypography>
            </SoftBox>
            <SoftButton variant="outlined" color="dark" size="small">
              add
            </SoftButton>
          </SoftBox>
        </SoftBox>
        <Divider />
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <SoftTypography variant="body2" color="text">
            SMS number
          </SoftTypography>
          <SoftBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <SoftBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <SoftTypography variant="button" color="text" fontWeight="regular">
                +3012374423
              </SoftTypography>
            </SoftBox>
            <SoftButton variant="outlined" color="dark" size="small">
              edit
            </SoftButton>
          </SoftBox>
        </SoftBox>
        <Divider />
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <SoftTypography variant="body2" color="text">
            Authenticator app
          </SoftTypography>
          <SoftBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <SoftBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Not Configured
              </SoftTypography>
            </SoftBox>
            <SoftButton variant="outlined" color="dark" size="small">
              set up
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Authentication;
