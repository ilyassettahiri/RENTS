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
      <SoftTypography variant="h5">Pricing</SoftTypography>
      <SoftBox mt={3}>
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
              label="SKU"
              placeholder="71283476591"
              name="sku"
              value={pricing.sku}
              onChange={onPricingChange}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mt={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Tags
              </SoftTypography>
            </SoftBox>
            <SoftSelect
              defaultValue={[
                { value: "in stock", label: "In Stock" },
                { value: "out of stock", label: "Out of Stock" },
              ]}
              options={[
                { value: "black friday", label: "Black Friday" },
                { value: "expired", label: "Expired", isDisabled: true },
                { value: "out of stock", label: "Out of Stock" },
                { value: "in stock", label: "In Stock" },
                { value: "sale", label: "Sale" },
              ]}
              size="large"
              isMulti
              onChange={(options) => onSelectChange("tags", options.map((option) => option.value))}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

export default Pricing;
