/* eslint-disable react/prop-types */

import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import FormField from "admin/components/FormField";
import SoftTypography from "components/SoftTypography";


function Address({ address, onAddressChange, addressError, cityError, zipError }) {


  return (
    <SoftBox>
      <SoftBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              type="text"
              label="Address"
              name="address"
              value={address.address}
              onChange={onAddressChange}
              placeholder="Eg. Center Ville "
              error={addressError}

            />

            {addressError && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                Address is required
              </SoftTypography>
            )}

          </Grid>
          <Grid item xs={12} md={5}>
            <FormField
              type="text"
              label="City"
              name="city"
              value={address.city}
              onChange={onAddressChange}
              placeholder="Eg. Marrakech"
              error={cityError}

            />


            {cityError && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                City is required
              </SoftTypography>
            )}


          </Grid>
          <Grid item xs={12} md={5}>
            <FormField
              type="text"
              label="Country"
              name="country"
              value={address.country}
              onChange={onAddressChange}
              placeholder="Eg. Argentina"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormField
              type="text"
              label="Zip"
              name="zip"
              value={address.zip}
              onChange={onAddressChange}
              placeholder="Eg. 123456"
              error={zipError}

            />

            {zipError && (
              <SoftTypography variant="caption" color="error" fontWeight="light">
                Zip code is required
              </SoftTypography>
            )}


          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

export default Address;
