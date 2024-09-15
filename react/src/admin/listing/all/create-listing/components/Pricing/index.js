/* eslint-disable react/prop-types */

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";

// NewProduct page components
import FormField from "admin/components/FormField";

function Pricing({ pricing, onPricingChange, onSelectChange }) {
  return (
    <SoftBox>
      
      <SoftBox >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormField
              type="text"
              label="price"
              placeholder="99.00"
              name="price"
              value={pricing.price}
              onChange={onPricingChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                Currency
              </SoftTypography>
            </SoftBox>
            <SoftSelect
              defaultValue={{ value: "usd", label: "USD" }}
              options={[
                { value: "dh", label: "DH" },
                { value: "eur", label: "EUR" },
                { value: "usd", label: "USD" },
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
              value={pricing.phone}
              onChange={onPricingChange}
            />
          </Grid>
        </Grid>
      </SoftBox>
      
    </SoftBox>
  );
}

export default Pricing;
