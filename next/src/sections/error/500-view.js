'use client';

import { m } from 'framer-motion';
import { useState, useEffect, useCallback } from "react";
import CrudService from "src/services/cruds-service";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import MainLayout from 'src/layouts/main';

import Image from 'src/components/image';
import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function Error500View() {





  const [data, setData] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getAbouts();

        setData(response.data);

        console.log('Response data:', response.data); // Logging the response


      } catch (error) {
        console.error('Failed to fetch Home:', error);
      }
    })();
  }, []);








  return (
    <MainLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            500 Internal Server Error
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Image
            alt="500"
            src={`${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/assets/illustrations/illustration_500.svg`}
            sx={{
              mx: 'auto',
              maxWidth: 320,
              my: { xs: 5, sm: 8 },
            }}
          />
        </m.div>

        <Button component={RouterLink} href="/" size="large" color="primary" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </MainLayout>
  );
}
