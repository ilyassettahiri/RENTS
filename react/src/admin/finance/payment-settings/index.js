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

// Soft UI Dashboard PRO React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import PaymentMethod from "admin/finance/payment-settings/components/PaymentMethod";
import Invoices from "admin/finance/payment-settings/components/Invoices";
import BillingInformation from "admin/finance/payment-settings/components/BillingInformation";
import Transactions from "admin/finance/payment-settings/components/Transaction";

function Paymentsettings() {
  const { t } = useTranslation();






  let { state } = useLocation();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);





  useEffect(() => {
    (async () => {
      const response = await CrudService.getPayments();

      console.log(' fetched:', response.data);


      setData(response.data);
    })();
  }, []);












  return (
    <DashboardLayout stickyNavbar>
      <SoftBox mt={4}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="paypal"
                    description="Freelance Payment"
                    value="$455.00"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Paymentsettings;
