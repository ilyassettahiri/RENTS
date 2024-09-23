/* eslint-disable react/prop-types */

import React from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import  Image  from 'components/image';


function OrderInfo({ title, picture }) {


  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <SoftBox display="flex" alignItems="center">
          <SoftBox mr={2} width="4rem" >
            

            <Image
              src={`${process.env.REACT_APP_IMAGE_BASE_URL}${picture}`}
              alt={title}
              ratio="1/1"
              width="100%"
              sx={{ borderRadius: '10px' }}
              
            />
          </SoftBox>
          <SoftBox lineHeight={1}>
            <SoftTypography variant="h6" fontWeight="medium">
              {title}
            </SoftTypography>
            <SoftBox mb={2}>
              
            </SoftBox>
            
          </SoftBox>
        </SoftBox>
      </Grid>
    </Grid>
  );
}

export default OrderInfo;
