import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftSelect from "components/SoftSelect";
import ListActionHeader from "admin/components/ListActionHeader";
import Button from '@mui/material/Button';

import { useQuery } from '@tanstack/react-query';

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import SoftEditor from "components/MDEditor";
import SoftTypography from "components/SoftTypography";

// Custom components
import Header from "admin/store/create-store/components/Header";

import Headerskeleton from "admin/store/create-store/components/Header/headerskeleton";

import FormField from "admin/components/FormField";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Address from "components/Address";

// Services
import CrudService from "services/cruds-service";




function Verification() {


    const { t } = useTranslation();
    const [canResend, setCanResend] = useState(true);
    const { emailVerified } = useContext(AuthContext); // Get email verification status from AuthContext
    const navigate = useNavigate();

  
  
    useEffect(() => {
      if (emailVerified) {
        navigate("/dashboard"); 
      }
    }, [emailVerified]);
  
  
  
    const handleResendVerification = async () => {
      if (!canResend) return;
  
      try {
        await AuthService.resendVerification();
  
        setCanResend(false);
        setTimeout(() => setCanResend(true), 60000); // 1-minute cooldown
      } catch (error) {
        console.error(error);
        alert('Failed to resend verification email. Please try again later.');
      }
    };
  

  


  
 

  return (
    <DashboardLayout>
      <SoftBox mt={1} mb={8} >

   
            <SoftTypography variant="h2" paragraph >
                {t('Verify Your Email')}
            </SoftTypography>
            <SoftTypography variant="body1" paragraph sx={{mt: 3}}>
                {t('A verification link has been sent to your email. Please check your inbox and click on the link to verify your account.')}
            </SoftTypography>


            <Button sx={{mt: 3,px: 3, py: 1.5}}
                color="primary" variant="contained"
                onClick={handleResendVerification}
                disabled={!canResend}
            >
                {canResend ? t('Resend Verification Email') : t('Please wait...')}
            </Button>





      </SoftBox>
    </DashboardLayout>
  );
}

export default Verification;


