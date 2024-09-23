/* eslint-disable react/prop-types */

import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SoftAlert from "components/SoftAlert";
import { Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EventCalendar from "examples/Calendar";

import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import EditDialog from "admin/components/EditDialog";
import Card from "@mui/material/Card";

// OrderDetails page components
import Header from "admin/reservation/all/detail-reservation/components/Header";
import OrderInfo from "admin/reservation/all/detail-reservation/components/OrderInfo";
import PaymentDetails from "admin/reservation/all/detail-reservation/components/PaymentDetails";
import BillingInformation from "admin/reservation/all/detail-reservation/components/BillingInformation";
import OrderSummary from "admin/reservation/all/detail-reservation/components/OrderSummary";
import { OrderDetailsToolbar } from "admin/components/ReservationDetailsToolbar/OrderDetailsToolbar";


import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";

function DetailReservation() {
  const { t } = useTranslation();



  const { id } = useParams();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [initialDate, setInitialDate] = useState("2021-08-10"); // Default initial date
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getReservation(id);
        setData(response.data);


        if (response.data && response.data.attributes) {
          setCalendarEvents([
            {
              title: response.data.attributes.name, // Use name instead of title
              start: response.data.attributes.reservationstart,
              end: response.data.attributes.reservationsend,
              className: response.data.attributes.status === "active" ? "success" : "warning",
            },
          ]);
          setInitialDate(response.data.attributes.reservationstart);
        }
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    })();
  }, [id]);

  const [menu, setMenu] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

 

  const eventCalendar = useMemo(
    () => (
      <EventCalendar
        initialView="dayGridMonth"
        initialDate={initialDate}
        events={calendarEvents}
        selectable
        editable
      />
    ),
    [calendarEvents, initialDate]
  );


  const handleStatusChange = async (newStatus) => {
    try {
      const payload = { status: newStatus };
      const response = await CrudService.updateReservationStatus(payload, data.id);
      if (response.data) {
        setData((prevData) => ({
          ...prevData,
          attributes: {
            ...prevData.attributes,
            status: newStatus,
          },
        }));
        if (newStatus === "active") {
          navigate("/reservation/upcoming");
        } else if (newStatus === "pending") {
          navigate("/reservation/currently-hosting");
        }
      }
    } catch (error) {
      console.error(`Error updating reservation status to ${newStatus}:`, error);
    }
  };

  return (
    <DashboardLayout>
      <SoftBox my={3}>


        {data && (<OrderDetailsToolbar
            backLink="/reservation/list"
            orderNumber={data?.id}
            createdAt={data?.attributes.created_at}
            status={data?.attributes.status}
            onChangeStatus={handleStatusChange}
            statusOptions={[
              { value: 'pending', label: 'Pending' },
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' }
            ]}
          />
        )}



        

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              
              <SoftBox pt={1} pb={3} px={2}>
                <SoftBox mb={3}>
                  {data && (
                    <OrderInfo
                      title={data.attributes.title}
                      
                      picture={data.attributes.picture}
                      
                    />
                  )}
                </SoftBox>
                <Divider />
                <SoftBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={5}>
                      <PaymentDetails />
                      <SoftBox mt={3}>
                      {data && (<BillingInformation billing={data.attributes}/>)}
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} lg={5} sx={{ ml: "auto" }}>
                      {data && (<OrderSummary summary={data.attributes}/>)}
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>
            </Card>

            {data && data.attributes.status !== "pending" && (
              <Grid item pt={3} sx={{ height: "max-content" }}>
                {eventCalendar}
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} lg={4}>
            

            <Grid item xs={12}>
              <SoftBox mb={3}>
                <Card sx={{ overflow: "visible" }}>
                  



                  <SoftBox sx={{ p: 2 }} display="flex" justifyContent="space-between" alignItems="center">
                    <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      Shipping address
                    </SoftTypography>
                    
                    <SoftTypography  variant="body2" color="secondary">
                      <Tooltip title="edit" placement="top" onClick={handleOpenDialog}>
                        <Icon>edit</Icon>
                      </Tooltip>
                    </SoftTypography>
                  </SoftBox>



                  {data && (<ProfileInfoCard
                    
                    info={{
                      fullName: data.attributes.name,
                      mobile: data.attributes.phone,
                      email: data.attributes.email,
                      city: data.attributes.city,
                    }}
                    
                    
                  />)}
                </Card>
              </SoftBox>
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>

      <EditDialog onClose={handleCloseDialog} open={dialogOpen} />
    </DashboardLayout>
  );
}

export default DetailReservation;
