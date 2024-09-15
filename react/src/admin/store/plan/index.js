// react-router-dom components
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "admin/store/plan/data/dataTableData";

function Plan() {
  const { t } = useTranslation();







  let { state } = useLocation();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);





  useEffect(() => {
    (async () => {
      const response = await CrudService.getPlans();

      console.log(' fetched:', response.data);


      setData(response.data);
    })();
  }, []);








  return (
    <DashboardLayout>
      
      
    </DashboardLayout>
  );
}

export default Plan;
