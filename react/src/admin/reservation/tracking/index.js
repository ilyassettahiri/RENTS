
// react-router-dom components
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';


// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import TrackOrder from "admin/reservation/all/detail-reservation/components/TrackOrder";

import FormField from "admin/components/FormField";

// Data

function Tracking() {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      

      <SoftBox my={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8} justifyContent="center">






                      <Grid container spacing={1} mb={2}>

                          <Grid item xs={12} sm={10} >

                            <SoftBox p={1}>
                              <FormField
                                type="text"
                                placeholder="Enter your tracking number here ..."
                               
                                name="title"
                                
                                
                              />
                            
                            </SoftBox>

                          </Grid>


                          <Grid item xs={12} sm={2} >

                            <SoftBox mt={6} >
                              <SoftButton sx={{ py: 1.8 }}  variant="gradient" color="info" size="small" type="submit">
                                Track
                              </SoftButton>
                            </SoftBox>


                          </Grid>


                      </Grid>
              


            <Card>

              <SoftBox pt={1} pb={3} p={5} >

                      <TrackOrder />
            
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default Tracking;
