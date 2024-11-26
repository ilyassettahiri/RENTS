/* eslint-disable react/prop-types */

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import { useTranslation } from 'react-i18next';

// NewProduct page components
import FormField from "admin/components/FormField";

function Pricing({ pricing, onPricingChange }) {

  const { t } = useTranslation();


  return (
    <SoftBox>
      <SoftBox>







        <Grid container spacing={3}>




          {/* Phone Number Field */}
          <Grid item xs={12} sm={12}>
            <FormField
              type="text"
              label={t("Phone Number")}

              placeholder="0611111111"
              name="phone"
              value={pricing.phone.value}
              onChange={onPricingChange}
              error={pricing.phone.error}
            />

            {pricing.phone.error && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                {pricing.phone.textError || "Phone number is required"}
              </SoftTypography>
            )}
          </Grid>




          {/* Price Field */}
          <Grid item xs={12} sm={4}>
            <FormField
              type="text"
              label={t("Price")}
              placeholder="99.00"
              name="price"
              value={pricing.price.value}
              onChange={onPricingChange}
              error={pricing.price.error}
            />

            {pricing.price.error && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                {pricing.price.textError || "Valid price is required"}
              </SoftTypography>
            )}
          </Grid>

          {/* Per Field */}
          <Grid item xs={12} sm={4}>
            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
              {t("Per")}
                <span style={{ color: "red" }}> *</span>
              </SoftTypography>
            </SoftBox>
            <SoftSelect
              value={{ value: pricing.per.value, label: t(pricing.per.value) }}
              options={[
                { value: "Day", label: t("Day") },
                { value: "Hour", label: t("Hour") },
                { value: "Week", label: t("Week") },
                { value: "Month", label: t("Month") },
                { value: "Year", label: t("Year") },
              ]}
              onChange={(option) => onPricingChange(null, "per", option.value)}
            />
          </Grid>

          {/* Currency Field */}
          <Grid item xs={12} sm={4}>
            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
              {t("Currency")}
                <span style={{ color: "red" }}> *</span>
              </SoftTypography>
            </SoftBox>
            <SoftSelect
              value={{ value: pricing.currency.value, label: pricing.currency.value }}
              options={[
                { value: "MAD", label: "MAD" },
                { value: "EUR", label: "EUR" },
                { value: "USD", label: "USD" },
              ]}
              onChange={(option) => onPricingChange(null, "currency", option.value)}
            />
          </Grid>

          
        </Grid>




      </SoftBox>
    </SoftBox>
  );
}


export default Pricing;
