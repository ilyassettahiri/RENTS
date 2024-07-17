// react-router-dom components
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';

import { useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import EventCalendar from "examples/Calendar";

// Calendar application components
import Header from "admin/message/components/Header";
import NextEvents from "admin/message/components/NextEvents";
import ProductivityChart from "admin/message/components/ProductivityChart";

// Data
import calendarEventsData from "admin/message/data/calendarEventsData";

function DetailStore() {






  // let { state } = useLocation();
  // const ability = useAbility(AbilityContext);
  // const navigate = useNavigate();
  // const [data, setData] = useState([]);





  // useEffect(() => {
  //   (async () => {
  //     const response = await CrudService.getDetailOnlinestore();

  //     console.log(' fetched:', response.data);


  //     setData(response.data);
  //   })();
  // }, []);







  return (
    <DashboardLayout>
      
    </DashboardLayout>
  );
}

export default DetailStore;
