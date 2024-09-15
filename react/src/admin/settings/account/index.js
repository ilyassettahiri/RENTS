// react-router-dom components
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';


// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';

// settings page components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Sidenav from "admin/settings/account/components/Sidenav";
import Header from "admin/settings/account/components/Header";
import BasicInfo from "admin/settings/account/components/BasicInfo";
import ChangePassword from "admin/settings/account/components/ChangePassword";
import Authentication from "admin/settings/account/components/Authentication";
import Accounts from "admin/settings/account/components/Accounts";
import Notifications from "admin/settings/account/components/Notifications";
import Sessions from "admin/settings/account/components/Sessions";
import DeleteAccount from "admin/settings/account/components/DeleteAccount";

import AuthService from "services/auth-service";

function Account() {
  const { t } = useTranslation();

  
  const [user, setUser] = useState({
    id: '',
    name: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    
    birthday: '',
    gender: '',
    streetAddress: '',
    zipCode: '',
    city: '',
    country: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    profile_image: '',
  });

  useEffect(() => {
    (async () => {
      const response = await AuthService.getProfile();
      
      setUser((prevUser) => ({
        ...prevUser,
        id: response.data.id,
        name: response.data.attributes.name,
        
        profile_image: response.data.attributes.profile_image,
        firstName: response.data.attributes.first_name,
        lastName: response.data.attributes.last_name,
        emailAddress: response.data.attributes.email,
        
        phoneNumber: response.data.attributes.phone_number,
        birthday: response.data.attributes.birthday ? new Date(response.data.attributes.birthday) : null,
        gender: response.data.attributes.gender,
        streetAddress: response.data.attributes.address,
        zipCode: response.data.attributes.zip,
        city: response.data.attributes.city,
        country: response.data.attributes.country,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    })();
  }, []);

  
  return (
    <DashboardLayout>
      <SoftBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav />
          </Grid>
          <Grid item xs={12} lg={9}>
            <SoftBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header user={user}  />
                </Grid>
                
                <Grid item xs={12}>
                  <BasicInfo user={user}  />
                </Grid>
                <Grid item xs={12}>
                  <ChangePassword user={user}  />
                </Grid>
                <Grid item xs={12}>
                  <Authentication />
                </Grid>
                
                <Grid item xs={12}>
                  <Notifications />
                </Grid>
                <Grid item xs={12}>
                  <Sessions />
                </Grid>
                <Grid item xs={12}>
                  <DeleteAccount />
                </Grid>
              </Grid>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Account;
