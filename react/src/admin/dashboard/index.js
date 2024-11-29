// react-router-dom components
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";




import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Globe from "examples/Globe";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";
import breakpoints from "assets/theme/base/breakpoints";

// Data
import salesTableData from "admin/dashboard/data/salesTableData";
import reportsBarChartData from "admin/dashboard/data/reportsBarChartData";
import gradientLineChartData from "admin/dashboard/data/gradientLineChartData";

function Dashboard() {
  const { t } = useTranslation();

  const { values } = breakpoints;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;


  


  let { state } = useLocation();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();



  // Use React Query to fetch dashboard data
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => CrudService.getDashboard(),
    onError: (error) => {
      console.error('Failed to fetch dashboard:', error);
    },
  });

  // Memoize data from the dashboard
  const topListingsRows = useMemo(() => {
    if (!dashboardData) return [];

    return dashboardData.data.attributes.topListingsThisMonths.map(listing => ({
      title: [listing.picture, listing.title],
      price: `${listing.price} dh`,
      //status: listing.status,
      status: "Active",

    }));
  }, [dashboardData]);

  const currentMonthReservations = useMemo(() => {
    if (!dashboardData) return [];

    return dashboardData.data.attributes.currentMonthReservationHistory.map(day => ({
      date: day.date,
      count: day.count,
    }));
  }, [dashboardData]);

  const lastMonthReservations = useMemo(() => {
    if (!dashboardData) return [];

    return dashboardData.data.attributes.lastMonthReservationHistory.map(day => ({
      date: day.date,
      count: day.count,
    }));
  }, [dashboardData]);

  const reservationsPerMonth = useMemo(() => {
    if (!dashboardData) return [];

    return dashboardData.data.attributes.reservationsPerMonthThisYear.map(month => ({
      month: month.month,
      count: month.count,
    }));
  }, [dashboardData]);

  const chartData = useMemo(() => ({
    labels: currentMonthReservations.map(item => format(new Date(item.date), "dd MMM")),
    datasets: [
      {
        label: t("Current Month"),
        color: "info",
        data: currentMonthReservations.map(item => item.count),
      },
      {
        label: t("Last Month"),
        color: "dark",
        data: lastMonthReservations.map(item => item.count),
      },
    ],
  }), [currentMonthReservations, lastMonthReservations, t]);

  const barChartData = useMemo(() => ({
    labels: reservationsPerMonth.map(item => format(new Date(2024, item.month - 1), "MMM")),
    datasets: [
      {
        label: t("Reservations"),
        data: reservationsPerMonth.map(item => item.count),
      },
    ],
  }), [reservationsPerMonth, t]);

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }




  return (
    <DashboardLayout>
      
      <SoftBox py={3}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            

            <Grid container>
              <Grid item xs={12}>
                <Globe
                  display={{ xs: "none", md: "block" }}
                  position="absolute"
                  top="0%"
                  right={0}
                  mt={{ xs: -12, lg: 1 }}
                  mr={{ xs: 0, lg: 0 }}
                  canvasStyle={{  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={5}>
                <SoftBox mb={3}>
                  
                  <MiniStatisticsCard
                    title={{ text: t("Today Reservations"), fontWeight: "bold" }}
                    count={dashboardData.data.attributes.totalReservationsToday}
                    percentage={{ color: "success", text: "0%" }}
                    icon={{ color: "info", component: "public" }}
                  />


                </SoftBox>

                  <MiniStatisticsCard
                    title={{ text: t("Today Visitors"), fontWeight: "bold" }}
                    count="0"
                    percentage={{ color: "error", text: "0%" }}
                    icon={{ color: "info", component: "emoji_events" }}
                  />


              </Grid>
              <Grid item xs={12} sm={5}>
                <SoftBox mb={3}>

                  <MiniStatisticsCard
                    title={{ text: t("Today Revenue"), fontWeight: "bold" }}
                    count={dashboardData.data.attributes.totalRevenueToday}
                    percentage={{ color: "success", text: "0%" }}
                    icon={{ color: "info", component: "paid" }}
                    isPrice={true}
                  />

                </SoftBox>
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: t("This Month Revenue"), fontWeight: "bold" }}
                    count={dashboardData.data.attributes.totalRevenueThisMonth}
                    percentage={{ color: "success", text: "0%" }}
                    isPrice={true}
                    icon={{
                      color: "info",
                      component: "shopping_cart",
                    }}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={10} lg={7}>
            <Grid item xs={12} lg={10}>
              <SoftBox mb={3} position="relative">
                <SalesTable title="Top 5 Listings" rows={topListingsRows} />
              </SoftBox>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+0%</strong>) {t("than last week")}
                  </>
                }
                chart={barChartData}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title={t("Sales Overview")}

                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      0% {t("more")}{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                      ({t("Current vs. Last Month")})


                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                chart={chartData}
              />
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default Dashboard;
