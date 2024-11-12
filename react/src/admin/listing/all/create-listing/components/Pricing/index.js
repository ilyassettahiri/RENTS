/* eslint-disable react/prop-types */

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";

// NewProduct page components
import FormField from "admin/components/FormField";

function Pricing({ pricing, onPricingChange, onSelectChange }) {
  return (
    <SoftBox>
      <SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormField
              type="text"
              label="Price"
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

          <Grid item xs={12} sm={4}>
            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                Currency
                <span style={{ color: "red" }}> *</span>
              </SoftTypography>
            </SoftBox>
            <SoftSelect
              value={{ value: pricing.currency.value, label: pricing.currency.value }}
              options={[
                { value: "DH", label: "DH" },
                { value: "EUR", label: "EUR" },
                { value: "USD", label: "USD" },
              ]}
              onChange={(option) => onSelectChange("currency", option.value)}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <FormField
              type="text"
              label="Phone Number"
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
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

export default Pricing;
