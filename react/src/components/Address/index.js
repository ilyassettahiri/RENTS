/* eslint-disable react/prop-types */

import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import FormField from "admin/components/FormField";
import SoftTypography from "components/SoftTypography";

function Address({ address, onAddressChange }) {
  return (
    <SoftBox>
      <SoftBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              type="text"
              label="Address"
              name="address"
              value={address.address.value}
              onChange={onAddressChange}
              placeholder="Eg. Center Ville"
              error={address.address.error}
            />

            {address.address.error && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                {address.address.textError || "Address is required"}
              </SoftTypography>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            <FormField
              type="text"
              label="City"
              name="city"
              value={address.city.value}
              onChange={onAddressChange}
              placeholder="Eg. Marrakech"
              error={address.city.error}
            />

            {address.city.error && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                {address.city.textError || "City is required"}
              </SoftTypography>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            <FormField
              type="text"
              label="Country"
              name="country"
              value={address.country.value}
              onChange={onAddressChange}
              placeholder="Eg. Argentina"
              error={address.country.error}
            />

            {address.country.error && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                {address.country.textError || "Country is required"}
              </SoftTypography>
            )}
          </Grid>

          <Grid item xs={12} md={2}>
            <FormField
              type="text"
              label="Zip"
              name="zip"
              value={address.zip.value}
              onChange={onAddressChange}
              placeholder="Eg. 123456"
              error={address.zip.error}
            />

            {address.zip.error && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                {address.zip.textError || "Zip code is required"}
              </SoftTypography>
            )}
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

export default Address;
