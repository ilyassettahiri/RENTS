
/* eslint-disable react/prop-types */


// react-router-dom components
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';
import ListActionHeader from "admin/components/ListActionHeader";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import SoftBadgeDot from "components/SoftBadgeDot";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import ComplexReportsDoughnutChart from "examples/Charts/DoughnutCharts/ComplexReportsDoughnutChart";

// Analytics application components
import Social from "admin/analytics/components/Social";
import Pages from "admin/analytics/components/Pages";

// Data
import defaultLineChartData from "admin/analytics/data/defaultLineChartData";
import complexReportsDoughnutChartData from "admin/analytics/data/complexReportsDoughnutChartData";




function Analytics() {
  const { t } = useTranslation();

  


  let { state } = useLocation();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);





  useEffect(() => {
    (async () => {
      const response = await CrudService.getAnalytics();

      console.log(' fetched:', response.data);


      setData(response.data);
    })();
  }, []);






  return (
    <DashboardLayout>
      
      <SoftBox my={3}>
        





        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <MiniStatisticsCard
                title={{ text: "users", fontWeight: "medium" }}
                count="930"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "account_circle" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MiniStatisticsCard
                title={{ text: "new users", fontWeight: "medium" }}
                count="744"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MiniStatisticsCard
                title={{ text: "sessions", fontWeight: "medium" }}
                count="1,414"
                percentage={{ color: "success", text: "-2%" }}
                icon={{ color: "info", component: "watch" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MiniStatisticsCard
                title={{ text: "Pages/Session", fontWeight: "medium" }}
                count="1.76"
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: "image" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <DefaultLineChart
                title="Traffic channels"
                description={
                  <SoftBox display="flex" ml={-1}>
                    <SoftBadgeDot color="info" size="sm" badgeContent="Organic search" />
                    <SoftBadgeDot color="info" size="sm" badgeContent="Referral" />
                    <SoftBadgeDot color="primary" size="sm" badgeContent="Social media" />
                  </SoftBox>
                }
                chart={defaultLineChartData}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <ComplexReportsDoughnutChart
                title="Referrals"
                chart={complexReportsDoughnutChartData}
                tooltip="See which websites are sending traffic to your website"
                action={{
                  type: "internal",
                  route: "/",
                  color: "secondary",
                  
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Social />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Pages />
          </Grid>
        </Grid>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default Analytics;
