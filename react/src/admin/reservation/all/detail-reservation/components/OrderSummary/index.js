
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

function OrderSummary() {
  const { t } = useTranslation();

  return (
    <>
      <SoftBox mb={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Order Summary
        </SoftTypography>
      </SoftBox>
      <SoftBox display="flex" justifyContent="space-between" mb={0.5}>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          Product Price:
        </SoftTypography>
        <SoftBox ml={1}>
          <SoftTypography variant="body2" fontWeight="medium">
            $90
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox display="flex" justifyContent="space-between" mb={0.5}>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          Delivery:
        </SoftTypography>
        <SoftBox ml={1}>
          <SoftTypography variant="body2" fontWeight="medium">
            $14
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox display="flex" justifyContent="space-between" mb={0.5}>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          Taxes:
        </SoftTypography>
        <SoftBox ml={1}>
          <SoftTypography variant="body2" fontWeight="medium">
            $1.95
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox display="flex" justifyContent="space-between" mt={3}>
        <SoftTypography variant="body1" fontWeight="light" color="text">
          Total:
        </SoftTypography>
        <SoftBox ml={1}>
          <SoftTypography variant="body1" fontWeight="medium">
            $1.95
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </>
  );
}

export default OrderSummary;
