
// react-router-dom components
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";

// Security page components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "admin/components/FormField";
import Securitysettings from "admin/settings/security/components/SecuritySettings";
import Authentication from "admin/settings/security/components/Authentication";
import ChangePassword from "admin/settings/security/components/ChangePassword";
import PasswordRequirements from "admin/settings/security/components/PasswordRequirements";

function Security() {
  const { t } = useTranslation();







  let { state } = useLocation();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);





  useEffect(() => {
    (async () => {
      const response = await CrudService.getSecuritys();

      


      setData(response.data);
    })();
  }, []);











  return (
    <DashboardLayout stickyNavbar>
      <SoftBox mt={5}>
        



        <SoftBox mb={7}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ChangePassword />
            </Grid>
            <Grid item xs={12} md={6}>
              <PasswordRequirements />
            </Grid>
          </Grid>
        </SoftBox>



        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Securitysettings />
            </Grid>
            <Grid item xs={12} md={6}>
              <Authentication />
            </Grid>
          </Grid>
        </SoftBox>

      </SoftBox>
    </DashboardLayout>
  );
}

export default Security;
