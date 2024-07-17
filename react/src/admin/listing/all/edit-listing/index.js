/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftEditor from "components/MDEditor";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import DateRange from "components/DateRange";
import dayjs from "dayjs";

// NewProduct page components
import FormField from "admin/components/FormField";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Custom components
import Pricing from "admin/listing/all/create-listing/components/Pricing";
import Address from "components/Address"; // Correct import statement
import CustomFileInput from "admin/listing/all/create-listing/components/CustomFileInput";

import CrudService from "services/cruds-service";



import Billiards from 'admin/listing/all/create-listing/components/ListingDetail/Billiards';
import Boxings from 'admin/listing/all/create-listing/components/ListingDetail/Boxings';





function EditListing() {
  

  return (
    <DashboardLayout>
      
    </DashboardLayout>
  );
}

export default EditListing;