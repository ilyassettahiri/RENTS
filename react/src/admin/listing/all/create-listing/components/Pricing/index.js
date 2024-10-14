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

function Pricing({ pricing, onPricingChange, onSelectChange, priceError, phoneError }) {
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
              error={priceError}

            />


            {priceError && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                Valid price is required
              </SoftTypography>
            )}


          </Grid>
          <Grid item xs={12} sm={4}>
            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                Currency

                <span style={{ color: "red",}}> * </span>

              </SoftTypography>
            </SoftBox>
            <SoftSelect
              defaultValue={{ value: pricing.currency, label: pricing.currency }} 
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
              value={pricing.phone}
              onChange={onPricingChange}
              error={phoneError}

            />

            {phoneError && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                Phone number is required
              </SoftTypography>
            )}

          </Grid>
        </Grid>
      </SoftBox>
      
    </SoftBox>
  );
}

export default Pricing;
