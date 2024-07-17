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
  const [isDemo, setIsDemo] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    newPassword: "",
    currentPassword: "",
    confirmPassword: "",
    profile_image: "",
  });

  useEffect(() => {
    (async () => {
      const response = await AuthService.getProfile();
      
      setUser((prevUser) => ({
        ...prevUser,
        id: response.data.id,
        name: response.data.attributes.name,
        email: response.data.attributes.email,
        profile_image: response.data.attributes.profile_image,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
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
                  <Header user={user} isDemo={isDemo} />
                </Grid>
                
                <Grid item xs={12}>
                  <BasicInfo user={user} isDemo={isDemo} />
                </Grid>
                <Grid item xs={12}>
                  <ChangePassword user={user} isDemo={isDemo} />
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
