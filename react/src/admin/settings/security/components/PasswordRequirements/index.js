import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import { useTranslation } from "react-i18next";
import SoftTypography from "components/SoftTypography";

function PasswordRequirements() {
  const { t } = useTranslation();

  const passwordRequirements = [
    t("One special characters"),
    t("Min 6 characters"),
    t("One number (2 are recommended)"),
    t("Change it often"),
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <SoftBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1.25}>
        <SoftTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </SoftTypography>
      </SoftBox>
    );
  });

  return (
    <Card id="change-password">
      <SoftBox pt={2} px={2} lineHeight={1}>
        <SoftTypography variant="h6" fontWeight="medium">
          {t("Password requirements")}
        </SoftTypography>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          {t("Please follow this guide for a strong password:")}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
          {renderPasswordRequirements}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default PasswordRequirements;
