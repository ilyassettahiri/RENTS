/* eslint-disable react/prop-types */

import React from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

function OrderInfo({ title, status, description, picture }) {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <SoftBox display="flex" alignItems="center">
          <SoftBox mr={2}>
            <SoftAvatar
              variant="rounded"
              size="xxl"
              src={picture}
              alt={title}
            />
          </SoftBox>
          <SoftBox lineHeight={1}>
            <SoftTypography variant="h6" fontWeight="medium">
              {title}
            </SoftTypography>
            <SoftBox mb={2}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                {description}
              </SoftTypography>
            </SoftBox>
            <SoftBadge
              variant="gradient"
              color={status === "active" ? "success" : "warning"}
              size="xs"
              badgeContent={status}
              container
            />
          </SoftBox>
        </SoftBox>
      </Grid>
    </Grid>
  );
}

export default OrderInfo;
