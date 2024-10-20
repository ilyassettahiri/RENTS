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
import { OrderDetailsToolbar } from "admin/components/ReservationDetailsToolbar/OrderDetailsToolbar";

import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

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

import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";

function DetailUpcoming() {
  const { t } = useTranslation();

  const { id } = useParams();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getReservation(id);
        setData(response.data);

        
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





  const handleStatusChange = async (newStatus) => {
    try {
      const payload = { status: newStatus };
      const response = await CrudService.updateReservationStatus(payload, data.id);
      
        
        
          navigate("/reservation/currently-hosting");
        
      
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
              <SoftBox pt={2} px={2}>
                {data && (
                  <Header
                    orderNumber={data.id}
                    orderDate={data.attributes.created_at}
                    
                  />
                )}
              </SoftBox>
              <Divider />
              <SoftBox pt={1} pb={3} px={2}>
                <SoftBox mb={3}>
                  {data && (
                    <OrderInfo
                      title={data.attributes.title}
                      status={data.attributes.status}
                      picture={data.attributes.picture}
                      description={`Order was placed on ${data.attributes.created_at}`}
                    />
                  )}
                </SoftBox>
                <Divider />
                <SoftBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={5}>
                      <PaymentDetails />
                      <SoftBox mt={3}>
                        <BillingInformation />
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} lg={5} sx={{ ml: "auto" }}>
                      <OrderSummary />
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>
            </Card>

            
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid item xs={12}>
              <SoftBox mb={3}>
                <Card sx={{ overflow: "visible" }}>
                  <SoftBox mb={3} sx={{ p: 2 }} display="flex" justifyContent="space-between" alignItems="center">
                    <SoftTypography fontWeight="regular" color="text">
                      Customer
                    </SoftTypography>
                    <Tooltip title="Edit listing" placement="top">
                      <IconButton onClick={handleOpenDialog}>
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </SoftBox>
                  <ProfileInfoCard
                    title="profile information"
                    description=""
                    info={{
                      fullName: "Alec M. Thompson",
                      mobile: "(44) 123 1234 123",
                      email: "alecthompson@mail.com",
                      location: "USA",
                    }}
                    social={[
                      {
                        link: "https://www.facebook.com/CreativeTim/",
                        icon: <FacebookIcon />,
                        color: "facebook",
                      },
                      {
                        link: "https://twitter.com/creativetim",
                        icon: <TwitterIcon />,
                        color: "twitter",
                      },
                      {
                        link: "https://www.instagram.com/creativetimofficial/",
                        icon: <InstagramIcon />,
                        color: "instagram",
                      },
                    ]}
                    action={{ route: "", tooltip: "Edit Profile" }}
                  />
                </Card>
              </SoftBox>
            </Grid>

            <Grid item xs={12}>
              <SoftBox mb={3}>
                <Card sx={{ overflow: "visible" }}>
                  <SoftBox mb={3} sx={{ p: 2 }} display="flex" justifyContent="space-between" alignItems="center">
                    <SoftTypography fontWeight="regular" color="text">
                      Shipping address
                    </SoftTypography>
                    <Tooltip title="Edit listing" placement="top">
                      <IconButton onClick={handleOpenDialog}>
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </SoftBox>
                  <ProfileInfoCard
                    title="profile information"
                    description=""
                    info={{
                      fullName: "Alec M. Thompson",
                      mobile: "(44) 123 1234 123",
                      email: "alecthompson@mail.com",
                      location: "USA",
                    }}
                    social={[
                      {
                        link: "https://www.facebook.com/CreativeTim/",
                        icon: <FacebookIcon />,
                        color: "facebook",
                      },
                      {
                        link: "https://twitter.com/creativetim",
                        icon: <TwitterIcon />,
                        color: "twitter",
                      },
                      {
                        link: "https://www.instagram.com/creativetimofficial/",
                        icon: <InstagramIcon />,
                        color: "instagram",
                      },
                    ]}
                    action={{ route: "", tooltip: "Edit Profile" }}
                  />
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

export default DetailUpcoming;
