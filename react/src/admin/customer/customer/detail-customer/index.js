/* eslint-disable react/prop-types */

// @mui material components
import { useState, useEffect, useMemo } from "react";

import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TeamProfileCard from "examples/Cards/TeamCards/TeamProfileCard";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import EditDialog from "admin/components/EditDialog";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import { Tooltip, IconButton } from "@mui/material";

import SoftButton from "components/SoftButton";

import Icon from "@mui/material/Icon";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";

import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import OrdersOverview from "admin/components/OrdersOverview";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import { CustomerDetailsToolbar } from "admin/components/CustomerDetailsToolbar/CustomerDetailsToolbar";


function DetailCustomer() {
  const { t } = useTranslation();









  const { id } = useParams();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getCustomer(id);
        setData(response.data);

       
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    })();
  }, [id]);



  const clickAddHandler = () => {
    navigate("/listing/create-listing");
  };



  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  


  return (
    <DashboardLayout>
     
      
      <SoftBox my={3}>






        {data && (<CustomerDetailsToolbar
            backLink="/reservation/list"
            customerNumber={id}
            createdAt={data?.attributes.created_at}
            status={data?.attributes.status}
            title="New Customer"
            idname="Customer"
            clickAddHandler={clickAddHandler}
           

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


            <Grid item mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    icon="account_circle"
                    count={{ number: 1600, label: "users active" }}
                    percentage="+55%"
                    
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    icon="touch_app"
                    count={{ number: 357, label: "click events" }}
                    percentage="+124%"
                   
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    icon="shopping_cart"
                    count={{ number: 2300, label: "purchases" }}
                    percentage="+55%"
                    
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    icon="thumb_up"
                    count={{ number: 940, label: "likes" }}
                    percentage="+90%"
                   
                  />
                </Grid>
              </Grid>

              <SoftBox mt={3}>

                  <OrdersOverview  />


              </SoftBox>

            </Grid>


          </Grid>




          <Grid item xs={12} lg={4}>


            <Grid item xs={12}>
              <SoftBox mb={3}>
                <Card sx={{ overflow: "visible" }}>
                  



                  <SoftBox sx={{ p: 2 }} display="flex" justifyContent="space-between" alignItems="center">
                    <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      Customer Info
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

export default DetailCustomer;
