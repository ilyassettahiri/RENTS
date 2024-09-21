// react-router-dom components
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';

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
import reportsBarChartData from "admin/dashboard//data/reportsBarChartData";
import gradientLineChartData from "admin/dashboard/data/gradientLineChartData";

function Dashboard() {
  const { t } = useTranslation();

  const { values } = breakpoints;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;


  const [topListingsRows, setTopListingsRows] = useState([]);
  const [currentMonthReservations, setCurrentMonthReservations] = useState([]);
  const [lastMonthReservations, setLastMonthReservations] = useState([]);




  let { state } = useLocation();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);





  useEffect(() => {
    (async () => {
      const response = await CrudService.getDashboard();

      console.log(' fetched:', response.data.attributes);


      const { attributes } = response.data;
      setData(attributes);

      // Transform top listings into rows for the SalesTable
      const listingsRows = attributes.topListingsThisMonths.map(listing => ({
        title: [listing.picture, listing.title],  // If picture is null, it will handle no image
        
        price: `$${listing.price}`,          // Add price formatting
        status: listing.status,
      }));

      setTopListingsRows(listingsRows);


            // Store current and last month's reservation history for chart comparison
      const currentMonth = attributes.currentMonthReservationHistory.map(day => ({
        date: day.date,
        count: day.count,
      }));

      const lastMonth = attributes.lastMonthReservationHistory.map(day => ({
        date: day.date,
        count: day.count,
      }));

      setCurrentMonthReservations(currentMonth);
      setLastMonthReservations(lastMonth);

    })();
  }, []);




  const chartData = {
    labels: currentMonthReservations.map(item => format(new Date(item.date), "dd MMM")),
    datasets: [
      {
        label: "Current Month",
        color: "info",
        data: currentMonthReservations.map(item => item.count),
      },
      {
        label: "Last Month",
        color: "dark",
        data: lastMonthReservations.map(item => item.count),
      },
    ],
  };



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
                    title={{ text: "Today Reservations", fontWeight: "bold" }}
                    count={data.totalReservationsToday}
                    percentage={{ color: "success", text: "+3%" }}
                    icon={{ color: "info", component: "public" }}
                  />


                </SoftBox>

                  <MiniStatisticsCard
                    title={{ text: "Today Visitors", fontWeight: "bold" }}
                    count="3,462"
                    percentage={{ color: "error", text: "-2%" }}
                    icon={{ color: "info", component: "emoji_events" }}
                  />


              </Grid>
              <Grid item xs={12} sm={5}>
                <SoftBox mb={3}>

                  <MiniStatisticsCard
                    title={{ text: "Today Revenue ", fontWeight: "bold" }}
                    count={data.totalRevenueToday}
                    percentage={{ color: "success", text: "+55%" }}
                    icon={{ color: "info", component: "paid" }}
                  />

                </SoftBox>
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "This Month Revenue", fontWeight: "bold" }}
                    count={data.totalRevenueThisMonth}
                    percentage={{ color: "success", text: "+5%" }}
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
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                      (Current vs. Last Month)

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
