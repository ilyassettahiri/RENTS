// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

function DeleteAccount() {
  const { t } = useTranslation();

  return (
    <Card id="delete-account">
      <SoftBox p={3} lineHeight={1}>
        <SoftBox mb={1}>
          <SoftTypography variant="h5">{t("Delete Account")}</SoftTypography>
        </SoftBox>
        <SoftTypography variant="button" color="text" fontWeight="regular">
          {t("Once you delete your account, there is no going back. Please be certain.")}
        </SoftTypography>
      </SoftBox>
      <SoftBox
        pb={3}
        px={3}
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <SoftBox display="flex" alignItems="center" mb={{ xs: 3, sm: 0 }}>
          <Switch />
          <SoftBox ml={2} lineHeight={0}>
            <SoftTypography display="block" variant="button" fontWeight="medium">
              {t("Confirm")}
            </SoftTypography>
            <SoftTypography variant="caption" color="text">
              {t("I want to delete my account.")}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
          <SoftButton variant="outlined" color="secondary">
            {t("Deactivate")}
          </SoftButton>
          <SoftBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
            <SoftButton variant="gradient" color="error" sx={{ height: "100%" }}>
              {t("Delete Account")}
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default DeleteAccount;
