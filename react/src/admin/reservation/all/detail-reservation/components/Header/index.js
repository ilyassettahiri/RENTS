/* eslint-disable react/prop-types */

import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import CrudService from "services/cruds-service"; // Ensure this path is correct

function Header({ orderNumber, orderDate }) {
  const navigate = useNavigate();



  return (
    <SoftBox display="flex" justifyContent="space-between" alignItems="center">
      <SoftBox>
        <SoftBox mb={1}>
          <SoftTypography variant="h6" fontWeight="medium">
            Order Details
          </SoftTypography>
        </SoftBox>
        <SoftTypography component="p" variant="button" fontWeight="regular" color="text">
          Order no. {orderNumber}
        </SoftTypography>
        <SoftTypography component="p" variant="button" fontWeight="regular" color="text">
          Created at: {format(new Date(orderDate), "d MMM, h:mm a")}
        </SoftTypography>
      </SoftBox>
      
    </SoftBox>
  );
}

export default Header;
