/* eslint-disable react/prop-types */


import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import ProductCell from "admin/components/ProductCell";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftBadgeDot from "components/SoftBadgeDot";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import SalesTable from "examples/Tables/SalesTable";
import DataTable from "examples/Tables/DataTable/StatsTable";
import TableSkeleton from "examples/Tables/DataTable/TableSkeleton";


// Overview page components
import ChannelsChart from "admin/finance/overview/components/ChannelsChart";

// Data
import defaultLineChartData from "admin/finance/overview/data/defaultLineChartData";
import horizontalBarChartData from "admin/finance/overview/data/horizontalBarChartData";
import salesTableData from "admin/finance/overview/data/salesTableData";

function Overview() {
  const { t } = useTranslation();







  let { state } = useLocation();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();


    // Use React Query to fetch data
    const { data: financesData, isLoading, error } = useQuery({
      queryKey: ['finances'],
      queryFn: () => CrudService.getFinances(),
      onError: (error) => {
        console.error('Failed to fetch finances:', error);
      },
    });
  
    // Memoize the table data for better performance
    const tableData = useMemo(() => {
      if (!financesData) return [];
  
      return financesData.data.map((row) => ({
        product: { image: `${process.env.REACT_APP_IMAGE_LISTING_SMALL}${row.attributes.picture}`, name: row.attributes.title, checked: false, id: row.id },
        price: row.attributes.price,
        created_at: format(new Date(row.attributes.created_at), 'd MMM, h:mm a'),
        id: row.id,
      }));
    }, [financesData]);
  
    const handleRowClick = (row) => {
      navigate(`/listing/detail-listing/${row.original.id}`);
    };
  
    const dataTableData = {
      columns: [
        {
          Header: "Product",
          accessor: "product",
          width: "40%",
          Cell: ({ cell: { value } }) => (
            <ProductCell
              image={value.image}
              name={value.name}
              checked={value.checked}
              id={value.id}
              linkPath={`/listing/detail-listing/${value.id}`}
            />
          ),
        },
        { Header: "Price", accessor: "price", Cell: ({ row, value }) => (
          <div onClick={() => handleRowClick(row)} style={{ cursor: "pointer" }}>
            {value}
          </div>
        )},
        { Header: "Created at", accessor: "created_at", Cell: ({ row, value }) => (
          <div onClick={() => handleRowClick(row)} style={{ cursor: "pointer" }}>
            {value}
          </div>
        )},
      ],
      rows: tableData,
    };


  // DefaultStatisticsCard state for the dropdown value
  const [salesDropdownValue, setSalesDropdownValue] = useState("6 May - 7 May");
  const [customersDropdownValue, setCustomersDropdownValue] = useState("6 May - 7 May");
  const [revenueDropdownValue, setRevenueDropdownValue] = useState("6 May - 7 May");

  // DefaultStatisticsCard state for the dropdown action
  const [salesDropdown, setSalesDropdown] = useState(null);
  const [customersDropdown, setCustomersDropdown] = useState(null);
  const [revenueDropdown, setRevenueDropdown] = useState(null);

  // DefaultStatisticsCard handler for the dropdown action
  const openSalesDropdown = ({ currentTarget }) => setSalesDropdown(currentTarget);
  const closeSalesDropdown = ({ currentTarget }) => {
    setSalesDropdown(null);
    setSalesDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openCustomersDropdown = ({ currentTarget }) => setCustomersDropdown(currentTarget);
  const closeCustomersDropdown = ({ currentTarget }) => {
    setCustomersDropdown(null);
    setCustomersDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openRevenueDropdown = ({ currentTarget }) => setRevenueDropdown(currentTarget);
  const closeRevenueDropdown = ({ currentTarget }) => {
    setRevenueDropdown(null);
    setRevenueDropdownValue(currentTarget.innerText || salesDropdownValue);
  };

  // Dropdown menu template for the DefaultStatisticsCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
      disableAutoFocusItem
    >
      <MenuItem onClick={close}>Last 7 days</MenuItem>
      <MenuItem onClick={close}>Last week</MenuItem>
      <MenuItem onClick={close}>Last 30 days</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="sales"
                count="$230,220"
                percentage={{
                  color: "success",
                  value: "+55%",
                  label: "since last month",
                }}
                dropdown={{
                  action: openSalesDropdown,
                  menu: renderMenu(salesDropdown, closeSalesDropdown),
                  value: salesDropdownValue,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="customers"
                count="3.200"
                percentage={{
                  color: "success",
                  value: "+12%",
                  label: "since last month",
                }}
                dropdown={{
                  action: openCustomersDropdown,
                  menu: renderMenu(customersDropdown, closeCustomersDropdown),
                  value: customersDropdownValue,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="avg. revenue"
                count="$1.200"
                percentage={{
                  color: "secondary",
                  value: "+$213",
                  label: "since last month",
                }}
                dropdown={{
                  action: openRevenueDropdown,
                  menu: renderMenu(revenueDropdown, closeRevenueDropdown),
                  value: revenueDropdownValue,
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <ChannelsChart />
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
              <DefaultLineChart
                title="Revenue"
                description={
                  <SoftBox display="flex" justifyContent="space-between">
                    <SoftBox display="flex" ml={-1}>
                      <SoftBadgeDot color="info" size="sm" badgeContent="Facebook Ads" />
                      <SoftBadgeDot color="dark" size="sm" badgeContent="Google Ads" />
                    </SoftBox>
                    <SoftBox mt={-5.25} mr={-1}>
                      <Tooltip title="See which ads perform better" placement="left" arrow>
                        <SoftButton
                          variant="outlined"
                          color="secondary"
                          size="small"
                          circular
                          iconOnly
                        >
                          <Icon>priority_high</Icon>
                        </SoftButton>
                      </Tooltip>
                    </SoftBox>
                  </SoftBox>
                }
                chart={defaultLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <HorizontalBarChart title="Sales by age" chart={horizontalBarChartData} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <SalesTable title="Sales by Country" rows={salesTableData} />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <SoftBox pt={3} px={3}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Top Selling Products
                </SoftTypography>
              </SoftBox>
              <SoftBox py={1}>
                <DataTable
                  table={dataTableData}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                />
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default Overview;
