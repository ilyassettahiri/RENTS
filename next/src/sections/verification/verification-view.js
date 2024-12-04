'use client';


import { useContext, useState, useMemo } from "react";

import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function VerificationView() {
  const { t } = useTranslation();
  const [canResend, setCanResend] = useState(true);

  const handleResendVerification = async () => {
    if (!canResend) return;

    try {
      await AuthService.resendVerification();
      alert('Verification email sent. Please check your inbox.');
      setCanResend(false);
      setTimeout(() => setCanResend(true), 60000); // 1-minute cooldown
    } catch (error) {
      console.error(error);
      alert('Failed to resend verification email. Please try again later.');
    }
  };

  return (
    <Container

    sx={{
      pt: { xs: 5, md: 10 },
      pb: { xs: 10, md: 15 },

    }}

    >
      <Typography variant="h4" paragraph>
        {t('Verify Your Email')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('A verification link has been sent to your email. Please check your inbox and click on the link to verify your account.')}
      </Typography>


      <Button
        variant="contained"
        onClick={handleResendVerification}
        disabled={!canResend}
      >
        {canResend ? t('Resend Verification Email') : t('Please wait...')}
      </Button>


    </Container>
  );
}
